import React, { useEffect, useState } from 'react';
import './CSS/Overlay.css';
import { FiCheckCircle } from 'react-icons/fi';
import Loader from './Loader';
import { gotToScreen } from '../HelperFunctions';
import { deleteItem } from '../Firebase/FirebaseLoader';

function Overlay(props) {

    useEffect(() => {
        if (props.show) {
            document.getElementById('overlay').style.display = 'flex';
        } else document.getElementById('overlay').style.display = 'none';

    }, [props])

    return (
        <div className='Overlay' id='overlay'>
            {props.changes &&
                <div className='overlay-form'>
                    <h1 className='bold'>You have unsaved changes.</h1>
                    <p className='light'>Some changes are unsaved. Do you still wish to leave this page?</p>

                    <div className='buttons'>
                        <button className='stay' onClick={() => props.close()} >Stay</button>
                        <button className='leave' onClick={() => gotToScreen('main')}>Leave</button>
                    </div>
                </div>
            }

            {props.saving &&
                <div className='overlay-form loaderDiv'>
                    {!props.changesSaved &&
                        <Loader />
                    }
                    {props.changesSaved &&
                        <FiCheckCircle className='check' />
                    }
                    <h2 className='bold'>{props.changesSaved ? 'Changes saved.' : 'Saving changes...'}</h2>
                </div>
            }

            {props.deleteItem &&
                <div className='overlay-form'>
                    <h1 className='bold'>Are you sure you want to delete this item?</h1>
                    <p className='light'>This action cannot be reversed.</p>

                    <div className='buttons'>
                        <button className='stay' onClick={() => props.close()}>Cancel</button>
                        <button className='leave' onClick={() => {
                            deleteItem(props.currentRef.toString()).then(res => {
                                props.close();
                                gotToScreen('main');
                            });
                        }}>Delete</button>
                    </div>
                </div>
            }
        </div >
    )
}

export default Overlay;