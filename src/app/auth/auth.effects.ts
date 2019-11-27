import { Actions, ofType, Effect } from '@ngrx/effects';
import * as AuthActions from './store/auth.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData{
    idToken : string;
    email : string;
    refreshToken : string;
    expiresIn : string;
    localId :string;
    registered? : boolean;
}

@Injectable()
export class AuthEffects{
    private signInUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAuthKey;
    
    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((action : AuthActions.LoginStartAction) => {
            return this.http.post<AuthResponseData>(this.signInUrl, 
                {   email: action.payload.email, 
                    password: action.payload.password, 
                    returnSecureToken:true
                }).pipe(
                    map(response => {
                        var expirationDate = new Date((new Date().getTime()) + +response.expiresIn*1000);
                        var user = new User(response.email, response.localId, response.idToken, expirationDate);
                        return new AuthActions.LoginAction(user);
                    }),
                    catchError(error => {
                        return of(new AuthActions.LoginFailAction(this.handleError(error)));
                    })
                )
        })
    );

    @Effect({dispatch: false})
    authLoginSuccess = this.actions$.pipe(
        ofType(AuthActions.LOGIN),
        tap(response => {
            this.router.navigate(['/']);
        })    
    );

    private handleError(errorResponse:HttpErrorResponse){
        var errorMessage = "An error occurred!";
        switch(errorResponse.error.error.message){
            case 'EMAIL_EXISTS':
                errorMessage = "Email already exists!";
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = "You have not signed up!";
                break;
            case 'INVALID_PASSWORD':
                errorMessage = "Password is incorrect!";
                break;
        }
        return errorMessage;
    }
    constructor(private actions$: Actions, private http:HttpClient, private router: Router){}
}