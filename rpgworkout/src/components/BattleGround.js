import React, { useState } from 'react';
import { sendXP, sendHealth, lvlUp } from '../actions/user';
import { connect } from 'react-redux';

import '../styles/css/index.css';

// import characters
import Character1 from './character1/Character1';
import Wizard from './enemies/Wizard';

// import damage
import Damage from './Damage';



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





/******************************************************************************
 *                              BattleGround     
 *                        Handles character battles
 *      [handleCharacterAction(), handleEnemyAction(), handleEnemyTurn(), 
 *  chooseExercise(), changeTurn(), hitEnemy(), changePlayerTurnInProgress()]                       
 ******************************************************************************/

function BattleGround(props){

    const characterState = {
        exp: 0,
        health: 0,
        id: props.profile._id
    }
    // setup useState
    const [ characterAction, setCharacterAction ] = useState('idle');
    const [ playerTurnInProgress, setPlayerTurnInProgress ] = useState(false);
    const [ playerTurn, setPlayerTurn ] = useState(true);
    const [ playerHealth, setPlayerHealth ] = useState(100);

    const [ enemyAction, setEnemyAction ] = useState('idle');
    const [ enemyHealth, setEnemyHealth] = useState(100);
    // end setup useState





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

            // show damage animation
            const characterDamagerContent = document.createElement('p');
            characterDamagerContent.classList.add('damageContent');
            characterDamagerContent.innerText = `5`;
            document.querySelector('#characterDamageHolder').appendChild(characterDamagerContent);
            // end show damage animation

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
            // show damage animation
            const damagerContent = document.createElement('p');
            damagerContent.classList.add('damageContent');
            damagerContent.innerText = `5`;
            document.querySelector('#damageHolder').appendChild(damagerContent);
            // end show damage animation

            //check if level up available if so do that
            if(props.profile.expToNextLevel <= props.profile.exp){
                console.log(characterState)
                props.lvlUp(characterState);
            }
        }else{
            handleEnemyAction('death');
        }
        
    }






    const changePlayerTurnInProgress = () =>{        
        setPlayerTurnInProgress(!playerTurnInProgress);
    }






    const completedExercise = () =>{
        // send data to backend includg xp and find amount of expected done
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
                                <button onClick = {()=>handleCharacterAction('death',2500)}>Potion</button>
                            </div>
                        )
                        }                       
                        
                    </div>

                </div>

            </section>

        </section>
    )

}






const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user_id: state.user.user._id
});





export default connect(mapStateToProps, {sendXP, sendHealth, lvlUp})(BattleGround);