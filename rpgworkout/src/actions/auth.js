import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_PROFILE,
    LOGOUT
  } from '../actions/types';




/******************************************************************************
 *                          Route - GET api/auth     
 *                           Loads current User                         
 ******************************************************************************/

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
    }

};






/******************************************************************************
 *                          Route - POST api/user     
 *                           Register a new User                         
 ******************************************************************************/

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






/******************************************************************************
 *                          Route - GET api/auth     
 *                             Login a User                         
 ******************************************************************************/

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





/******************************************************************************
 *                             Route - None     
 *                          Logout current user                         
 ******************************************************************************/

export const logout = () => dispatch => {
    setAuthToken(null);
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
}