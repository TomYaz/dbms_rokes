import React from 'react';
import LeftBar from '../Components/LeftBar';
import TitleBar from '../Components/TitleBar';
import TopBar from '../Components/TopBar';
import logo from '../Ressources/Images/logo.png';
import './CSS/Dashboard.css';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        if (!localStorage.getItem('currentProject')) { // if no current project selected
            document.location.pathname = "/projectselection"
        }
        else {
            document.title = "Dashboard | " + localStorage.getItem('currentProject');
        }
    }





    render() {
        return (
            <div className="Dashboard">

                <TitleBar />

                <div className="Dashboard-titleBar" />
                <div className="Dashboard-main">

                    <div className="Dashboard-leftBar">
                        <LeftBar />
                    </div>
                    <TopBar />

                    <div className="Dashboard-firstDiv">

                        <div className="Dashboard-firstDivLeft">

                            <div className="Dashboard-firstDivSmallForm">
                                <img src={localStorage.getItem('currentProjectImage')} className="Dashboard-projectLogo" />
                                <div className="Dashboard-firstDivSmallFormRight">
                                    <span className="Dashboard-firstDivSmallFormRightText">{localStorage.getItem('currentProject')}</span>
                                    <span className="Dashboard-firstDivSmallFormRightSmallText">by Thomas Y.</span>
                                </div>
                            </div>

                            <div className="Dashboard-firstDivSmallForm">
                            </div>

                        </div>

                        <div className="Dashboard-firstDivForm">
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

export default Dashboard;
