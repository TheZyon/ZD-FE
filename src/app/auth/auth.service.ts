import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import {BehaviorSubject} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { urlLogIn, urlSignUp} from "../../environments/environment";
import {errors} from "../../environments/errors";
import {LoadAndUpdateFromAPIService} from "../services/load-and-update-from-a-p-i.service";
import {AuthData, LoginData, SignupData} from "../models/auth";



@Injectable({
    providedIn: 'root',
})
export class AuthService {

    jwtHelper = new JwtHelperService();

    //subject - esegue next -> segnala ai subscriber di eseguire la loro callback "notifica"
    //Nell'auth conviene sempre usare BehaviourSubject o ReplaySubject
    //in generale se la callback dei subscriber deve essere eseguita anche quando eseguo subscribe() e non solo quando arriva il succevo next allora usaimo Replay/Behaviour
    private authSubject = new BehaviorSubject<null | AuthData>(null);
    //observable - oggetto su cui fare subscribe nei components per reagire ai next della subject
    user$ = this.authSubject.asObservable();
    isLoggedIn$ = this.user$.pipe(map((user) => !!user)); // Questo observable, da usare per la verifica, riceve la presenza o meno di un valore nel subject user$ e sarà true se il subject contiene un valore (user), sarà false se il subject è null (!!user)

    autoLogoutTimer: any;

    constructor(private http: HttpClient, private router: Router, private loadAPISrv: LoadAndUpdateFromAPIService) {
        console.log(URL);
        this.restoreUser();

    }

    //LOGIN/SIGNUP
    login(data: LoginData) {
        let URL= urlLogIn;
        return this.http.post<AuthData>(`${URL}`, data).pipe(
            //cosa si fa con l'authData ricevuto???
            //1. salvi authData in localstorage per successivo autologin
            //2. prendo expiration date dal token e setto autologout
            //3. nexto la authData a authSubject cosicchè tutte le componenti sottoscritte hanno l'info che l'utente è loggato
            tap((data) => {
                //1.
                localStorage.setItem('user', JSON.stringify(data));
                //2.
                const expirationDate = this.jwtHelper.getTokenExpirationDate(
                    data.accessToken
                ) as Date;
                this.autoLogout(expirationDate);

                //3.
                this.authSubject.next(data);
            }),
            catchError(errors)
        );
    }

    signup(data: SignupData) {
        let URL=urlSignUp;
        return this.http
            .post(`${URL}`, data)
            .pipe(catchError(errors));
    }

    restoreUser() {
        const userJson = localStorage.getItem('user');
        if (!userJson) {
            return;
        }
        const user: AuthData = JSON.parse(userJson);
        if (this.jwtHelper.isTokenExpired(user.accessToken)) {
            return;
        }
        //se il token p presente e valido mando AuthData che mi ero salvato al login precendete come parametro di next()
        this.authSubject.next(user);
        // this.authSubject.next(this.jwtHelper.decodeToken().user);
        //imposta un autologout in base alla data di scadenza
        const expirationDate = this.jwtHelper.getTokenExpirationDate(
            user.accessToken
        ) as Date;
        this.autoLogout(expirationDate);
    }

    logout() {
        this.authSubject.next(null); //segnalare al sito che non siamo più loggati
        this.router.navigate(['/login']);
        localStorage.removeItem('user'); //dimentichiamo il token per evitare autologin
        this.loadAPISrv.doUnsubscribe();
        if (this.autoLogoutTimer) {
            clearTimeout(this.autoLogoutTimer);
        }
    }

    autoLogout(expirationDate: Date) {
        //getTime da il valore della data in ms
        const expMs = expirationDate.getTime() - new Date().getTime(); //ms rimasti primache scada
        this.autoLogoutTimer = setTimeout(() => {
            this.logout();
        }, expMs);
    }

}
