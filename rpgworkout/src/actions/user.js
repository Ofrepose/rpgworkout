import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

import {
    INITIALSTATS_SUCCESS,
    INITIALSTATS_FAIL,
    SEND_XP_SUCCESS,
    SEND_XP_FAIL,
    SEND_HEALTH_SUCCESS,
    SEND_HEALTH_FAIL
  } from '../actions/types';






/******************************************************************************
 *                    Route - POST api/user/update/health     
 *                       Sends Health to current User                         
 ******************************************************************************/

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






/******************************************************************************
 *                     Route - POST api/user/update/xp     
 *                    Updates XP amount for current User                         
 ******************************************************************************/

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






/******************************************************************************
 *                 Route - POST api/user/update/initialInfo     
 *                     Sends initial stats for new user                         
 ******************************************************************************/

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

