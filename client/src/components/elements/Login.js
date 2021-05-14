import {useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import GoogleLogin from 'react-google-login';
import google_image from './google.png'

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

    // ...........Google Functions...........................

    const responseSuccessGoogle = async (res) => {
         try { 
            const result = await axios.post('/api/googlelogin',{tokenId : res.tokenId})
            localStorage.setItem("authToken",result.data.token)
            history.push('/')
        } catch (error) {
            setError("Something went wrong! Try again")
            setTimeout(()=>{
                setError('')
            },3000)
        }
    }

    const responseFailureGoogle = (res) => {
        console.log(res);
        setError("Something went wrong! Try again")
        setTimeout(()=>{
            setError('')
        },3000)
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
                <input type="password" placeholder="Enter Password" value={password} onChange={e=>setPassword(e.target.value)} /> <br />
                <p className="forgot"><Link to='/forgotpassword' className='f1'>Forgot Password?</Link></p>
                
            <input type="submit" value='Submit' className="btn btn-primary"/><br/><br />
            <span>Not Registred ? <Link to='/register' className='f1'>Sign Up</Link> </span><br />
            <hr className="hr1"/> <p className="ortext">OR</p>  <hr className="hr2" />
            <GoogleLogin
                clientId="1093241151358-1pgh4gf6et6t5f3gfg6vlt0cv7onf8jr.apps.googleusercontent.com"
                render={renderProps => (
                    <button className="googlebutton" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                         <img src={google_image} alt="google" width='25' height='25' /> 
                         Sign up with Google</button>
                  )}
                buttonText="Sign up with Google"
                onSuccess={responseSuccessGoogle}
                onFailure={responseFailureGoogle}
                cookiePolicy={'single_host_origin'}
            />
            </form>
            </div>
        </div>
    )
}

