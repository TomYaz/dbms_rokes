import React from 'react';
import logo from '../Ressources/Images/icon.png';
import { BsPlusSquareFill, BsArchiveFill, BsCheck } from 'react-icons/bs';
import { IoMdArrowBack } from 'react-icons/io';
import { BiImageAdd } from 'react-icons/bi';
import '../App.css';
import './CSS/ProjectSelection.css';
import TitleBar from '../Components/TitleBar';


class ProjectSelection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            projectsMain: true,
            loader: false,
            wait: true,

            projects: [
                {
                    name: 'Pet Project Intiative',
                    createdBy: 'Thomas Y.',
                    logo: require('../Ressources/Images/logo.png')
                },
                {
                    name: 'Personal Website',
                    createdBy: 'Thomas Y.',
                    logo: require('../Ressources/Images/coffee.png')
                },
                {
                    name: '6CCS3AIP Coursework',
                    createdBy: 'Thomas Y.',
                    logo: require('../Ressources/Images/kings.png')
                }
            ]
        };
    }

    componentDidMount() {
        if (localStorage.getItem('returnFromDashboard')) {
            localStorage.setItem('returnFromDashboard', false);
            window.resizeWindowSmaller();
        }
        setTimeout(() => {
            this.setState({ wait: false })
        }, 200)
        document.title = "Strip | Your projects";
    }

    openProject(name, logo) {
        window.resizeWindow();
        this.setState({ loader: true });
        setTimeout(() => {
            document.location.pathname = '/dashboard';
        }, 1500)
        localStorage.setItem('currentProject', name)
        localStorage.setItem('currentProjectImage', logo)
    }

    createNewProject() {
        this.setState({ projectsMain: false })
        document.title = "Strip | Create new project";
    }

    closeCreateNewProject() {
        this.setState({ projectsMain: true })
        document.title = "Strip | Your projects";
    }

    newProjectSubmit() {
        this.setState({ projectsMain: true })
        document.title = "Strip | Your projects";
    }

    render() {

        var projects = []

        this.state.projects.forEach(project => {
            projects.push(
                <div className="ProjectSelection-option" onClick={() => { this.openProject(project.name, project.logo) }}>
                    <img src={project.logo} className="ProjectSelection-optionLogo" />
                    <div className="ProjectSelection-optionRight">
                        <span className="ProjectSelection-optionTitle">{project.name}</span>
                        <span className="ProjectSelection-optionText">Created by : {project.createdBy}</span>
                    </div>
                </div>
            )
        })
        if (this.state.loader) {
            return (
                <div className="mainLoader">
                    <TitleBar />
                    <img src={logo} className="logoLoader" />
                </div>
            )
        }
        else if (this.state.projectsMain) {
            return (
                <div className="ProjectSelection-main">
                    <TitleBar />
                    <img src={logo} className="ProjectSelection-logo" />

                    <span className="ProjectSelection-title">Active Projects</span>
                    <div className="ProjectSelection-form">

                        {projects}

                    </div>

                    <div className="ProjectSelection-add" onClick={() => { this.createNewProject() }}>
                        <BsPlusSquareFill className="ProjectSelection-addIcon" />
                        <span className="ProjectSelection-addText">New Project</span>
                    </div>

                    <div className="ProjectSelection-archive">
                        <BsArchiveFill className="ProjectSelection-archiveIcon" />
                        <span className="ProjectSelection-archiveText">Archived Projects</span>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="ProjectSelection-newMain">
                    <TitleBar />
                    <IoMdArrowBack className="ProjectSelection-close" onClick={() => { this.closeCreateNewProject() }} />
                    <div className="ProjectSelection-newDiv">
                        <span className="ProjectSelection-newTitle">Create a new project</span>

                        <div className="ProjectSelection-newMainDiv">
                            <div className="ProjectSelection-newMainDivLeft">
                                <BiImageAdd className="ProjectSelection-newMainDivLeftIcon" />
                                <span className="ProjectSelection-newMainDivLeftText">Upload logo (optional)</span>
                            </div>

                            <div className="ProjectSelection-newMainDivRight">
                                <span className="ProjectSelection-newMainDivRightText">Project Name</span>
                                <input className="ProjectSelection-input"
                                    placeholder="Project Name"
                                />

                                <span className="ProjectSelection-newMainDivRightText">Project Description</span>
                                <textarea className="ProjectSelection-inputText"
                                    placeholder="Description"
                                />
                            </div>
                        </div>

                        <BsCheck className="ProjectSelection-newSubmit" onClick={() => { this.newProjectSubmit() }} />
                    </div>
                </div>
            )
        }
    }
}

export default ProjectSelection;
