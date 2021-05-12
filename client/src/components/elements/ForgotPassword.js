import {useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'


export default function ForgotPassword() {
    const [email,setEmail] = useState('')
    const [error,setError] = useState('')
    const [success,setSuccess] = useState('')
 

  
    const submit = async e => {
        e.preventDefault();
        if(email===''){
            setTimeout(()=>{
                setError('')
            },3000)
             setError("Please enter Email")
        }else{
            const config = {
                headers : {
                    "Content-Type" : "application/json"
                }
            }
            try {
                const {data} = await axios.post("/api/forgotpassword",{email},config)
                setSuccess(data.data)
                console.log(data.data);
              
            } catch (error) {
                setError(error.response.data)
               
                setTimeout(()=>{
                    setError('')
                },3000)
            }
        }
    
        
    }

    
 
    return (
        <div className="container1" style={{width:"350px",border:'1px solid grey',padding:'10px',height:'300px',marginTop:'100px'}} >
            <h2 style={{marginBottom:"26px"}}>Forgot Password</h2> 
            {error && <div  className="error ">{error}  </div> }
            {success && <div  className="success ">{success}  </div> }
            <form className='form-data' onSubmit={submit}>
            <h5 className='message'>Enter your email address and we will send you the link to reset your password.</h5>
            
            <div>
                <input type="email" placeholder="Enter Email" value={email} onChange={e=>setEmail(e.target.value)} /><br/><br/>
            </div>
            <input type="submit" value='Submit' className="btn btn-primary"/>
            </form>
            <p></p> <Link to='/login' className='f1'>Back to Login</Link> 
        </div>
    )
}

