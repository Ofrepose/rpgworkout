import React, { useState, useEffect } from 'react';
import * as yup from 'yup';

import { login } from '../../actions/auth';
import { connect } from 'react-redux';





function Login(props){

    const defaultState = {
        email: '',
        password: ''
    };

    // State variables
    const [formState, setFormState] = useState(defaultState);
    const [errors, setErrors] = useState({...defaultState, terms: ""});
    const [buttonDisabled, setButtonDisabled] = useState(true);

    let formSchema = yup.object().shape({
        email: yup.string().email( 'Please enter your email address' ).required( 'Please enter your email address' ),
        password: yup.string().required( 'Please enter your password' ).min( 6, 'Please enter your password' )
    });





    const submitData = e => {
        
        e.preventDefault();

        console.log(formState);
        props.login( formState );

    };






    const handleChange = e => {

        setFormState({
            ...formState, [ e.target.name ]: e.target.value
        });

        inputChange(e);

    };






    const inputChange = e => {

        e.persist();

        yup
        .reach(formSchema, e.target.name)
        .validate(e.target.value)
        .then( valid => {
            setErrors({
                ...errors, [ e.target.name ]: ''
            })
        })
        .catch( err => {
            setErrors({
                ...errors, [ e.target.name ]: err.errors[0]
            })
        });
    }





    useEffect( () => {

        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid)
        });
    }, [formState]);

    return(

        <div className = 'formSection'>

            <form onSubmit = { submitData } >

                <div className = 'formTitler'>Login</div>
            
                <label>
                    Email:

                    <input 
                    type = 'email'
                    name = 'email'
                    value = { formState.email }
                    onChange = { handleChange }
                    />
                    { errors.email.length > 0 ? (
                        <p className = 'error'>{ errors.email }</p>
                    ) : null }
                </label>

                <label>
                    Password:

                    <input 
                    type = 'password'
                    name = 'password'
                    value = { formState.password }
                    onChange = { handleChange }
                    />
                    { errors.password.length > 1 && errors.password.length < 6 ? (
                        <p className = 'error'>{ errors.password }</p>
                    ) : null }
                </label>                

                <button disabled = { buttonDisabled }>Submit</button>

            </form>

        </div>

    )

};





const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);