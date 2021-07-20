import React, {Fragment, useEffect, useState } from 'react';
import { connect, Provider } from 'react-redux';
import '../../styles/css/index.css';

import setAuthToken from '../../utils/setAuthToken';
import store from '../../store';
import { loadUser } from '../../actions/auth';



//animation tester
import { SpriteAnimator } from 'react-sprite-animator';
import Attack1 from '../../styles/images/StrikerAttack1.png';
import Attack2 from '../../styles/images/character1/attack2.png';
import Idle1 from '../../styles/images/strikerIdle.png';







function Wizard(props){

    
    const [ characterMaxHealth, setCharacterMaxHealth ] = useState(90);
    const [ characterHealth, setCharacterHealth ] = useState(characterMaxHealth);
    const [ characterAction, setCharacterAction ] = useState('attack1');


    // const handleCharacterAction = (x,timer) => {
        
        
    //     setCharacterAction(x);
    //     setTimeout(function(){
    //         setCharacterAction('idle');
    //     },timer)
    // }


    useEffect( () => {
        console.log('inside useEffect')
        return props.profile !== null ? (
            setCharacterMaxHealth(props.profile.characterMaxHealth), 
            setCharacterHealth(props.profile.characterMaxHealth)
            ) : null;
    }, [])

    return(
        <Fragment>
            <div className = 'enemyContainer'>

                { props.enemyAction === 'attack1' ? (
                    <SpriteAnimator
                    className = 'character1'
                    sprite = { Attack1 }
                    width = { 281.312 }
                    height = { 211 }
                    fps ={8}
                    stopLastFrame ={ true }
                    startFrame = {1}
                    scale = { .85 }
                />
                ) :
                props.enemyAction === 'attack2' ? (
                    <SpriteAnimator
                    className = 'character1'
                    sprite = { Attack2 }
                    width = { 150 }
                    height = { 111 }
                    fps ={3}
                    stopLastFrame ={ true }
                    startFrame = {1}
                    scale = { .85 }
                />
                ) : 
                                  
                    <SpriteAnimator
                    className = 'character1'
                    sprite = { Idle1 }
                    width = { 211 }
                    height = { 211 }
                    fps ={8}
                    stopLastFrame ={ false }
                    startFrame = {1}
                    scale = { .85 }
                />
                

            }

                
                

            </div>
            <div className = 'characterInfoContainer'>
                    <p className = 'characterName white'> Random Enemy</p>
                    <progress id="health" value= { props.enemyHealth } max='100'></progress>
                    {/* <div id = 'characterHealth' className = 'white'>{`${characterHealth}/${characterMaxHealth}`}</div> */}
                    <div id = 'characterExperience' className = 'white'>{`lvl:${props.profile.level}`}</div>
                </div>
            {/* <button onClick = {()=>handleCharacterAction('attack1', 500)}>Attack</button>
            <button onClick = {()=>handleCharacterAction('attack2',1500)}>Attack2</button> */}
            
        </Fragment>
    )
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    profile: state.auth.user
})


export default connect(mapStateToProps, {})(Wizard);;