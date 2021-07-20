import React, { useState, useEffect } from 'react';
import * as yup from 'yup';

import { initialStats } from '../../actions/auth';
import { connect } from 'react-redux';

function InitialStats(props){

    const defaultState = {
        inPushups: '',
        inJumpingJacks: '',
        inStepUps: '',
        inMountainClimbers: '',
        inSquatJumps: '',
        inBurpees: '',
        id: props.user_id
    };

    const questions = [
        {
            name: 'inPushups',
            contentName: 'Pushups',
            content: 'What is the maximum number of Pushups you can do in thirty seconds?'
        },
        {
            name: 'inJumpingJacks',
            contentName: 'Jumping Jacks',
            content: 'What is the maximum number of Jumping Jacks you can do?'
        },
        {
            name: 'inStepUps',
            contentName: 'Step ups',
            content: 'What is the maximum number of Step-Ups you can do?'
        },
        {
            name: 'inMountainClimbers',
            contentName: 'Mountain Climbers',
            content: 'What is the maximum number of Mountain Climbers you can do?'
        },
        {
            name: 'inSquatJumps',
            contentName: 'Squat Jumps',
            content: 'What is the maximum number of Squat Jumps you can do?'
        },
        {
            name: 'inBurpees',
            contentName: 'Burpees',
            content: 'What is the maximum number of Burpees you can do?'
        }
    ]

    // State Variables
    const [ formState, setFormState ] = useState(defaultState);
    const [ errors, setErrors ] = useState({ ...defaultState, terms: '' });
    const [ formNumber, setFormNumber ] = useState(0);


    let formSchema = yup.object().shape({
        inPushups: yup.number().positive().required( 'Please enter a valid number')
        .min( 0, 'Must be zero or above').max(500, 'Must be below zero | this app is not for superhumans'),
        inJumpingJacks: yup.number().positive().required( 'Please enter a valid number')
        .min( 0, 'Must be zero or above').max(500, 'Must be below zero | this app is not for superhumans'),
        inStepUps: yup.number().positive().required( 'Please enter a valid number')
        .min( 0, 'Must be zero or above').max(500, 'Must be below zero | this app is not for superhumans'),
        inMountainClimbers: yup.number().positive().required( 'Please enter a valid number')
        .min( 0, 'Must be zero or above').max(500, 'Must be below zero | this app is not for superhumans'),
        inSquatJumps: yup.number().positive().required( 'Please enter a valid number')
        .min( 0, 'Must be zero or above').max(500, 'Must be below zero | this app is not for superhumans'),
        inBurpees: yup.number().positive().required( 'Please enter a valid number')
        .min( 0, 'Must be zero or above').max(500, 'Must be below zero | this app is not for superhumans'),

    });





    const submitData = e => {

        e.preventDefault();

        console.log(formState);
        props.initialStats( formState );

        //give character 5 exp points and begin journey

    };





    const handleChange = e => {
        
        setFormState({
            ...formState, [ e.target.name ]: e.target.value
        });

        inputChange( e );

    };


    const inputChange = e => {

        e.persist();

        // yup
        // .reach( formSchema, e.target.name )
        // .validate( e.target.value )
        // .then( valid => {
        //     setErrors({
        //         ...errors, [ e.target.name ]: ''
        //     })
        // });
    };

    const handleFormNumber = (e) => {
        console.log(questions.length, formNumber)
        console.log(props.user_id)
        console.log(formState)
        
        if( e === 'next' && questions.length > formNumber + 1){
            setFormNumber(formNumber + 1);
        }
        if( e === 'back' && formNumber >= 1){
            setFormNumber(formNumber - 1);
        }
        
    }





    return(

        <div className = 'formSection intro'>

            <form onSubmit = { submitData }>

                <div className = 'formTitler'>Initial Stats</div>

                <p className = 'introText'>Welcome to whatever I name this application.
                    This app has one purpose. To add a little extra meaning behind the workout for people
                    who are drawn to video games.<br /><br />I hope this will encourage and strengthen your workout routine as
                    you take your character on their journey (to be determined). <br />
                    <br />
                    While it would be super simple to just cheat your way through this game - this is the one game<br />
                    that in the end - you would truly only be cheating yourself.  <br /><br />
                    Please answer the following questions so we can talor the workout accordingly:
                </p>

                { formNumber === 0 ? (
                    <label>
                        {questions[formNumber].content}
                        
                        <input
                        type = 'Number'
                        name = { questions[formNumber].name }
                        value = { formState.inPushups }
                        onChange = { handleChange }
                        />

                        
                        
                    </label>
                    ) :
                    formNumber === 1 ? (
                        <label>
                        {questions[formNumber].content}
                        
                        <input
                        type = 'Number'
                        name = { questions[formNumber].name }
                        value = { formState.inJumpingJacks }
                        onChange = { handleChange }
                        />

                        
                        
                    </label>
                    ) :
                    formNumber === 2 ? (
                        <label>
                        {questions[formNumber].content}
                        
                        <input
                        type = 'Number'
                        name = { questions[formNumber].name }
                        value = { formState.inStepUps }
                        onChange = { handleChange }
                        />

                       
                        
                    </label>
                    ) :
                    formNumber === 3 ? (
                        <label>
                        {questions[formNumber].content}
                        
                        <input
                        type = 'Number'
                        name = { questions[formNumber].name }
                        value = { formState.inMountainClimbers }
                        onChange = { handleChange }
                        />

                        
                        
                    </label>
                    ) :
                    formNumber === 4 ? (
                        <label>
                        {questions[formNumber].content}
                        
                        <input
                        type = 'Number'
                        name = { questions[formNumber].name }
                        value = { formState.inSquatJumps }
                        onChange = { handleChange }
                        />

                        
                        
                    </label>
                    ) :
                    formNumber === 5 ? (
                        <label>
                        {questions[formNumber].content}
                        
                        <input
                        type = 'Number'
                        name = { questions[formNumber].name }
                        value = { formState.inBurpees }
                        onChange = { handleChange }
                        />

                        
                        
                    </label>
                    ) : null                    
            }
            <p  className = 'buttonButNot' onClick = { () => handleFormNumber('back') }>Back</p>    
            { formNumber !== 5 ? (
                <p  className = 'buttonButNot' onClick = { () => handleFormNumber('next') }>Next</p>    
            ) :
            <button className = 'buttonButNot'>Submit</button>
                
            }
            
            </form>
        </div>
    )


}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user_id: state.auth.user._id
});

export default connect(mapStateToProps, { initialStats })(InitialStats);