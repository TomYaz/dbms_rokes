import React from 'react';
import logo from './Ressources/Images/logodb.png';
import './App.css';
import { gotToScreen } from './HelperFunctions';
import Loader from './Components/Loader';

function App() {

  setTimeout(() => {
    gotToScreen('login');
    localStorage.setItem('object_isActive', false);
  }, 2000)

  return (
    <div className="mainLoader">
      <Loader />
      <h1 className='regular'><span className='black'>Rokes</span> database</h1>
    </div>
  )
}

export default App;
