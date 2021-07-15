import React, {Fragment, useEffect, useState} from 'react';
import ReactDom from 'react-dom';
import { Link, Redirect } from 'react-router-dom';
import  { connect } from 'react-redux';
import '../../styles/css/index.css';
import styled from 'styled-components';
import Background from '../../styles/images/magicCliffs.png';

// import components
import Register from '../forms/Register';
import Login from '../forms/Login';

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
            <WelcomeDiv className = 'welcomeDiv'></WelcomeDiv>
            {newUser === null ? (
                <div className = 'journeySelector'>        
            
                <button onClick = {()=>setNewUser('newJourney')}>New Journey</button>
                <button onClick = {()=>setNewUser('continueJourney')}>Continue Journey</button>

            </div>
            ): newUser === 'newJourney' ? (
                <Register />
            ):
                <Login />
            
            }
            

            {/* <Login /> */}
            {/* <Register /> */}
            
        </Fragment>
    )
}

const mapStateToProps = state =>({
    isAuthenticated: state.auth.isAuthenticated
  })

export default connect(mapStateToProps,{})(Home);