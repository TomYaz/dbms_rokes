import React from 'react';
import { Redirect } from 'react-router-dom';
import { authentication } from './Firebase/FirebaseLoader';
import logo from './Ressources/Images/icon.png';
import './App.css';

function App() {
  setTimeout(() => {
    if (authentication.currentUser) {
      document.location.pathname = '/projectselection' // to change
    } else
      return (
        document.location.pathname = '/start'
      )

  }, 3000)

  return (
    <div className="mainLoader">
      <img src={logo} className="logoLoader" />
    </div>
  )
}

export default App;
