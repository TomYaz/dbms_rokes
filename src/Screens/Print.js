import React, { useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlinePrinter } from 'react-icons/ai';
import { gotToScreen } from '../HelperFunctions';
import './CSS/Print.css';

function Print() {

    const [object, setObject] = useState(JSON.parse(localStorage.getItem('active_object')));

    useEffect(() => {
        if (localStorage.getItem('active_object') != undefined) {
            setObject(JSON.parse(localStorage.getItem('active_object')))
        }
    }, [])
    return (
        <div className='Print'>
            <div className='print-row' id='print-buttons'>
                <button className='print-back bold' id="back-print" onClick={() => gotToScreen('file')}>
                    <AiOutlineClose className='print-icon' />
                </button>

                <button className='print-print bold' onClick={() => {
                    document.getElementById('print-buttons').style.display = 'none';
                    window.print();
                    setTimeout(() => {
                        document.getElementById('print-buttons').style.display = 'flex';
                    }, 1000)
                }}>
                    <AiOutlinePrinter id="print-print" className='print-icon' />
                </button>
            </div>

            <span id="obj-num" className='object-number medium'>{object.object_number}</span>
            <h1 className='printTitle black'>Object File</h1>

            <img className='print-img' src={object.image} />
            <div className='print-container'>

                <div className='print-section'>

                    <h2 className='print-subtitle medium'>General Information</h2>

                    <div className='print-row'>
                        <label className='title bold'>Object No</label>
                        <span className='answer regular'>{object.object_number}</span>
                    </div>

                    <div className='print-row'>
                        <label className='title bold'>Object Name</label>
                        <span className='answer regular'>{object.object_name}</span>
                    </div>

                    <div className='print-row'>
                        <label className='title bold'>Object Type</label>
                        <span className='answer regular'>{object.object_type}</span>
                    </div>

                    <div className='print-row'>
                        <label className='title bold'>Exhibition Location</label>
                        <span className='answer regular'>{object.exhibition_location}</span>
                        <span className='answer2 regular'>{object.exhibition_showcase === true ? 'Showcase' : 'Wall'}</span>
                    </div>

                    <div className='print-row'>
                        <label className='title bold'>Caption</label>
                        <span className='answer regular'>{object.caption}</span>
                    </div>

                    <h2 className='print-subtitle medium'>Collector Information</h2>

                    <div className='print-row'>
                        <label className='title bold'>Collector</label>
                        <span className='answer fixed-line regular'>{object.collector_name}</span>
                    </div>

                    <div className='print-row'>
                        <label className='title bold'>Address</label>
                        <span className='answer fixed-line regular'>{object.collector_address}</span>
                    </div>

                    <div className='print-row'>
                        <label className='title bold'>Telephone</label>
                        <span className='answer fixed-line regular'>{object.collector_phone}</span>
                    </div>

                    <h2 className='print-subtitle medium'>Insurance</h2>

                    <div className='print-row'>
                        <label className='title bold'>Insurance</label>
                        <span className='answer fixed-small regular'>{object.insurance}</span>
                    </div>

                    <h2 className='print-subtitle medium'>Museum Information</h2>

                    <div className='print-row'>
                        <label className='title bold'>Museum ID</label>
                        <span className='answer fixed-line regular'>{object.museum_id}</span>
                    </div>

                    <div className='print-row'>
                        <label className='title bold'>Transport</label>
                        <span className='answer fixed-line regular'>{object.transport}</span>
                    </div>

                    <div className='print-row'>
                        <label className='title bold'>Date of transport from collector</label>
                        <span className='answer fixed-line regular'>{object.date_of_departure}</span>
                    </div>

                    <div className='print-row'>
                        <label className='title bold'>Date of arrival at museum</label>
                        <span className='answer fixed-line regular'>{object.date_of_arrival}</span>
                    </div>

                    <div className='print-row'>
                        <label className='title bold'>Condition report</label>
                        <span className='answer fixed regular'>{object.condition_report}</span>
                    </div>

                    <h2 className='print-subtitle medium'>Signatures</h2>

                    <div className='print-row'>
                        <span className='signature medium'>Responsible's signature</span>

                        <span className='signature medium'>Collector's signature</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Print;