import {useState,useEffect} from 'react'
import axios from 'axios'
import './style.css'

export default function Private({history}) {
    const [error,setError] = useState('')
    const [privateData,setPrivateaData] = useState('')
    
    
    
    useEffect(()=>{
        if(!localStorage.getItem("authToken")){
            history.push("/login")
        }
    const fetchPrivateData = async () => {
        const config = {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('authToken')}`
            }
        }
        try {
            const result = await axios.get('/api/home',config)
            setPrivateaData(result.data)
        } catch (error) {
            localStorage.removeItem('authToken')
            setError("You are not authorized Please Login")
        }
    }

    fetchPrivateData();
    },[history])

    const logOut = () => {
        localStorage.removeItem('authToken');
        history.push('/login')
    }

   

   

    return  error ? (<span>{error}</span>) 
    : ( 
    <div className='box'>
    <p className='msg'>Welcome  {privateData}
    <button className='logout' onClick={logOut}>Logout</button>
    </p>
    <h4 className="success-msg">You are Successfully Logged In</h4>
    </div>    
  )  
         
    
}
