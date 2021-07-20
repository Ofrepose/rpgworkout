import React, { Fragment, useEffect, useState } from 'react';

import { sendXP, sendHealth } from '../actions/auth';
import { connect } from 'react-redux';

import '../styles/css/index.css';

// import characters
import Character1 from './character1/Character1';
import Wizard from './enemies/Wizard';



const defaultExercises = [
    {
        name: 'Push Ups',
        dbName: 'inPushups'
    },
    {
        name: 'Jumping Jacks',
        dbName: 'inJumpingJacks'
    },
    {
        name: 'Step Ups',
        dbName: 'inStepUps'
    },
    {
        name: 'Mountain Climbers',
        dbName: 'inMountainClimbers'
    },
    {
        name: 'Squat Jumps',
        dbName: 'inSquatJumps'
    },
    {
        name: 'Burpees',
        dbName: 'inBurpees'
    }
]

let currentExercise = '';
let currentAmount = 0;




function BattleGround(props){

    const characterState = {
        exp: 0,
        health: 0,
        id: props.profile._id
    }

    const [ characterAction, setCharacterAction ] = useState('idle');
    const [ playerTurnInProgress, setPlayerTurnInProgress ] = useState(false);
    const [ playerTurn, setPlayerTurn ] = useState(true);
    const [ playerHealth, setPlayerHealth ] = useState(100);

    const [ enemyAction, setEnemyAction ] = useState('idle');
    const [ enemyHealth, setEnemyHealth] = useState(100);

    const handleCharacterAction = (x,timer) => {        
        
        if(x === 'death' || characterAction === 'death'){
            setCharacterAction(x);
            return
        }else{
            setCharacterAction(x);
            setTimeout(async function(){
                setCharacterAction('idle');
                characterState.exp = 5;
                console.log(characterState)
                hitEnemy(5)
                await props.sendXP(characterState)
            },timer)
        }
        
    }

    const handleEnemyAction = async (x, timer) =>{
        if(x === 'death' || enemyAction === 'death'){
            setEnemyAction(x);
            return
        }
        else if( x === 'attack1' || x === 'attack2'){
            setEnemyAction(x);
            // adjust amount of damage enemy does
            characterState.health = 5;
            await props.sendHealth(characterState);
            setTimeout(function(){
                setEnemyAction('idle');
            },timer)
        }
        else{
            setEnemyAction(x);
            setTimeout(function(){
                setEnemyAction('idle');
            },timer)
        }
    }

    const handleEnemyTurn = () =>{
        console.log('inside handle enemy turn')
        handleEnemyAction('attack1', 1000);
        setTimeout( () =>{
            
            
            setPlayerTurn(true);
            changePlayerTurnInProgress()
        },1500)
        
    }


    const chooseExercise = () => {
        
        let thisExercise = defaultExercises[ Math.floor( Math.random() * defaultExercises.length)]; 
        currentExercise = thisExercise.name;
        for(var i in props.profile){
            if(i.toString() === thisExercise.dbName){
                currentAmount = props.profile[i];
            }
        }
        changePlayerTurnInProgress();
        return thisExercise;
    
    }
    
    const changeTurn = () => {
        console.log(playerTurn)
        if(playerTurn){
            handleCharacterAction('attack1', 1500);
            setTimeout( () => {
                setPlayerTurn(false)
                handleEnemyTurn();
            }, 2000)
            
            
            return 
        }
        
        else if(!playerTurn){
            console.log('inside !playerTurn in changeTurn')
            return setPlayerTurn(true)
            
        }
        
        
    }

    const hitEnemy = ( amt ) => {
        if (enemyHealth - amt >= 0){
            setEnemyHealth(enemyHealth - amt)
            console.log(enemyHealth)
        }else{
            handleEnemyAction('death');
        }
        
    }

    const changePlayerTurnInProgress = () =>{
        setPlayerTurnInProgress(!playerTurnInProgress);
    }

    const completedExercise = () =>{
        // send shit to backend includg xp and find amount of expected done
    }

    return(

        <section className = 'battlefield'>
            <div className = 'turnControllerContainer'>
                <div className = 'turnController'>{ playerTurn ? 'Your turn' : 'Enemy Turn'}</div>
            </div>
            <Wizard 
            enemyAction = {enemyAction}
            handleEnemyAction = { handleEnemyAction }
            enemyHealth = { enemyHealth }
            />

            <Character1 
            characterAction = {characterAction} 
            handleCharacterAction = {handleCharacterAction} 
            />

            <section className = 'battlefieldDialog'>

                <div className = 'battlefieldOption'>

                    <div className = 'dialogContainer'>

                        {/* <button onClick = {()=>handleCharacterAction('attack1', 500)}>Attack</button> */}
                        { !playerTurn ? (
                            <div className = 'dialog'>
                                ...waiting for enemy
                            </div>
                            ) : playerTurnInProgress ? (
                                <div className = 'dialog'>
                                    {`Do ${currentAmount} ${currentExercise}`}
                                    <button onClick = {changeTurn} className = 'fullWidth'>Completed!!</button>
                                </div>
                                
                        ) : (
                            <div className = 'dialog'>
                                <button onClick = {chooseExercise}>Attack</button>
                                <button onClick = {()=>handleCharacterAction('death',2500)}>Death</button>
                            </div>
                        )
                        }

                        {/* <button onClick = {changeTurn}>Change turn</button> */}
                        
                    </div>
                </div>


            </section>

        </section>
    )

}





const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user_id: state.auth.user._id
})





export default connect(mapStateToProps, {sendXP, sendHealth})(BattleGround);