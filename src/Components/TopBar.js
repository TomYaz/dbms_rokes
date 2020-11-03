import React from 'react';
import logo from '../Ressources/Images/logoName.png';
import user from '../Ressources/Images/user.png';
import './TopBar.css';

class TopBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            user: 'Thomas'
        };
    }

    componentDidMount() {
        this.transformTitle()
    }

    transformTitle() {
        var name = window.location.pathname;
        var first = name.substr(1, 1).toUpperCase();
        this.setState({ title: first + name.substr(2, name.length - 2) });
    }

    render() {
        return (
            <div className="TopBar-main">
                <span className="TopBar-title">{this.state.title}</span>
                <div className="TopBar-right">
                    <span className="TopBar-userText">Hi, {this.state.user}</span>
                    <img src={user} className="TopBar-user" />
                </div>
            </div>
        )
    }
}

export default TopBar;
