import React, {Fragment, useEffect, useState} from 'react';
import { connect, Provider } from 'react-redux';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import setAuthToken from '../../utils/setAuthToken';
import store from '../../store';
import { loadUser } from '../../actions/auth';

import '../../styles/css/index.css';

// styles
import styled from 'styled-components';
import Background from '../../styles/images/magicCliffs.png';






const TopDiv = styled.div`
    background-image: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${Background});
`;

const placementText = [
    {
        content:'Welcome to <whatever I name this thing>'
    },
    {
        content:'This is a simple application to help encourage sticking with workouts by using rpg mechanics'
    }
]

if(localStorage.token){
    console.log('inside set token on app.js')
    // this function sets x-auth-token header to token if in localstorage
    setAuthToken(localStorage.token);
  }



function Dashboard(props){

    const [ dialogContainer, setDialogContainer ] = useState(placementText);
    const [ dialogPosition, setDialogPosition ] = useState(0);

    useEffect( () => {
        store.dispatch(loadUser());
    }, [])

    const dialogController = () =>{
        console.log(dialogContainer.length)
        if( dialogContainer.length > dialogPosition){
            setDialogPosition(dialogPosition+1);
        }
    }
    
    return(
        <Fragment>
            
            { props.profile == null ? null : (
                <TopDiv className = 'welcomeDiv'>

                { props.profile.style === 'default' ? (
                    <section className = 'style1'>
                        <div className = 'dialogSectionFixed'>
                        { dialogContainer.length  > dialogPosition ? (
                            <Fragment>
                            <p className = 'dialogContent' id = 'dialogContentBox'>{ dialogContainer[dialogPosition].content }</p>
                            
                                <button onClick = {dialogController}>Next</button>
                                </Fragment>
                            ):(
                                <button onClick = ''>Begin your journey</button>
                            )}
                        </div>
                        
                    </section>
                ) : null }
                    
                </TopDiv>
            )}

        </Fragment>
        
    )
}







const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    profile: state.auth.user
})
export default connect(mapStateToProps, {})(Dashboard);

