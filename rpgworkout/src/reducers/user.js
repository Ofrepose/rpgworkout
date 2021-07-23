/* eslint-disable import/no-anonymous-default-export */
import {
    INITIALSTATS_SUCCESS,
    INITIALSTATS_FAIL,
    SEND_XP_SUCCESS,
    SEND_XP_FAIL,
    SEND_HEALTH_SUCCESS,
    SEND_HEALTH_FAIL,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
    USER_LVLUP_SUCCESS,
    USER_LVLUP_FAIL,
    USER_LOADED
} from '../actions/types';

const initialState = {    
    loading: true,
    user: null,
    error: {}
};





export default function( state = initialState, action ){

    const { type, payload } = action;

    switch( type ){

        case USER_LOADED:
            return {
                ...state,
                loading: false,
                user: payload
            }

        case USER_LVLUP_SUCCESS:
            return {
                ...state,
                user: payload,
                loading: false
            }

        case SEND_HEALTH_SUCCESS:
            return {
                ...state,
                user: payload,
                loading: false
            }
        
        case SEND_HEALTH_FAIL:
        case USER_LVLUP_FAIL:
            return {
                ...state,
                error: payload,
                loading: false
            }

        case SEND_XP_SUCCESS:
            console.log('sendXP success')
            return {
                ...state,
                user: payload,
                loading: false
            }
        case SEND_XP_FAIL:
            return{
                ...state,
                error:payload,
                loading: false
            }

        case INITIALSTATS_SUCCESS:
            return {
                ...state,
                user: payload,
                loading: false
            }
        case INITIALSTATS_FAIL:
            return {
                ...state,
                error: payload,
                loading: false

            }
        case GET_USER_SUCCESS:
            return {
                ...state,
                user: payload,
                loading: false
            }
        case GET_USER_FAIL:
            return {
                ...state,
                error: payload,
                loading: false
            }

        default:

        return state

    }
}
