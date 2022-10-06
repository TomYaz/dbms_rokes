import React from 'react';
import './CSS/Item.css';
import img from '../Ressources/Images/img1.jpeg';
import { gotToScreen } from '../HelperFunctions';

function Item(props) {
    return (
        <div className='Item' key={props.item.object_number} onClick={() => {
            localStorage.setItem('active_object', JSON.stringify(props.item));
            localStorage.setItem('object_isActive', true);
            gotToScreen('file');
        }}>
            <img src={props.item.image} className='img' />
            <div className='right'>
                <h1 className='text bold'>{props.item.object_name}</h1>
                <h2 className='text bold'><span className='text-underline light'>Obj No</span> : <span className='text-number'>{props.item.object_number}</span></h2>
                <h2 className='text light'><span className='text-underline light'>Type</span> : {props.item.object_type} </h2>
                <h2 className='text light'><span className='text-underline light'>Collector</span> : {props.item.collector_name}</h2>
            </div>
        </div>
    )
}

export default Item;