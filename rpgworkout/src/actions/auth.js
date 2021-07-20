import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    INITIALSTATS_SUCCESS,
    INITIALSTATS_FAIL,
    SEND_XP_SUCCESS,
    SEND_XP_FAIL,
    SEND_HEALTH_SUCCESS,
    SEND_HEALTH_FAIL
  } from '../actions/types';





export const loadUser = () => async dispatch => {

    if( localStorage.token ){

        setAuthToken( localStorage.token );

    }

    try{

        const res = await axios.get('api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });

    }catch( err ){

        dispatch({
            type: AUTH_ERROR
        })
    };

}

export const sendHealth = ( data ) => async dispatch => {
    console.log('inside action = send health');
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify( data );

    console.log( body );

    try{

        const res = await axios.post( 'api/user/update/health', body, config);

        dispatch({
            type: SEND_HEALTH_SUCCESS,
            payload: res.data
        });
    }catch( err ){
        const errors = err.response.data.errors;
        dispatch({
            type: SEND_HEALTH_FAIL,
            payload: errors
        });
    }
}

export const sendXP = ( data ) => async dispatch =>{
    console.log('inside action - send xp');
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify( data );

    console.log( body );

    try{

        const res = await axios.post( 'api/user/update/xp', body, config);

        dispatch({
            type: SEND_XP_SUCCESS,
            payload: res.data
        });
    }catch( err ){
        const errors = err.response.data.errors;
        dispatch({
            type: SEND_XP_FAIL,
            payload: errors
        });
    }
}

export const initialStats = ( data ) => async dispatch => {
    console.log('inside action - initialStats');
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify( data );

    console.log(body)

    try{

        const res = await axios.post( 'api/user/update/initialInfo', body, config );

        dispatch({
            type: INITIALSTATS_SUCCESS,
            payload: res.data
        });
        // dispatch(loadUser());
    }catch( err ){
        const errors = err.response.data.errors;
        dispatch({
            type: INITIALSTATS_FAIL
        });
    }
}






export const register = ({ name, email, password }) => async dispatch => {
    console.log('inside action - register');
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ name, email, password });

    try{

        const res = await axios.post( 'api/user', body, config );

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());

    }catch( err ){

        const errors = err.response.data.errors;
    
        dispatch({
            type: REGISTER_FAIL
        });

    }

};





export const login = ({ email, password }) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body  = JSON.stringify({ email, password });

    try{

        const res = await axios.post('/api/auth', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

        dispatch(loadUser());
        
    }catch( err ){
        
        const errors = err.response.data.errors;

        dispatch({
            type: LOGIN_FAIL
        })
    }
};