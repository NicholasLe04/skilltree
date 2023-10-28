import React from 'react';
import './Hotbar.css';
import Treebox from './Treebox';

function Hotbar({category}) {

    let compArr = [];
    for(let i=0;i<4;i++){
        compArr.push(<Treebox key={i}/>);
    }
    
    return (
        <div className="hotbar">
            <h4>{category}</h4>
            <div id='treecube'>
                {compArr}         
            </div>
        </div>
    );
}

export default Hotbar;