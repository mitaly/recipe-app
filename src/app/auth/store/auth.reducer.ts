import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State{
    user: User
}

const initialState: State = {
    user : null
}

export function authReducer(state:State = initialState, action:AuthActions.AuthAction){
    switch(action.type){
        case AuthActions.LOGIN:
            console.log(action.payload);
            return {
                ...state,
                user: action.payload
            }
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null
            }
        default:
            return state;
    }
}