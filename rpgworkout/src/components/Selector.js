import React from 'react';


function Selector(props){
    return(

        <div className = 'choiceContainer' onClick = {props.onClick}>
            <div className = 'selectorContainer'>
                <div className = 'selectorContent'>{ props.selectorName }</div>
            </div>
        </div>
    )
}





export default Selector;