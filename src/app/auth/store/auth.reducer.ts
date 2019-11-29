import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State{
    user: User,
    authError: string,
    loading: boolean
}

const initialState: State = {
    user : null,
    authError: null,
    loading: false
}

export function authReducer(state:State = initialState, action:AuthActions.AuthAction){
    switch(action.type){
        case AuthActions.AUTHENTICATION_SUCESS:
            return {
                ...state,
                user: action.payload,
                authError: null,
                loading: false
            }
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null
            }
        case AuthActions.LOGIN_START:
            return {
                ...state,
                authError: null,
                loading: true
            }
        case AuthActions.AUTHENTICATION_FAIL:
            return {
                ...state,
                user: null,
                authError: action.payload,
                loading: false
            }
        case AuthActions.SIGN_UP_START:
            return {
                ...state,
                loading : true,
                authError: null
            }
        case AuthActions.CLEAR_ERROR:
            return{
                ...state,
                authError : null
            }
        default:
            return state;
    }
}