import React, { Fragment } from 'react';




function MoneyStats(props){
    return(
        <section className = "moneySection">
            <div  className = 'moneyIcon'></div>
            <div className = 'moneyAmt'>{`$${props.amt}`}</div>
        </section>
    )
}





export default MoneyStats;