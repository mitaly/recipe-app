import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, take, exhaustMap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
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

@Injectable({providedIn : 'root'})
export class AuthService{
    constructor(private http : HttpClient, private router: Router){}
    
    private signUpurl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCk53GHFxIg0etPYOqYWnLc_S7utO23RyM';
    private signInUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCk53GHFxIg0etPYOqYWnLc_S7utO23RyM';
    user = new BehaviorSubject<User>(null);

    signUp(email : string, password : string){
        return this.http.post<AuthResponseData>(this.signUpurl, {email: email, password: password, returnSecureToken:true})
            .pipe(catchError( errorResponse => {
                return this.handleError(errorResponse);
            }),
            tap(response => {
                this.authenticatedUser(response.email, response.localId, response.idToken, +response.expiresIn);
            }));
    }

    logIn(email:string, password:string){
        return this.http.post<AuthResponseData>(this.signInUrl, {email: email, password:password, returnSecureToken:true})
            .pipe(catchError( errorResponse => {
                return this,this.handleError(errorResponse);
            }),
            tap(response => {
                this.authenticatedUser(response.email, response.localId, response.idToken, +response.expiresIn);
            }));
    }

    logout(){
        this.user.next(null);
        localStorage.removeItem("user");
        this.router.navigate(['/auth']);
    }

    autoLogin(){
        var userDataString = localStorage.getItem("user");
        if(userDataString){
            var userData :{
                email :string;
                id:string;
                _token:string;
                _tokenExpirationDate:string
            } = JSON.parse(userDataString);

            var fetchedUser : User = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
            if(fetchedUser.token){
                this.user.next(fetchedUser);
                this.autoLogout(new Date(userData._tokenExpirationDate).getTime() - new Date().getTime());
            }
        }else{
            this.router.navigate(['/auth']);
        }
    }

    autoLogout(expiresIn: number){
        setTimeout(() => {
            this.logout();
        }, expiresIn);
    }

    private authenticatedUser(email:string, localId:string, token:string, expiresIn:number){
        var expirationDate = new Date((new Date().getTime()) + expiresIn*1000);
        var user = new User(email, localId, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem("user", JSON.stringify(user));
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