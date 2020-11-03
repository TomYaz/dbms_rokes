import React from 'react';
import logo from '../Ressources/Images/logoName.png';
import { IoMdExit } from 'react-icons/io';
import { BiTask } from 'react-icons/bi';
import { MdTimeline, MdSettings } from 'react-icons/md';
import { FaHome } from 'react-icons/fa';
import './LeftBar.css';

class LeftBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [
                {
                    name: 'Dashboard',
                    icon: <FaHome className="LeftBar-optionIcon" />
                }, {
                    name: 'Tasks',
                    icon: <BiTask className="LeftBar-optionIcon" />
                },
                {
                    name: 'Timeline',
                    icon: <MdTimeline className="LeftBar-optionIcon" />
                },
                {
                    name: 'Settings',
                    icon: <MdSettings className="LeftBar-optionIcon" />
                },


            ]
        };
    }


    componentDidMount() {
    }

    changeProject() {
        localStorage.setItem('returnFromDashboard', true);
        window.location.pathname = "/projectselection";
    }

    render() {

        var options = [];

        this.state.options.forEach(option => {
            var isActive = false;
            if (window.location.pathname.substr(1, option.name.length) == option.name.toLowerCase()) {
                isActive = true;
            }
            options.push(
                <div className={isActive ? "LeftBar-optionActive" : "LeftBar-option"} >
                    {option.icon}
                    <span className="LeftBar-optionText">{option.name}</span>
                </div>
            )
        })
        return (
            <div className="LeftBar-main">
                <img src={logo} className="LeftBar-logo" id="LeftBar-logo" />

                {options}

                <div className="LeftBar-changeProject" onClick={() => { this.changeProject() }}>
                    <IoMdExit className="LeftBar-changeProjectIcon" />
                    <span className="LeftBar-changeProjectText">All Projects</span>
                </div>
            </div>
        )
    }
}

export default LeftBar;
