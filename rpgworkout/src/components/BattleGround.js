import React, { useState, useEffect } from 'react';
import { sendXP, sendHealth, lvlUp } from '../actions/user';
import { connect } from 'react-redux';

import '../styles/css/index.css';

// import characters
import Character1 from './character1/Character1';
import Wizard from './enemies/Wizard';

// Import GUI items
import MoneyStats from './gui/MoneyStats';

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
    const [ potions, setPotions ] = useState(false);
    const [ repsDone, setRepsDone ] = useState(false);

    const [ enemyAction, setEnemyAction ] = useState('idle');
    const [ enemyHealth, setEnemyHealth] = useState(props.profile.characterMaxHealth + (props.profile.characterMaxHealth * .25));
    const enemyMaxHealth = props.profile.characterMaxHealth + (props.profile.characterMaxHealth * .25)
    const enemyLevel = props.profile.level;
    
    // end setup useState

    
    useEffect( () =>{
        
        if(enemyHealth > 0 && !playerTurn){

            handleEnemyAction('attack1', 1000);
            setTimeout( () =>{          
                setPlayerTurn(true);
                changePlayerTurnInProgress()
            },1500)

        }else if(enemyHealth <= 0 && !playerTurn){

            handleEnemyAction('death',1000)
            setTimeout( () =>{
                props.handleRadialClick(null)
            }, 5000)

        }else{

            handleEnemyAction('idle')

        }

    }, [enemyHealth, playerTurn])



    const handleCharacterAction = (x,timer) => {        
        
        if(x === 'death' || characterAction === 'death'){

            setCharacterAction(x);
            return

        }else{

            setCharacterAction(x);
            let totalDamageDone = document.querySelector('#repAmountDone').value;
            
           
            setRepsDone(!repsDone);
            setTimeout(async function(){
                setCharacterAction('idle');
                characterState.exp = 5;                
                                
                hitEnemy((props.profile.strength) * totalDamageDone)                
                props.sendXP(characterState)
                
            },timer)
            
        }
        
    }






    const handleEnemyAction = async (x, timer) =>{

        if(x === 'death' || enemyAction === 'death'){

            setEnemyAction('death');
            return

        }
        else if( x === 'attack1' || x === 'attack2'){

            setEnemyAction(x);
            // adjust amount of damage enemy does
            const hitChance = Math.floor( Math.random() * 100 );            
            let enemyDamageAmt = 0;
            if(props.profile.dexterity < hitChance){

                enemyDamageAmt = (Math.floor( Math.random() * 5) * props.profile.level);
                console.log(enemyDamageAmt)
                characterState.health = -(enemyDamageAmt);
                await props.sendHealth(characterState);

            }else{

                // Notify user with narration that attack missed
                console.log("MISSED")

            }
            

            // show damage animation
            const characterDamagerContent = document.createElement('p');
            characterDamagerContent.classList.add('damageContent');
            characterDamagerContent.innerText = `${enemyDamageAmt}`;
            document.querySelector('#characterDamageHolder').appendChild(characterDamagerContent);
            // end show damage animation

            setTimeout(function(){
                setEnemyAction('idle');
            },timer)      

        }

        else{
            setEnemyAction(x);
            setTimeout(function(){
                // setEnemyAction('idle');
            },timer)
        }
        
    }








    const chooseExercise = () => {
        
        let thisExercise = defaultExercises[ Math.floor( Math.random() * defaultExercises.length)]; 

        currentExercise = thisExercise.name;

        for(var i in props.profile){

            if(i.toString() === thisExercise.dbName){
                currentAmount = props.profile[i];
            }

        }

        changePlayerTurnInProgress()

        

        return thisExercise;
    
    }

    
    



    const changeTurn = async () => {

        if(playerTurn){
            // changePlayerTurnInProgress();

            await handleCharacterAction('attack1', 1500);
            setTimeout( () => {
                setPlayerTurn(false)                
            }, 2000)          
            
            return 

        }
        
        else if(!playerTurn){

            return setPlayerTurn(true)
            
        }       
        
    }






    const hitEnemy = async ( amt ) => {

        if (enemyHealth - amt >= 0){

            setEnemyHealth(enemyHealth - amt)
            // show damage animation
            const damagerContent = document.createElement('p');
            damagerContent.classList.add('damageContent');
            damagerContent.innerText = `${amt}`;
            document.querySelector('#damageHolder').appendChild(damagerContent);
            // end show damage animation

            //check if level up available if so do that
            if(props.profile.expToNextLevel <= props.profile.exp){

                console.log(characterState)
                props.lvlUp(characterState);

            }
        }else{

            await setEnemyHealth(0)
            handleEnemyAction('death');

        }
        
    }






    const changePlayerTurnInProgress = () =>{        
        setPlayerTurnInProgress(!playerTurnInProgress);
    }



    const enterReps = () => {
        
    }


    const completedExercise = () =>{
        // send data to backend includg xp and find amount of expected done
        changePlayerTurnInProgress();
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
            enemyMaxHealth = { enemyMaxHealth }
            enemyLevel = { enemyLevel }
            />            

            <Character1 
            characterAction = {characterAction} 
            handleCharacterAction = {handleCharacterAction} 
            />

            <section className = 'battlefieldDialog'>

                <div className = 'battlefieldOption'>

                    <div className = 'dialogContainer'>

                        { !playerTurn && !potions && !repsDone ? (
                            <div className = 'dialog'>
                                ...waiting for enemy
                            </div>
                            ) : playerTurnInProgress && !potions && !repsDone ? (
                                <div className = 'dialog'>
                                    {`Do ${currentAmount} ${currentExercise}`}
                                    <button onClick = {() => setRepsDone(!repsDone)} className = 'fullWidth'>Completed!!</button>
                                </div>
                                
                        ) : repsDone && playerTurn ? (
                            <div className = 'dialog'>
                                <div>{`how many ${currentExercise}s did you do?`}</div>
                                <input 
                                type = 'number'
                                name = 'repAmountDone'
                                id = 'repAmountDone'
                                />
                                <button onClick = {changeTurn} className = 'fullWidth' >continue</button>
                                
                            </div>
                        )  :  playerTurn && !playerTurnInProgress ? (
                            <div className = 'dialog'>
                                <button onClick = {chooseExercise}>Attack</button>
                                <button onClick = {()=>handleCharacterAction('death',2500)}>Potion</button>
                            </div>
                        ) :
                        <div className = 'dialog'>
                        ...waiting 
                    </div>

                        }                       
                        
                    </div>

                </div>

            </section>

            <MoneyStats 
                amt = { props.profile.Gold }
            />

        </section>
    )

}






const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user_id: state.user.user._id
});





export default connect(mapStateToProps, {sendXP, sendHealth, lvlUp})(BattleGround);