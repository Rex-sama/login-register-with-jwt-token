import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

export default function ResetPassword({match,history}) {
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [error,setError] = useState('')
    const [success,setSuccess] = useState('')

    const submit = async e => {
        e.preventDefault();
        const config = {
            headers : {
                "Content-Type" : "application/json"
            }
        }
        if(password ==='' || confirmPassword===''){
            setTimeout(()=>{
                setError('')
            },3000);
            return setError('Please enter password')
        }else if(password.length && confirmPassword.length<6){
            setPassword('')
            setConfirmPassword('')
            setTimeout(()=>{
                setError('')
            },3000);
        return setError("Password must be 6 character")
        }
        else if(password!==confirmPassword){
            setPassword('')
            setConfirmPassword('')
            setTimeout(()=>{
                setError('')
            },3000);
        return setError("Password do not match")
        }else{
            try {
                const {data} = await axios.put(`/api/resetpassword/${match.params.resetToken}`,{password},config)
                setSuccess(data)
                setTimeout(()=>{
                    history.push('/login')
                },2000)
                
              
            } catch (error) {
                setError(error.response.data)
                console.log(error.response);
                setTimeout(()=>{
                    setError('')
                },3000)
            }
        }
    
    }
    return (
        <div className="container1" >
        <h2>Reset Password</h2> <br />
        {error && <div  className="error ">{error}  </div> }
        {success && <div  className="success ">{success}  </div> }
        <div>
        <form className="form-data" onSubmit={submit}>
           <label  className="l2">Password</label><br />
            <input type="password" placeholder="Enter Password" value={password} onChange={e=>setPassword(e.target.value)} /> <br/><br/>
            <label  className="l3">Confirm Password</label><br />
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} /><br/><br/>
            <input type="submit" value='Submit' className="btn btn-primary"/><br/>
        </form>
        </div>
    </div>
    )
}
