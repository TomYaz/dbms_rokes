import React, { useEffect } from 'react';
import Dropdown from '../Components/Dropdown';
import './CSS/LeftMenu.css';

import { BsSearch } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { VscNewFile } from 'react-icons/vsc';
import { gotToScreen } from '../HelperFunctions';

function LeftMenu(props) {

    const searchItem = () => {

    }

    return (
        <div className="Menu">
            <h1 className="title black">Rokes</h1>

            <h2 className="subtitle black">Filter options</h2>

            <label className="dropdownTitle bold">Object Number</label>

            {/* Object Number */}
            <input className="search regular"
                id="object_number"
                type="number"
                onChange={(val) => {
                    if (props.filters.find(el => el.type == "object_number") != undefined) { // if filters already contains object_number
                        console.log('item found')
                        console.log(props.filters.find(el => el.type == "object_number"))
                        props.setFilters(props.filters.splice(props.filters.findIndex(el => el.type == "object_number"), 1)); // remove element
                        if (val.target.value != null) {
                            console.log()
                            props.setFilters([...props.filters, { type: "object_number", value: val.target.value }]); // add element again and FUCK STATES
                        }
                        console.log(props.filters);
                    } else {
                        props.setFilters([...props.filters, { type: "object_number", value: val.target.value }]); // add new item to array
                        console.log(props.filters);
                    }
                    document.getElementById('object_number').value = val.target.value;
                }}
                placeholder='ex: 1' />

            {/* Collectors */}
            <label className="dropdownTitle bold">Collectors</label>
            <Dropdown setFilters={props.setFilters} name="Select collectors" list={collectors.sort((a, b) => a.name.localeCompare(b.name))} filters={props.filters} />

            {/* Object Type */}
            <label className="dropdownTitle bold">Object type</label>
            <Dropdown setFilters={props.setFilters} name="Select Object type" list={object_types.sort((a, b) => a.name.localeCompare(b.name))} filters={props.filters} />

            <div className="buttons-left">

                {/* Button - Search with filters */}
                <button className="searchB" onClick={() => {

                }}>
                    <BsSearch className="icon" />
                    Search
                </button>

                {/* Button - Clear filters  */}
                <button className="clearB" onClick={() => {
                    props.setFilters([]);
                    document.getElementById('object_number').value = null;
                    window.reload(); // because FUCK IT force the window to reload
                }}>
                    <AiOutlineClose className="icon" />
                    Clear
                </button>
            </div>

            {/* Button - Add new object  */}
            <button className="newItem black" onClick={() => {
                localStorage.setItem('object_isActive', false);
                localStorage.setItem('active_object', '{}');
                gotToScreen('file');
            }
            }>
                <VscNewFile className="icon" />
                Add object
            </button>

        </div >

    )
}

export default LeftMenu;

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