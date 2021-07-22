import React, {Fragment, useEffect, useState } from 'react';
import { connect, Provider } from 'react-redux';
import '../../styles/css/index.css';


//animation tester
import { SpriteAnimator } from 'react-sprite-animator';
import Attack2 from '../../styles/images/character1/attack2.png';
import Idle1 from '../../styles/images/character1/knightIdle.png';
import Attack1 from '../../styles/images/character1/knightAttack1.png';
import Death from '../../styles/images/character1/knightDeath.png';








/******************************************************************************
 *                                 Character1     
 *                   Default Character Model Component                      
 ******************************************************************************/

function Character1(props){





    
    return(
        
        <Fragment>

            <div id = 'characterDamageHolder'></div>
            
            <div className = 'characterContainer'>

                { props.characterAction === 'attack1' ? (
                    <SpriteAnimator
                    className = 'character1'
                    sprite = { Attack1 }
                    width = { 474.772 }
                    height = { 211 }
                    fps ={2}
                    stopLastFrame ={ true }
                    startFrame = {0}
                />
                ) :
                props.characterAction === 'attack2' ? (
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
                props.characterAction === 'death' ? (
                    <SpriteAnimator
                    className = 'character1'
                    sprite = { Death }
                    width = { 316.5333 }
                    height = { 211 }
                    fps ={3}
                    stopLastFrame ={ true }
                    startFrame = {0}
                />
                ):
                                  
                    <SpriteAnimator
                    className = 'character1'
                    sprite = { Idle1 }
                    width = { 211 }
                    height = { 211 }
                    fps ={12}
                    stopLastFrame ={ false }
                    startFrame = {1}
                />
                

                }

                
                { props.profile === null || props.profile.characterHealth === undefined ? null : (
                    <Fragment>
                    <p className = 'characterName white'>{props.profile.name}</p>
                    <progress id="health" value={props.profile.characterHealth} max={props.profile.characterMaxHealth}></progress>
                    <div id = 'characterHealth' className = 'white'>{`${props.profile.characterHealth}/${props.profile.characterMaxHealth}`}</div>
                    <progress id="xp" value={props.profile.exp} max="100"></progress>
                    <div id = 'characterExperience' className = 'white'>{`lvl:${props.profile.level}`}</div>
                    </Fragment>
                )}                

            </div>            
            
        </Fragment>

    )

};







const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    profile: state.auth.user
});






export default connect(mapStateToProps, {})(Character1);;