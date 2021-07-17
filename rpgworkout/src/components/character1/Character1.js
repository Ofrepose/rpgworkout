import React, {Fragment, useEffect, useState } from 'react';
import { connect, Provider } from 'react-redux';
import '../../styles/css/index.css';

import setAuthToken from '../../utils/setAuthToken';
import store from '../../store';
import { loadUser } from '../../actions/auth';



//animation tester
import { SpriteAnimator } from 'react-sprite-animator';
import Attack1 from '../../styles/images/character1/attack1.png';
import Attack2 from '../../styles/images/character1/attack2.png';
import Idle1 from '../../styles/images/character1/idle1Large.png';







function Character1(props){

    const [ characterHealth, setCharacterHealth ] = useState(90);
    
    const [ characterAction, setCharacterAction ] = useState('idle');


    const handleCharacterAction = (x,timer) => {
        
        
        setCharacterAction(x);
        setTimeout(function(){
            setCharacterAction('idle');
        },timer)
    }

    return(
        <Fragment>
            <div className = 'characterContainer'>

                { characterAction === 'attack1' ? (
                    <SpriteAnimator
                    className = 'character1'
                    sprite = { Attack1 }
                    width = { 150 }
                    height = { 111 }
                    fps ={3}
                    stopLastFrame ={ true }
                    startFrame = {1}
                />
                ) :
                characterAction === 'attack2' ? (
                    <SpriteAnimator
                    className = 'character1'
                    sprite = { Attack2 }
                    width = { 150 }
                    height = { 111 }
                    fps ={3}
                    stopLastFrame ={ true }
                    startFrame = {1}
                />
                ) : 
                                  
                    <SpriteAnimator
                    className = 'character1'
                    sprite = { Idle1 }
                    width = { 150 }
                    height = { 111 }
                    fps ={3}
                    stopLastFrame ={ false }
                    startFrame = {1}
                />
                

            }

                

                <p className = 'characterName white'>{props.profile.name}</p>
                <progress id="health" value="80" max={props.profile.characterMaxHealth}></progress>
                <div id = 'characterHealth' className = 'white'>{`${characterHealth}/${props.profile.characterMaxHealth}`}</div>
                <progress id="xp" value={props.profile.exp} max="100"></progress>
                <div id = 'characterExperience' className = 'white'>{`lvl:${props.profile.level}`}</div>

            </div>
            <button onClick = {()=>handleCharacterAction('attack1', 500)}>Attack</button>
            <button onClick = {()=>handleCharacterAction('attack2',1500)}>Attack2</button>
            
        </Fragment>
    )
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    profile: state.auth.user
})


export default connect(mapStateToProps, {})(Character1);;