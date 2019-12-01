import { Action } from '@ngrx/store';
import { User } from '../user.model';

export const AUTHENTICATION_SUCESS = "AUTHENTICATION_SUCESS";
export const LOGOUT = "LOGOUT";
export const LOGIN_START = "LOGIN START";
export const AUTHENTICATION_FAIL = "AUTHENTICATION_FAIL";
export const SIGN_UP_START = "SIGN UP START";
export const AUTO_LOGIN = "AUTO_LOGIN";
export const CLEAR_ERROR = "CLEAR_ERROR";

export class AuthenticationSuccessAction implements Action{
    readonly type = AUTHENTICATION_SUCESS;
    constructor(public payload: User, public redirect: boolean){}
}

export class LogoutAction implements Action{
    readonly type = LOGOUT;
}

export class LoginStartAction implements Action{
    readonly type = LOGIN_START;
    constructor(public payload: {email:String, password:String}){}
}

export class AuthenticationFailAction implements Action{
    readonly type = AUTHENTICATION_FAIL;
    constructor(public payload: string){}
}

export class SignUpStartAction implements Action{
    readonly type = SIGN_UP_START;
    constructor(public payload: {email:string, password:string}){}
}

export class AutoLoginAction implements Action{
    readonly type = AUTO_LOGIN;
}

export class ClearErrorAction implements Action{
    readonly type = CLEAR_ERROR
}
export type AuthAction = AuthenticationSuccessAction | LogoutAction | LoginStartAction | 
        AuthenticationFailAction | SignUpStartAction | ClearErrorAction;