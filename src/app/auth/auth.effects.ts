import { Actions, ofType, Effect } from '@ngrx/effects';
import * as AuthActions from './store/auth.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

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
    private signUpurl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseAuthKey;
    
    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((action : AuthActions.LoginStartAction) => {
            return this.http.post<AuthResponseData>(this.signInUrl, 
                {   email: action.payload.email, 
                    password: action.payload.password, 
                    returnSecureToken:true
                }).pipe(
                    tap(response => {
                        this.authService.autoLogout(3000);
                    })
                    ,map(response => {
                        return this.authenticateUser(response);
                    }),
                    catchError(error => {
                        return of(new AuthActions.AuthenticationFailAction(this.handleError(error)));
                    })
                )
        })
    );

    @Effect()
    authSignUp = this.actions$.pipe(
        ofType(AuthActions.SIGN_UP_START),
        switchMap((action: AuthActions.SignUpStartAction) => {
            return this.http.post<AuthResponseData>(this.signUpurl, 
                {   email: action.payload.email, 
                    password: action.payload.password, 
                    returnSecureToken:true
                }).pipe(
                    tap(response => {
                        this.authService.autoLogout(+response.expiresIn);
                    })
                    ,map(response => {
                        return this.authenticateUser(response);
                    })
                    ,catchError(error => {
                        return of(new AuthActions.AuthenticationFailAction(this.handleError(error)));
                    })
                )
        })
    );

    @Effect({dispatch: false})
    authLoginSuccess = this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATION_SUCESS),
        tap((action: AuthActions.AuthenticationSuccessAction) => {
            localStorage.setItem("user", JSON.stringify(action.payload));
            this.router.navigate(['/']);
        })    
    );

    @Effect({dispatch: false})
    authLogout = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
            localStorage.removeItem("user");
            this.authService.clearLogoutTimer();
            this.router.navigate(['/auth']);
        })
    );

    @Effect()
    authAutoLogin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(() => {
            var userDataString = localStorage.getItem("user");
            if(userDataString){
                var userData :{
                    email :string;
                    id:string;
                    _token:string;
                    _tokenExpirationDate:string
                } = JSON.parse(userDataString);

                var fetchedUser : User = new User(userData.email, userData.id, userData._token,
                    new Date(userData._tokenExpirationDate));
                if(fetchedUser.token){
                    this.authService.autoLogout(new Date(userData._tokenExpirationDate).getTime() - new Date().getTime());
                    return new AuthActions.AuthenticationSuccessAction(fetchedUser);
                }else{
                    return { type: 'DUMMY' };
                }
            }else{
                this.router.navigate(['/auth']);
                return { type: 'DUMMY' };
            }
        })
    );

    private authenticateUser(response: AuthResponseData){
        var expirationDate = new Date((new Date().getTime()) + +response.expiresIn*1000);
        var user = new User(response.email, response.localId, response.idToken, expirationDate);
        return new AuthActions.AuthenticationSuccessAction(user);
    }

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
    constructor(private actions$: Actions, 
                private http:HttpClient, 
                private router: Router,
                private authService: AuthService){}
}