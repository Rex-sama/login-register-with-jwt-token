import {useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default function Login({history}) {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState('')

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

        try {
            const data = await axios.post("/api/login",{email,password},config)
            localStorage.setItem("authToken",data.data)
            history.push('/')
        } catch (error) {
            setError(error.response.data)
           
            setTimeout(()=>{
                setError('')
            },3000)
        }

    }
 
    return (
        <div className="container1" >
            <h2>Login</h2> <br/>
            <div>
            {error && <div  className="error ">{error}  </div> }
            <form className="form-data" onSubmit={submit}>
            <label>Email Address</label><br />
                <input type="email" placeholder="Enter Email" value={email} onChange={e=>setEmail(e.target.value)} /><br/><br/>
            <label className="l2">Password</label><br />
                <input type="password" placeholder="Enter Password" value={password} onChange={e=>setPassword(e.target.value)} /> <br/><br/>
            <input type="submit" value='Submit' className="btn btn-primary"/><br/><br />
            <span>Not Registred ? <Link to='/register'>Sign Up</Link> </span>
            </form>
            </div>
        </div>
    )
}

