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
      <Navbar showAlert={showAlert} />
      <Routes>
        <Route path="/" element={localStorage.getItem("token") ? (<div style={{ backgroundColor: "#F9FAFB", minHeight: "100vh" }}><Alert alert={alert} /><div className="container"><Home showAlert={showAlert} /> </div></div>) : (<Navigate to="/login" replace />)}/>
        <Route path="/about" element={<><About /></>}/>
        <Route path="/login" element={<div style={{ backgroundColor: "#F9FAFB", minHeight: "100vh" }}><Alert alert={alert} /><div className="container"><Login showAlert={showAlert} /></div></div>}/>
          </Routes>
      {!localStorage.getItem("token") && <Footer />}
    </Router>
  </NoteStates>
  );
}

export default App;