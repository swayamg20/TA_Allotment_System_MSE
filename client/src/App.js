import React from 'react'
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import FillPref from './Component/FillPref';
// import Userlayout from './Userlayout/Userlayout'
import 'bootstrap/dist/css/bootstrap.min.css';
import AddCourse from './Component/AddCourse';
import Verify from './Component/Verify';
import OpeningForm from './Component/OpeningForm';
import './App.css'
function App(){ 
  return (
    
      <>
        <div className="w-100" style={{maxWidth : '100%'}}>
          <Router>
         
            <Routes>
            <Route  path="/" element={<OpeningForm />} />
              {/* <Route exact path="dashboard" element={<EmailPrivateRoute><Dashboard /></EmailPrivateRoute>}/> */}
              <Route  path="/add-course" element={<AddCourse />}/>
              <Route  path="/verify/:id/:token" element={<Verify />}/>
              <Route  path="/fill-preferences/:id" element={<FillPref />}/>
              
              

            </Routes>

          
          </Router>
        </div>
      </>
    

  );
}

export default App;