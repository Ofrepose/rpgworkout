/* eslint-disable import/no-anonymous-default-export */
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
} from '../actions/types';

const initialState = {
    token: localStorage.getItem( 'token' ),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: {}
};





export default function( state = initialState, action ) {
    
    const { type, payload } = action;

    switch( type ){

        
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:

        console.log(payload);
        localStorage.setItem( 'token', payload.token );

        return {
            ...state,
            ...payload,
            isAuthenticated: true,
            loading: false,
            user: payload
        }

        case REGISTER_FAIL:
        case LOGIN_FAIL:

        localStorage.removeItem( 'token' );

        return{
            ...state,
            token: null,
            isAuthenticated: false,
            loading: false,
            user: null
        }

        case USER_LOADED:

        console.log('inside user_loaded case in reducer auth.js')
        return {
            ...state,
            isAuthenticated: true,
            loading: false,
            // user: payload
        }

        case AUTH_ERROR:

        localStorage.removeItem('token');
        return {
            ...state,
            token: null,
            isAuthenticated: false,
            loading: false
        }

        default:

            return state
        

    }
};