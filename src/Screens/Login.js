import React, { useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { gotToScreen } from '../HelperFunctions';
import './CSS/Login.css';
import { auth } from '../Firebase/FirebaseLoader';

function Login() {

    const [password, setPassword] = useState('');

    const submit = () => {
        signInWithEmailAndPassword(auth, 'rokes@mail.com', password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                gotToScreen('main');
                // ...
            })
            .catch((error) => {
                alert('Incorrect password')
            });
    }

    useEffect(() => {
        window.addEventListener("keydown", (event) => {
            if (event.isComposing || event.code === 'Enter') {
                document.getElementById("submit_login").click();
            }
        })
    }, []);


    return (
        <div className="Login">
            <div className="outerForm">
                <h1 className='login-title'>Rokes</h1>
                <h2>Password</h2>
                <input
                    placeholder='••••••••'
                    type='password'
                    value={password}
                    onChange={(val) => {
                        setPassword(val.target.value)
                    }}
                />

                <button className="submit" id="submit_login" onClick={() => submit()}>Submit</button>
            </div>
        </div>
    )
}

export default Login;
