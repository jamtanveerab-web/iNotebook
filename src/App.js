import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteStates from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import { useState } from 'react';
import Footer from './components/Footer';

function App() {
  const [alert , setAlert] = useState(null);
    
    const showAlert = (message,type) => {
        setAlert({
            msg : message ,
            type : type
        })
        setTimeout(() => {
            setAlert(null);
        }, 2000);
    }
  return (
    <NoteStates>
      <Router>
        <div style={{backgroundColor:"#F9FAFB"}}>
        <Navbar showAlert={showAlert}/>
        <Alert alert={alert} />
        <div className="container" >
        <Routes>
          <Route path="/" element={localStorage.getItem("token") ? <Home showAlert={showAlert} />: <Navigate to="/login" replace />}/>
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login showAlert={showAlert}/>} />
        </Routes>
      </div>
      </div>
      <Footer/>
      </Router>
    </NoteStates>
  );
}

export default App;