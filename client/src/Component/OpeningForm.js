import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card';
import TextField from '@mui/material/TextField';


export default function OpeningForm() {

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
    const [pref,setPref] = useState([])
    const [courseData, setCourseData] = useState([])
    const [prefArr, setPrefArr] = useState([])
    const [memList, setMemList] = useState([]);

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
        const userDetails = {
            name : nameRef.current.value,
            department : deptRef.current.value,
            roll: rollRef.current.value,
            email: emailRef.current.value,
        
        }
        axios.post('http://localhost:4000/send-email',userDetails).then((response)=>{
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
    <div className='opening-form'>
    <h1>TA Preference Registration Portal</h1>
    {/* <div>

    <Accordion defaultActiveKey="0">
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
      </Accordion>
    </div> */}

    <Form onSubmit={handleSubmit}>
          
            <Form.Group id="name" className="mb-3">
            Name *
              <Form.Control  className='resp-signup-input' placeholder="Your Name Here" id="" size="small" ref={nameRef} sx={{paddingLeft:'10px', paddingTop:'-10px', height:'10px'}} required />
            </Form.Group>
            <Form.Group id="rollno" className="mb-3">
              Roll Number * 
              <Form.Control className='resp-signup-input' placeholder="Your Roll Number Here" id="" size="small" ref={rollRef} sx={{paddingLeft:'10px', paddingTop:'-10px', width:'50%'}} required />
            </Form.Group>
            <Form.Group id="email" className="mb-3">
              Enter your email address * 
              <Form.Control className='resp-signup-input' placeholder="Your email Here" id="" size="small" ref={emailRef} sx={{paddingLeft:'10px', paddingTop:'-10px', width:'50%'}} required />
            </Form.Group>
            <Form.Group id="department" className="signup-input resp-signup-input">
              Your Department *
              <Form.Control className='resp-signup-input' placeholder="Your Department Here" id="" size="small" ref={deptRef} sx={{paddingLeft:'10px', paddingTop:'-10px', width:'50%'}} required />
            </Form.Group>


            <br/>
            {/* {
                courseData.map((e,index)=>{
            return (<>
                <Card>
                    <Card.Body>{e.courseCode}</Card.Body>
                    <Form.Control as="select" onChange={(v) => updateArray(v.target.value,e)} aria-label="Default select example">
                        <option>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Control>
                </Card>
            </>)
        })
            
            } */}
            
            

            <br/><div className='text-center'><Button disabled={loading} className="w-100 button-5" type="submit" >
              Submit
            </Button></div>
          
          </Form>
    </div>
  )
}
