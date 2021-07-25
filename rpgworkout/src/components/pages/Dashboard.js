import React, {Fragment, useEffect, useState} from 'react';
import { connect, Provider } from 'react-redux';
import ReactDom from 'react-dom';
import { useHistory, Redirect } from 'react-router-dom';

import setAuthToken from '../../utils/setAuthToken';
import store from '../../store';
import { loadUser } from '../../actions/auth';
import { getUser } from '../../actions/user';

import '../../styles/css/index.css';

import InitialStatsForm from '../forms/InitialStats';

// styles
import styled from 'styled-components';
import Background from '../../styles/images/bg3.png';

// Import BattleGround
import BattleGround from '../BattleGround';

// Import RadialMenu
import RadialMenu from '../RadialMenu';








const TopDiv = styled.div`
    background-image: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${Background});
`;

const placementText = [
    {
        content:'Welcome to <whatever I name this thing>'
    },
    {
        content:'This is a simple application to help encourage sticking with workouts by using rpg mechanics'
    },
    
]

if(localStorage.token){
    // this function sets x-auth-token header to token if in localstorage
    setAuthToken(localStorage.token);
    loadUser();
  }



function Dashboard(props){

    const history = useHistory();

    const [ dialogContainer, setDialogContainer ] = useState(placementText);
    const [ dialogPosition, setDialogPosition ] = useState(0);
    const [ radialMenu, setRadialMenu ] = useState(null);
    

    

    useEffect( () => {
        console.log(props.profile)
        if(props.profile == null){store.dispatch(getUser());}
                 
    }, [])


    const dialogController = () =>{
        console.log(dialogContainer.length)
        if( dialogContainer.length > dialogPosition){
            setDialogPosition(dialogPosition+1);
        }else{
            console.log('show forms')
            //  show forms to select character/info/styles
            
        }
    }

    const handleRadialClick = (x) =>{
        setRadialMenu(x);
    }

    const characterController = () => {
        // This is where we handle the character animation and begin damage dealt / received.
        
    }
    
    return(

        props.loading && props.profile == null ? <div>Loading!</div> :
        <Fragment>
            
            { props.profile == null ? null : (
                <TopDiv className = 'welcomeDiv'>

                { props.profile.totalExp === 0 ? (
                    <InitialStatsForm />
                ): null}
                
                
                </TopDiv>
            )}
            { props.profile !== null && props.profile.totalExp !== 0 && radialMenu === 'battle' ? 
            (
                <BattleGround 
                profile = {props.profile} 
                handleRadialClick = { handleRadialClick }
                />
                

            ) : props.profile !== null && props.profile.totalExp !== 0 && radialMenu === null ? 
            (
                <RadialMenu 
                handleRadialClick = { handleRadialClick }
                />
            ) : null
            
            }
            

            

        </Fragment>
        
    )
}







const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    profile: state.user.user,
    loading: state.user.loading
})
export default connect(mapStateToProps, {})(Dashboard);

