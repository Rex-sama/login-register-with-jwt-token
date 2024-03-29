import './style.css'
import {useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import GoogleLogin from 'react-google-login';
import google_image from './img/google.png'
import eyeopen from './img/eyeopen.png'
import eyeclose from './img/eyeclose.png'

export default function Login({history}) {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState('')
    const [passwordShown, setPasswordShown] = useState(false);
    const [loader, setLoader] = useState(false)

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
      };

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
            setLoader(true);
            const data = await axios.post("/api/login",{email,password},config)
            localStorage.setItem("authToken",data.data)
            history.push('/')
        } catch (error) {
            setLoader(false);
            setError(error.response.data)
            setTimeout(()=>{
                setError('')
            },3000)
        }

    }

    // ...........Google Functions...........................

    const responseSuccessGoogle = async (res) => {
         try { 
            setLoader(true);
            const result = await axios.post('/api/googlelogin',{tokenId : res.tokenId})
            localStorage.setItem("authToken",result.data.token)
            history.push('/')
        } catch (error) {
            setLoader(false);
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
                <input style={{width:"259px",marginLeft:"47px",border:'0.1px solid rgb(66, 65, 65)',borderRight:'none',borderRadius:"0.5px"}} type={passwordShown ? "text" : "password"} placeholder="Enter Password" value={password} onChange={e=>setPassword(e.target.value)} />
                <i className='eye' onClick={togglePasswordVisiblity}>
                {passwordShown? <img src={eyeopen} alt="eye" width='37' height='28' />:<img src={eyeclose} alt="eye" width='37' height='28' />}
                   </i>
                 <br />
                <p className="forgot"><Link to='/forgotpassword' className='f1'>Forgot Password?</Link></p>
                
            <input type="submit" value='Submit' className="btn btn-primary"/><br/><br />
            <span>Not Registred ? <Link to='/register' className='f1'>Sign Up</Link> </span><br />
            <hr className="hr1"/> <p className="ortext">OR</p>  <hr className="hr2" />
            <GoogleLogin
                clientId= {process.env.REACT_APP_GOOGLE_CLIENT_ID}
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
            {/*------------------ Loader------------------- */}
         
        {loader && 
        <div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        }
          

            </div>
        </div>
    )
}

