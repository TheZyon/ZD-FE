import {throwError} from "rxjs";

export function errors(err: any) {
  /*switch (err.status){
        case 400:
            break;
        case 401:
            break;
        case 403:
            break;
        default:
            break;
    }
*/ //tenere in considerazione per switch che parte dagli stati

  switch (err.error.message) {
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
    case 'ERR_CONNECTION_REFUSED':
      throw new Error('There is a problem in contacting the server!!');
      break;
    case 'non è accettabile':
      throw new Error('il be dice che non è accettabile');
      break;
    case 'Credenziali non valide':
      throw new Error('username or password incorrect!');
      break;
    case 'Username is already exists!.':
      throw new Error('username already exists!');
      break;
    default:
      console.log("errore nuovo: ", err.error);
      return throwError('Errore nella chiamata');
      break;
  }
}
