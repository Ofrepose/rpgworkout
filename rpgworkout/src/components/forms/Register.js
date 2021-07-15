import React, { useState, useEffect } from 'react';
import * as yup from 'yup';

import { register } from '../../actions/auth';
import { connect } from 'react-redux';





function Register(props){

    const defaultState = {
        name: '',
        email: '',
        password: '',
        passwordCheck: ''
    };

    //State variables
    const [formState, setFormState] = useState(defaultState);
    const [errors, setErrors] = useState({...defaultState, terms: ""});
    const [buttonDisabled, setButtonDisabled] = useState(true);

    let formSchema = yup.object().shape({
        name: yup.string().required( "Please enter your name" ),
        email: yup.string().email( 'Please enter a valid email address' ).required( 'Please enter a valid email address' ),
        password: yup.string().required( 'Please enter a valid password' ).min( 6, 'Passwords must be at least 6 characters' ),
        passwordCheck: yup.string().oneOf([ formState.password, null ], 'Passwords must match' )
    });








    const submitData = e => {
        
        e.preventDefault();

        console.log(formState);
        props.register( formState );

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

                <div className = 'formTitler'>Create Account</div>

                <label>
                    Name:
                    
                    <input
                    type = 'text'
                    name = 'name'
                    value = { formState.name }
                    onChange = { handleChange }
                    />
                    { errors.name.length > 0 ? (
                        <p className = 'error'>{ errors.name }</p>
                    ) : null }
                </label>

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

                <label>
                    Repeat Password:

                    <input 
                    type = 'password'
                    name = 'passwordCheck'
                    value = { formState.passwordCheck }
                    onChange = { handleChange }
                    />
                    { errors.passwordCheck.length > 1 ? (
                        <p className = 'error'>{ errors.passwordCheck }</p>
                    ) : null }
                </label>

                <button disabled = { buttonDisabled }>Submit</button>

            </form>

        </div>

    );

};






const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
};

export default connect( mapStateToProps, { register })(Register)