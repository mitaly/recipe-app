import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as fromAuthActions from '../auth/store/auth.actions';

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
    constructor(private store: Store<fromApp.AppState>){}
    tokenExiprationtimer;

    autoLogout(expiresIn: number){
        this.tokenExiprationtimer = setTimeout(() => {
            this.store.dispatch(new fromAuthActions.LogoutAction());
        }, expiresIn);
    }

    clearLogoutTimer(){
        if(this.tokenExiprationtimer){
            clearTimeout(this.tokenExiprationtimer);
            this.tokenExiprationtimer = null;
        }
    }
}