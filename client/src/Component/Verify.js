import React, {useEffect, useState} from 'react'
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios'
// import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

export default function Verify() {

  let user  = useParams();
  const [res, setRes] = useState('');

  var datas;

    useEffect(() => {
        axios.get(`http://localhost:4000/verify/${user.id}/${user.token}`).then((response) => {
            console.log(response.data)
            setRes(response.data)
        }).catch((e) => {
            console.log(e)
        })
    },[])

    function sendForm(){
      if(res==="email verified sucessfully")
      Navigate('/')
      
    }

  return (
    <div className='verify'> Your Token is<br/>  <h3 style={{color:''}}>{user.id}</h3> <br/> {res==="email verified sucessfully"?<>
    <Alert variant='filled' sx={{mb:3}} severity="success">You are successfully <b>Verified</b></Alert>
    <Link style={{textDecoration:"none", width:'400px'}} className='button-13' to={`/fill-preferences/${user.id}`}>Continue to fill form</Link>
    </>:<>no</>} 
    
    
    </div>
  )
}
