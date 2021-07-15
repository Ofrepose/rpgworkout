import axios from 'axios';





/*
 * Sets the auth token in the headers
 * If token isnt found - deletes token in header
 */
const setAuthToken = token => {
    
    if( token ){

        axios.defaults.headers.common[ 'x-auth-token' ] = token;

    } else {

        delete axios.defaults.headers.common[ 'x-auth-token' ];
    
    };

};

export default setAuthToken;