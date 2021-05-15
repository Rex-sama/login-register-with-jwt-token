import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

export default function Register({history}) {
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [error,setError] = useState('')
    const [loader, setLoader] = useState(false)

    useEffect(()=>{
        if(localStorage.getItem("authToken")){
            history.push("/")
        }
        return ()=>{
            setError('')
        }
    },[history])

    const submit = async e => {
        e.preventDefault();
        const config = {
            headers : {
                "Content-Type" : "application/json"
            }
        }
       
        if(password!==confirmPassword){
            setPassword('')
            setConfirmPassword('')
            setTimeout(()=>{
                setError('')
            },3000);
        return setError("Password do not match")
        }

        if(password.length && confirmPassword.length<6){
            setPassword('')
            setConfirmPassword('')
            setTimeout(()=>{
                setError('')
            },3000);
        return setError("Password must be 6 character")
        }

        try {
            setLoader(true);
            const {data} = await axios.post("/api/register",{username,email,password},config)
            localStorage.setItem("authToken",data.token)
            history.push('/')
        } catch (error) {
            setLoader(false);
            setError(error.response.data)
            setTimeout(()=>{
                setError('')
            },3000)
        }
    }
 
    return (
        <div className="container2" >
            <h2>Register</h2> <br />
            <div>
            {error && <div  className="error ">{error}</div> }
            <form className="form-data" onSubmit={submit}>
                <label  className="l2">Username</label><br />
                <input type="text" placeholder="Enter Username" value={username} onChange={e=>setUsername(e.target.value)} /> <br/><br/>
                <label>Email Address</label><br />
                <input type="email" placeholder="Enter Email" value={email} onChange={e=>setEmail(e.target.value)} /><br/><br/>
                <label  className="l2">Password</label><br />
                <input type="password" placeholder="Enter Password" value={password} onChange={e=>setPassword(e.target.value)} /> <br/><br/>
                <label  className="l3">Confirm Password</label><br />
                <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} /><br/><br/>
                <input type="submit" value='Submit' className="btn btn-primary"/><br/><p></p>
            <span>Already have an account?<Link to='/login' className='f1'> Log in</Link> </span>
            </form>
            </div>
            {loader && 
             <div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
             }
        </div>
    )
}

