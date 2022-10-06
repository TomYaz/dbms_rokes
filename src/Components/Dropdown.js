import React, { useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import './CSS/Dropdown.css';

export let filters = [];

function Dropdown(props) {
    const [dropdownOpen, openDropdown] = useState(false);
    const [rerender, setRerender] = useState(false);
    const [dropdownName, setDropdownName] = useState(props.name);

    const [list, setList] = useState(props.list);
    let data = [];

    useEffect(() => {
        if (props.file) {
            document.getElementById("dropdown" + props.id).style.width = "30vw";
            document.getElementById("dropdown" + props.id).style.height = "43px";
        }
    }, [])

    if (props.multiple) {
        list.forEach(obj => {
            data.push(
                <li key={obj.name} onClick={() => {
                    setRerender(!rerender);
                    updateTitle(true, obj.name);
                    let temp = list[list.findIndex(el => el.name === obj.name)].checked;
                    list[list.findIndex(el => el.name === obj.name)].checked = !temp;
                    props.saveDropdown(props.type, obj.name);
                    openDropdown(!dropdownOpen);
                }}>
                    <label>{obj.name}</label>
                </li>
            )
        })
    }
    else {
        list.forEach(obj => {
            data.push(
                <li key={obj.name} onClick={() => {
                    let temp = list[list.findIndex(el => el.name === obj.name)].checked;
                    list[list.findIndex(el => el.name === obj.name)].checked = !temp;
                    document.getElementById(obj.name).checked = !temp;

                    updateTitle(false); // update title without name
                    if (!temp === true) { // add item to list
                        props.setFilters([...props.filters, obj]);
                    } else { // remove item from list
                        props.setFilters(props.filters.splice(props.filters.findIndex(el => el.name === obj.name), 1));
                        if (props.filters.length === 0) props.setFilters([]) // for some weird reason it won't update the last item unless i force it 
                    }
                    setRerender(!rerender); // force re-render
                }}>
                    {obj.checked &&
                        <input type="checkbox" id={obj.name} defaultChecked />
                    }
                    {!obj.checked &&
                        <input type="checkbox" id={obj.name} />
                    }
                    <label>{obj.name}</label>
                </li>
            )
        })
    }

    const updateTitle = (withName, name) => {
        if (withName) {
            setDropdownName(name);
        } else {
            let curr_check_length = list.filter(el => el.checked === true).length;
            if (curr_check_length > 0) {
                setDropdownName(curr_check_length + " items selected")
            } else {
                setDropdownName(props.name)
            }
        }

    }


    return (
        <div className="Dropdown-container">


            <div className="Dropdown" onClick={() => openDropdown(!dropdownOpen)} id={"dropdown" + props.id}>
                <h1>{dropdownName}</h1>
                <FaChevronDown className="icon" />
            </div>
            {dropdownOpen &&
                <div className="list-external" id="list">
                    <div className="list">
                        {data}
                    </div>
                </div>
            }
        </div>
    )
}

export default Dropdown;

export function clearFilters() {
    filters = [];
}