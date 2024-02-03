import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom';
import { TextField, Typography } from '@mui/material';

export default function FillPref() {

    const [error,setError] = useState("")
    const [message,setMessage] = useState("")
    const [loading,setLoading] = useState()
    const nameRef = useRef()
    const emailRef = useRef()
    const rollRef = useRef()
    const deptRef = useRef()
    const pref1Ref = useRef()
    const pref2Ref = useRef()
    const pref3Ref = useRef()
    const semRef = useRef()
    const [pref,setPref] = useState([])
    const [courseData, setCourseData] = useState([])
    const [prefArr, setPrefArr] = useState([])
    const [memList, setMemList] = useState([]);

    let user = useParams();

    useEffect(() => {
        axios.get("http://localhost:4000/all-course-detail").then((response) => {
            console.log(response.data)
            setCourseData(response.data)
        }).catch((e) => {
            console.log(e)
        })
    },[])

    var arr =[];
    async function updateArray(val,e) {
        console.log(val)
        arr[val-1] = e.courseCode;
        
    }

    async function handleSubmit(e){
        setLoading(true)
        e.preventDefault()
        console.log(arr)
        const userDetails = {
            preferences: arr,
            semester: semRef.current.value
        }
        axios.post(`http://localhost:4000/preference-submit/${user.id}`,userDetails).then((response)=>{
            console.log(response.data)
            setLoading(false)
            setMessage("Details Updated Successfully.")
            window.location.reload()

        }).catch((error)=>{
            console.log(error)
            setLoading(false)
            setError("Failed to register details. Please check your internet connectivity.")
        })
    }
    

    
  return (
    <div className='fill-pref'>
    <div><h1>FillPref</h1></div>
    <div>

    {/* <Accordion defaultActiveKey="0">
    {
        courseData.map((e,index)=>{
            return (<>
                <Accordion.Item eventKey={index}>
        <Accordion.Header>{e.courseCode}</Accordion.Header>
        <Accordion.Body>
          {e.detail}
        </Accordion.Body>
      </Accordion.Item>
            </>)
        })
    }
      </Accordion> */}
    </div>

    <Form onSubmit={handleSubmit}>
          
            {/* <Form.Group id="name" className="mb-3">
              Name* &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <Form.Control className='resp-signup-input' placeholder="Your Name Here" id="" size="small" ref={nameRef} sx={{paddingLeft:'10px', paddingTop:'-10px', width:'50%'}} required />
            </Form.Group>
            <Form.Group id="rollno" className="mb-3">
              Roll Number* &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <Form.Control className='resp-signup-input' placeholder="Your Roll Number Here" id="" size="small" ref={rollRef} sx={{paddingLeft:'10px', paddingTop:'-10px', width:'50%'}} required />
            </Form.Group>
            <Form.Group id="email" className="mb-3">
              Enter your email address* &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <Form.Control className='resp-signup-input' placeholder="Your email Here" id="" size="small" ref={emailRef} sx={{paddingLeft:'10px', paddingTop:'-10px', width:'50%'}} required />
            </Form.Group>
            <Form.Group id="department" className="signup-input resp-signup-input">
              Your Department* &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <Form.Control className='resp-signup-input' placeholder="Your Department Here" id="" size="small" ref={deptRef} sx={{paddingLeft:'10px', paddingTop:'-10px', width:'50%'}} required />
            </Form.Group> */}

            <Form.Group id="semester" className="signup-input resp-signup-input">
              Your Current Semester* &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <Form.Control type='number' className='resp-signup-input' placeholder="Ex- 8" id="" size="small" ref={semRef} style={{paddingLeft:'10px', paddingTop:'-10px', width:'10%'}} required />
            </Form.Group>
            <br/>
        
            {
                courseData.map((e,index)=>{
            return (<>
                <div>
                <div style={{display:'flex'}}>
                  <div style={{flex:'75%'}}>
                  <Typography variant='h4'>{e.courseCode}</Typography>
                  </div>
                  <div style={{flex:'25%'}}>
                  <Form.Control as="select" onChange={(v) => updateArray(v.target.value,e)} aria-label="Default select example">
                        <option>Open this select menu</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </Form.Control>
                  </div>
                </div>  
                </div>
            </>)
        })
            
            }
            
            

            <br/><div className='text-center'>
            <Button disabled={loading} className="w-100 button-5" type="submit" >
              Submit
            </Button></div>
          
          </Form>
    </div>
  )
}
