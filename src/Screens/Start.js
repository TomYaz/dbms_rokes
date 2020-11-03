import React from 'react';
import logo from '../Ressources/Images/logoNameColor.png';
import { authentication } from '../Firebase/FirebaseLoader';
import './CSS/Start.css';
import { Redirect } from 'react-router-dom';

class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth,

            email: '',
            password: ''
        };
    }

    componentDidMount() {
        document.title = "Strip";
    }

    redirectSignup() {
        // window.open("//thomasyaz.com", "_blank")
        // document.location.pathname = '/'
    }

    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.submit()
        }
    }

    async submit() {
        authentication.signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(function (result) {
                alert('success')
                document.location.pathname = "/socialmedia"
            }).catch(function (error) {
                alert('Incorrect email and/or password.')
            });
    }

    render() {
        return (
            <div class="main">
                <img src={logo} class="logo" />

                <span class="title">Email</span>

                <input class="input"
                    placeholder="Enter your email"
                    value={this.state.email}
                    onKeyDown={this._handleKeyDown}
                    onChange={(text) => { this.setState({ email: text.target.value }) }} />

                <span class=" title">Password</span>

                <input class="input"
                    type="password"
                    placeholder="Enter your password"
                    value={this.state.password}
                    onKeyDown={this._handleKeyDown}
                    onChange={(text) => { this.setState({ password: text.target.value }) }} />

                <span class="button" onClick={() => this.submit()}>Submit</span>

                <span class="signup">Don't have an account ?<span onClick={() => this.redirectSignup()} class="signup2">Signup</span></span>

                <span class="copyright">Copyrights © Strip 2020</span>
            </div>
        );
    }
}

export default Start;
