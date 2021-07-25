import React, {Fragment, useEffect, useState} from 'react';
import ReactDom from 'react-dom';
import { Link, Redirect } from 'react-router-dom';
import  { connect } from 'react-redux';
import '../../styles/css/index.css';
import styled from 'styled-components';
import Background from '../../styles/images/bg.png';

// import components
import Register from '../forms/Register';
import Login from '../forms/Login';
import Selector from '../Selector';

const WelcomeDiv = styled.div`
    background-image: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${Background});
`;




function Home(props){

    const [ newUser, setNewUser ] = useState(null);

    if( props.isAuthenticated ){
        return <Redirect to="/dashboard" />
      }

    return(
        <Fragment>
            <WelcomeDiv className = 'welcomeDiv'>


            
            {newUser === 'login' ? (
                <div className = 'journeySelector'>        
            
                <button onClick = {()=>setNewUser('newJourney')}>New Journey</button>
                <button onClick = {()=>setNewUser('continueJourney')}>Continue Journey</button>

            </div>
            ): newUser === 'newJourney' ? (
                <Register />
            ): newUser === 'continueJourney'? (
                <Login />
            ):
                
                <Fragment>
                <div className = 'heroContainer'>

                    <h1 className = 'heroTitle'>Workout Adventure</h1>
                    <p className = 'underTitle'>a lifechanging journey</p>
                </div>
                    
                        <Selector 
                            selectorName = 'new game'
                            onClick = {()=>setNewUser('newJourney')}
                        />

                        <Selector 
                            selectorName = 'continue game'
                            onClick = {()=>setNewUser('continueJourney')}
                        />
                    

                    </Fragment>

                        

                

               
                
            
            }
            

            {/* <Login /> */}
            {/* <Register /> */}
            </WelcomeDiv>
        </Fragment>
    )
}

const mapStateToProps = state =>({
    isAuthenticated: state.auth.isAuthenticated
  })

export default connect(mapStateToProps,{})(Home);