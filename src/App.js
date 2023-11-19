import './App.css';
import Home from './Components/Home';
import Navbar from './Components/Navbar';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import Signup from './Components/Signup';
import FirstCustomer from './Components/FirstCustomer';

import { useState } from 'react';

function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      mssg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1800);
  };

  return (
    <>
      <NoteState showAlert={showAlert}>
        <Router>

          <Navbar />
          <Alert alert={alert} />

          <div className="container my-4">
            <Routes>
              <Route exact path="/" element={<FirstCustomer showAlert={showAlert}/>} />
              <Route exact path="/about" element={<Home/>} />
              <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
            </Routes>
          </div>

        </Router>
      </NoteState>
    </>
  );
}

export default App;