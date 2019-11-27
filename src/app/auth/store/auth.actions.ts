import { Action } from '@ngrx/store';
import { User } from '../user.model';

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export class LoginAction implements Action{
    readonly type = LOGIN;
    constructor(public payload: User){}
}

export class LogoutAction implements Action{
    readonly type = LOGOUT;
}

export type AuthAction = LoginAction | LogoutAction;