import { Action } from '@ngrx/store';
import { User } from '../user.model';

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const LOGIN_START = "LOGIN START";
export const LOGIN_FAIL = "LOGIN_FAIL";

export class LoginAction implements Action{
    readonly type = LOGIN;
    constructor(public payload: User){}
}

export class LogoutAction implements Action{
    readonly type = LOGOUT;
}

export class LoginStartAction implements Action{
    readonly type = LOGIN_START;
    constructor(public payload: {email:String, password:String}){}
}

export class LoginFailAction implements Action{
    readonly type = LOGIN_FAIL;
    constructor(public payload: string){}
}
export type AuthAction = LoginAction | LogoutAction | LoginStartAction | LoginFailAction;