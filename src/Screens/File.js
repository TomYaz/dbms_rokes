import React, { useEffect, useState } from 'react';
import './CSS/File.css';
import { AiOutlineRollback, AiOutlineSave, AiOutlinePrinter } from 'react-icons/ai';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import Dropdown from '../Components/Dropdown';
import { buildObject, gotToScreen } from '../HelperFunctions';
import Overlay from '../Components/Overlay';
import _ from 'lodash';
import { saveNewItem } from '../Firebase/FirebaseLoader';

function File() {

    const [number, setNumber] = useState('');
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [exhibitionLocation, setExhibitionLocation] = useState('');
    const [exhibitionShowcase, setExhibitionShowcase] = useState('')
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState('');
    const [collectorName, setCollectorName] = useState('');
    const [collectorPhone, setCollectorPhone] = useState('');
    const [collectorAddress, setCollectorAddress] = useState('');
    const [insurance, setInsurance] = useState('');
    const [museumId, setMuseumId] = useState('');
    const [transport, setTransport] = useState('');
    const [dateOfDeparture, setDateOfDeparture] = useState('');
    const [dateofArrival, setDateOfArrival] = useState('');
    const [condition, setCondition] = useState('');


    const [saving, setSaving] = useState(false);
    const [changes, setChanges] = useState(false);
    const [deleteItem, setDelete] = useState(false);
    const [overlay, openOverlay] = useState(false);
    const [changesSaved, setChangesSaved] = useState(false);

    let showcase_active = false;


    useEffect(() => {
        flipLocation(true);

        if (localStorage.getItem('object_isActive') === 'true') {
            let temp = JSON.parse(localStorage.getItem('active_object'));

            setNumber(temp.object_number);
            setName(temp.object_name);
            setType(temp.object_type);
            flipLocation(temp.exhibition_showcase === true ? true : false);
            setExhibitionLocation(temp.exhibition_location);
            setCaption(temp.caption);
            document.getElementById("uploaded-img").src = temp.image;
            setImage(temp.image);
            setCollectorName(temp.collector_name);
            setCollectorPhone(temp.collector_phone);
            setCollectorAddress(temp.collector_address);
            setInsurance(temp.insurance);
            setMuseumId(temp.museum_id);
            setTransport(temp.transport);
            setDateOfDeparture(temp.date_of_departure);
            setDateOfArrival(temp.date_of_arrival);
            setCondition(temp.condition_report);
        }
    }, [])

    const flipLocation = (bool) => {
        showcase_active = bool;
        setExhibitionShowcase(bool);
        if (showcase_active) {
            document.getElementById('showcase').checked = true;
            document.getElementById('wall').checked = false;
        } else {
            document.getElementById('showcase').checked = false;
            document.getElementById('wall').checked = true;
        }
    }

    const uploadImage = () => {
        var oFReader = new FileReader();
        oFReader.readAsDataURL(document.getElementById("img-input").files[0]);

        oFReader.onload = function (oFREvent) {
            document.getElementById("uploaded-img").src = oFREvent.target.result;
            setImage(oFREvent.target.result);
        };
    };

    const close = () => {
        openOverlay(false);
        setChanges(false);
        setSaving(false);
        setDelete(false);
    }

    const saveDropdown = (type, name) => {
        if (type === 'collector') {
            setCollectorName(name);
        } else if (type === 'type') {
            setType(name);
        }
    }

    const checkItemChanges = () => {
        if (_.isEqual(buildObject(number, name, type, exhibitionLocation, exhibitionShowcase, caption, image, collectorName, collectorAddress,
            collectorPhone, insurance, museumId, transport, dateOfDeparture, dateofArrival, condition), JSON.parse(localStorage.getItem('active_object')))) {
            gotToScreen('main');
            // add line to check if object is in db
        } else {
            openOverlay(true);
            setChanges(true);
        }
    }

    const saveObj = () => {
        localStorage.setItem('active_object', JSON.stringify(buildObject(number, name, type, exhibitionLocation, exhibitionShowcase, caption, image, collectorName, collectorAddress,
            collectorPhone, insurance, museumId, transport, dateOfDeparture, dateofArrival, condition)));
        localStorage.setItem('object_isActive', true);
    }

    // ive clearly given up with the complexity of this code
    const checkForDropdown = (type) => {
        if (localStorage.getItem('object_isActive') === 'true') {
            if (type === 'collector') {
                if (JSON.parse(localStorage.getItem('active_object')).collector_name != undefined) {
                    return true;
                }
            } else if (type === 'type') {
                if (JSON.parse(localStorage.getItem('active_object')).object_type != undefined) {
                    return true;
                }
            }
        } else return false;
    }

    const saveObject = () => {
        saveNewItem(buildObject(parseInt(number), name, type, exhibitionLocation, exhibitionShowcase, caption, image, collectorName, collectorAddress,
            collectorPhone, insurance, museumId, transport, dateOfDeparture, dateofArrival, condition)).then(res => {
                setChangesSaved(true);
                setTimeout(() => {
                    close();
                }, 1000)
            })
        openOverlay(true);
        setSaving(true);
    }

    return (
        <div className='File'>

            <Overlay show={overlay} saving={saving} changes={changes} deleteItem={deleteItem} close={close} changesSaved={changesSaved} currentRef={number}/>

            <button className='back bold' onClick={() => {
                checkItemChanges();
            }}>
                <AiOutlineRollback className='icon' />
                Back
            </button>
            <button className='save bold' id="save-data" onClick={() => {
                saveObject();
            }}>
                <AiOutlineSave className='icon' />
            </button>
            <button className='print bold' onClick={() => {
                saveObj();
                gotToScreen('print');
            }}>
                <AiOutlinePrinter className='icon' />
            </button>

            <button className='delete bold' onClick={() => {
                openOverlay(true);
                setDelete(true);
            }}>
                <RiDeleteBin5Fill className='delete-icon' />
            </button>


            <div className='form'>
                <h1 className='title black'>Object File</h1>

                {/* Basic information */}
                <h2 className='subtitle black'>Basic information</h2>

                <div className='section-one'>
                    <form className='upload-outer'>
                        <img className='upload-img' id='uploaded-img' src='#' />
                        <input className='upload' type='file' id='img-input' accept="image/*" onChange={(e) => uploadImage()} />
                    </form>
                    <div className='section-one inner'>
                        <div className='input-outer'>
                            <label className='inputTitle medium'>Object Number</label>
                            <input className='number' type='number'
                                placeholder='Ex: 1'
                                value={number}
                                onChange={(val) => setNumber(val.target.value)} />
                        </div>

                        <div className='input-outer'>
                            <label className='inputTitle medium'>Object Name</label>
                            <input className='number' type='text' placeholder='Ex: Roka Blue'
                                value={name}
                                onChange={(val) => setName(val.target.value)} />
                        </div>

                        <div className='input-outer'>
                            <label className='inputTitle medium'>Object Type</label>
                            <Dropdown saveDropdown={saveDropdown} type={'type'} list={object_types.sort((a, b) => a.name.localeCompare(b.name))} multiple={true}
                                file={true} name={checkForDropdown('type') ? JSON.parse(localStorage.getItem('active_object')).object_type : 'Select Object type'} id="1" />
                        </div>

                        <div className='input-outer'>
                            <label className='inputTitle medium'>Exhibition Location</label>
                            <input className='number' type='text' placeholder='Ex: Greek Part'
                                value={exhibitionLocation}
                                onChange={(val) => setExhibitionLocation(val.target.value)} />
                            <div className='checkbox-row'>

                                <div className='checkbox-inner'>
                                    <input type='checkbox' id='showcase' onClick={() => flipLocation(true)} />
                                    <label>Showcase</label>
                                </div>
                                <div className='checkbox-row-sep' />
                                <div className='checkbox-inner'>
                                    <input type='checkbox' id='wall' onClick={() => flipLocation(false)} />
                                    <label>Wall</label>
                                </div>

                            </div>
                        </div>

                        <div className='input-outer'>
                            <label className='inputTitle medium'>Caption</label>
                            <textarea className='number'
                                value={caption}
                                onChange={(val) => setCaption(val.target.value)} />
                        </div>
                    </div>
                </div>

                {/* Collector information */}
                <h2 className='subtitle black'>Collector information</h2>

                <div className='section-two'>

                    <div className='input-outer'>
                        <label className='inputTitle medium'>Collector Name</label>
                        <Dropdown saveDropdown={saveDropdown} type={'collector'} list={collectors.sort((a, b) => a.name.localeCompare(b.name))} multiple={true}
                            file={true} name={checkForDropdown('collector') ? JSON.parse(localStorage.getItem('active_object')).collector_name : 'Select Collector name'} id="2" />
                    </div>

                    <div className='input-outer'>
                        <label className='inputTitle medium'>Collector Address</label>
                        <input className='number' type='text' placeholder='Ex: Vassilis Sofias 12'
                            value={collectorAddress}
                            onChange={(val) => setCollectorAddress(val.target.value)} />
                    </div>

                    <div className='input-outer'>
                        <label className='inputTitle medium'>Collector Phone</label>
                        <input className='number' type='text' placeholder='Ex: +30 696...'
                            value={collectorPhone}
                            onChange={(val) => setCollectorPhone(val.target.value)} />
                    </div>

                </div>

                {/* Insurance information */}
                <h2 className='subtitle black'>Insurance information</h2>

                <div className='section-two'>
                    <div className='input-outer'>
                        <label className='inputTitle medium'>Insurance</label>
                        <textarea className='number' type='text'
                            value={insurance}
                            onChange={(val) => setInsurance(val.target.value)} />
                    </div>
                </div>

                {/* Museum information */}
                <h2 className='subtitle black'>Museum information</h2>

                <div className='section-two'>

                    <div className='input-outer'>
                        <label className='inputTitle medium'>Museum ID</label>
                        <input className='number' type='text' placeholder='Ex: MB123'
                            value={museumId}
                            onChange={(val) => setMuseumId(val.target.value)} />
                    </div>

                    <div className='input-outer'>
                        <label className='inputTitle medium'>Transport</label>
                        <input className='number' type='text' placeholder=''
                            value={transport}
                            onChange={(val) => setTransport(val.target.value)} />
                    </div>

                    <div className='input-outer'>
                        <label className='inputTitle medium'>Date of departure</label>
                        <input className='number' type='date'
                            value={dateOfDeparture}
                            onChange={(val) => setDateOfDeparture(val.target.value)} />
                    </div>

                    <div className='input-outer'>
                        <label className='inputTitle medium'>Date of arrival</label>
                        <input className='number' type='date'
                            value={dateofArrival}
                            onChange={(val) => setDateOfArrival(val.target.value)} />
                    </div>

                    <div className='input-outer'>
                        <label className='inputTitle medium'>Condition report</label>
                        <textarea className='number' type='text'
                            value={condition}
                            onChange={(val) => setCondition(val.target.value)} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default File;

let collectors = [
    { name: "Daphne Stassinopoulos", checked: false, type: "collector" },
    { name: "Petros Vergos", checked: false, type: "collector" },
    { name: "Niki Eleftheriadi", checked: false, type: "collector" },
    { name: "Benaki Museum", checked: false, type: "collector" },
    { name: "National Historical Museum", checked: false, type: "collector" },
    { name: "Dionysis Fotopoulos", checked: false, type: "collector" },
    { name: "Flavia Nessi", checked: false, type: "collector" },
    { name: "Ludmila Hrinchenko", checked: false, type: "collector" },
    { name: "Eleni Martinou", checked: false, type: "collector" },
    { name: "Elli Kavvada", checked: false, type: "collector" },
    { name: "Katerina Korre-Zografou", checked: false, type: "collector" },
    { name: "Folklore Museum of Didymoteicho", checked: false, type: "collector" },
    { name: "Hatzimichali Museum of Folk Art and Tradition", checked: false, type: "collector" },
    { name: "Academy of Athens", checked: false, type: "collector" },
    { name: "Aristotle University of Thessaloniki", checked: false, type: "collector" },
    { name: "Vlach Folklore Museum", checked: false, type: "collector" },
    { name: "Sarakatsani Folklore Museum", checked: false, type: "collector" },
    { name: "Rethymno Folklore Museum", checked: false, type: "collector" },
    { name: "MUCEM", checked: false, type: "collector" },
    { name: "Victoria G.Karelias Collection", checked: false, type: "collector" },
    { name: "Kitsos Makris Folklore Museum", checked: false, type: "collector" },
    { name: "Anastasios Papaligouras", checked: false, type: "collector" },
    { name: "Lefkada Museum", checked: false, type: "collector" },
    { name: "Corfu Museum", checked: false, type: "collector" },
    { name: "Tina Vassilakopoulou", checked: false, type: "collector" },
    { name: "Geneva Ethnography Museum", checked: false, type: "collector" },
    { name: "Museum of Greek Folk Art", checked: false, type: "collector" },
    { name: "Hellenic Parliament Athens", checked: false, type: "collector" },
    { name: "Museum of modern greek Culture", checked: false, type: "collector" }
]
let object_types = [
    { name: "Distaff", checked: false, type: "object" },
    { name: "Spindle", checked: false, type: "object" },
    { name: "Whorl", checked: false, type: "object" },
    { name: "Multipurpose Tool", checked: false, type: "object" },
    { name: "Knitting Sheath", checked: false, type: "object" },
    { name: "Knitting Needle", checked: false, type: "object" },
    { name: "Extension Sheath Silver", checked: false, type: "object" },
    { name: "Weawing Shuttle", checked: false, type: "object" },
    { name: "Comb", checked: false, type: "object" },
    { name: "Rigid Hedle", checked: false, type: "object" },
    { name: "Needle Case", checked: false, type: "object" },
    { name: "Crochet", checked: false, type: "object" },
    { name: "Letter Opener", checked: false, type: "object" },
    { name: "Socks", checked: false, type: "object" },
    { name: "Legging", checked: false, type: "object" },
    { name: "Garter", checked: false, type: "object" },
    { name: "Socks Strecher", checked: false, type: "object" },
    { name: "Textile Objects", checked: false, type: "object" },
    { name: "Art Works", checked: false, type: "object" },
    { name: "Extra", checked: false, type: "object" },
    { name: "Materials", checked: false, type: "object" }
]
