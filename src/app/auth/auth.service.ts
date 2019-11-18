import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData{
    idToken : string;
    email : string;
    refreshToken : string;
    expiresIn : string;
    localId :string;
    registered? : boolean;
}

@Injectable({providedIn : 'root'})
export class AuthService{
    constructor(private http : HttpClient){}
    
    private signUpurl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCk53GHFxIg0etPYOqYWnLc_S7utO23RyM';
    private signInUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCk53GHFxIg0etPYOqYWnLc_S7utO23RyM';
    user = new Subject<User>();

    signUp(email : string, password : string){
        return this.http.post<AuthResponseData>(this.signUpurl, {email: email, password: password, returnSecureToken:true})
            .pipe(catchError( errorResponse => {
                return this.handleError(errorResponse);
            }),
            tap(response => {
                this.authenticatedUser(response.email, response.localId, response.idToken, response.expiresIn);
            }));
    }

    logIn(email:string, password:string){
        return this.http.post<AuthResponseData>(this.signInUrl, {email: email, password:password, returnSecureToken:true})
            .pipe(catchError( errorResponse => {
                return this,this.handleError(errorResponse);
            }),
            tap(response => {
                this.authenticatedUser(response.email, response.localId, response.idToken, response.expiresIn);
            }));
    }

    private authenticatedUser(email:string, localId:string, token:string, expiresIn:string){
        var expirationDate = new Date((new Date().getMilliseconds()) + (+expiresIn*1000));
        var user = new User(email, localId, token, expirationDate);

        this.user.next(user);
    }

    private handleError(errorResponse:HttpErrorResponse){
        var errorMessage = "An error occurred!";
        if(!errorResponse.error || !errorResponse.error.error){
            return throwError(errorMessage);
        }
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
        return throwError(errorMessage);
    }
}