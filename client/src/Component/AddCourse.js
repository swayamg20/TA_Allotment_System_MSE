import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function AddCourse() {

  const [error,setError] = useState("")
  const [message,setMessage] = useState("")
  // const [open, setOpen] = useState(true)
  const [openMessage, setOpenMessage] = useState(true)
  const [selectedValue, setSelectedValue] = React.useState('a');
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });
    // const navigate = useNavigate()
    const [loading,setLoading] = useState()
    // const {currentUser} = useAuth()
    const courseNameRef = useRef()
    const courseCodeRef = useRef()
    const preReqRef = useRef()
    const detailRef = useRef()
    const taRef = useRef()
    const isLabRef = useRef()

    const [open, setOpen] = React.useState(true);
    // const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleCloseMessage = ()=> setOpenMessage(false)

    async function handleSubmit(e){
        setLoading(true)
        e.preventDefault()
        // var prfArray = []
     
        const userDetails = {
            courseName : courseNameRef.current.value,
            courseCode : courseCodeRef.current.value,
            ta: taRef.current.value,
            isLab : isLabRef.current.value,
            details: detailRef.current.value,
            preReq: preReqRef.current.value
        }
        axios.post('http://localhost:4000/course-added',userDetails).then((response)=>{
            console.log(response.data)
            setLoading(false)
            setMessage("Details Updated Successfully.")
            //alert("Details Updated Successfully.")
            window.location.reload()
            // navigate("/dashboard")

        }).catch((error)=>{
            console.log(error)
            setLoading(false)
            setError("Failed to register details. Please check your internet connectivity.")
        })
        // console.log(userDetails)
    }

  return (
    <div className='opening-form'>
    <div><h1>Add Courses</h1></div>

    <Form onSubmit={handleSubmit}>
          
            <Form.Group id="course Name" className="mb-3">
              Course Name &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <Form.Control className='resp-signup-input' placeholder="Your Name Here" id="" size="small" ref={courseNameRef} sx={{paddingLeft:'10px', paddingTop:'-10px', width:'50%'}} required />
            </Form.Group>
            <Form.Group id="course code" className="mb-3">
              Course Code &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <Form.Control className='resp-signup-input' placeholder="Your Roll Number Here" id="" size="small" ref={courseCodeRef} sx={{paddingLeft:'10px', paddingTop:'-10px', width:'50%'}} required />
            </Form.Group>
            <Form.Group id="name" className="mb-3">
              Pre requirements &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <Form.Control className='resp-signup-input' placeholder="Your Name Here" id="" size="small" ref={preReqRef} sx={{paddingLeft:'10px', paddingTop:'-10px', width:'50%'}} required />
            </Form.Group>
            <Form.Group id="name" className="mb-3">
              Summary &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <Form.Control className='resp-signup-input' placeholder="Your Name Here" id="" size="small" ref={detailRef} sx={{paddingLeft:'10px', paddingTop:'-10px', width:'50%'}} required />
            </Form.Group>
            <Form.Group id="department" className="signup-input resp-signup-input">
              Number of TAs required &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <Form.Control className='resp-signup-input' placeholder="Your Department Here" id="" size="small" ref={taRef} sx={{paddingLeft:'10px', paddingTop:'-10px', width:'50%'}} required />
            </Form.Group>
            <Form.Group className="mb-3" ref={isLabRef} controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Is this a Lab course?" />
      </Form.Group>
        
            

            <br/><div className='text-center'><Button disabled={loading} className="w-100 button-5" type="submit" >
              Submit
            </Button></div>
          
          </Form>
    </div>
  )
}
