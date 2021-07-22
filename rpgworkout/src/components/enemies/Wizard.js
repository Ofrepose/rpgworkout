import React, {Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import '../../styles/css/index.css';


//animation 
import { SpriteAnimator } from 'react-sprite-animator';
import Attack1 from '../../styles/images/StrikerAttack1.png';
import Attack2 from '../../styles/images/character1/attack2.png';
import Idle1 from '../../styles/images/strikerIdle.png';






/******************************************************************************
 *                                 Wizard     
 *                   Default Enemy Character Model Component                      
 ******************************************************************************/

function Wizard(props){

    // setup useState
    const [ characterMaxHealth, setCharacterMaxHealth ] = useState(90);
    const [ characterHealth, setCharacterHealth ] = useState(characterMaxHealth);
    const [ characterAction, setCharacterAction ] = useState('attack1');
    // end setup useState


    useEffect( () => {

        return props.profile !== null ? (
            setCharacterMaxHealth(props.profile.characterMaxHealth), 
            setCharacterHealth(props.profile.characterMaxHealth)
            ) : null;

    }, []);
    
    




    return(

        <Fragment>

            <div id = 'damageHolder'></div>

            <div id = 'enemyContainer'>

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
            
                <div id = 'characterExperience' className = 'white'>{`lvl:${props.profile.level}`}</div>
            
            </div>           
            
        </Fragment>

    )

};






const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    profile: state.auth.user
});






export default connect(mapStateToProps, {})(Wizard);;