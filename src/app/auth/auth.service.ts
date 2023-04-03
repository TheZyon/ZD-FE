import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, throwError } from 'rxjs';
// map sesrve per guardre la risposta del login e vedere se i dati coincidono
import { catchError, map, tap } from 'rxjs/operators';
import {urlBaseBE, urlLogIn, urlSignUp} from "../../environments/environment";

export interface SignupData {
    name: string;
    username: string;
    email: string;
    password: string;
    roles:string[];
}

export interface LoginData {
    username: string;
    password: string;
}

export interface AuthData {
    accessToken: string;
    user: {
        username: string
    };
}

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

    constructor(private http: HttpClient, private router: Router) {
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
            catchError(this.errors)
        );
    }

    signup(data: SignupData) {
        let URL=urlSignUp;
        return this.http
            .post(`${URL}`, data)
            .pipe(catchError(this.errors));
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

    private errors(err: any) {
        switch (err.error) {
            case 'Email and password are required':
                // return throwError('Email e password sono obbligatorie');
                throw new Error('Email e password sono obbligatorie');
                break;
            case 'Email already exists':
                return throwError('Utente già registrato');
                break;
            case 'Email format is invalid':
                return throwError('Email scritta male');
                break;
            case 'Cannot find user':
                return throwError("L'utente non esiste");
                break;
            default:
                return throwError('Errore nella chiamata');
                break;
        }
    }

    // generaErrore() {
    //     throw new Error("errore")
    // }

    // test() {
    //     try{
    //         this.generaErrore()
    //     } catch(err) {
    //         console.log(err);
    //     }
    // }
}
