'use client'
import { useState } from 'react';
import { RiEyeCloseLine } from "react-icons/ri";
import { RiEyeFill } from "react-icons/ri";
import styles from './Login.module.css'
import { useRouter } from 'next/navigation';

const Login = ({transfer , setTransfer}) => {


    const [value , setValue] = useState({
        email:"",
        password:"",
      })

     const [show , setShow] = useState(false)
     const router = useRouter()


      const changeHanlder = (e)=>{
        setValue({
        ...value ,  [e.target.name]  : e.target.value
        })
     }

     const loginHandler = async(e)=>{
      e.preventDefault()
      const res = await fetch("http://localhost:4000/auth/login" , {
        method:"POST" , body:JSON.stringify(value) , headers:{"Content-Type" :"application/json"},
        credentials:'include'
      })
      const data = await res.json()
      if(data.status == 200){
        router.push('/chat') 
        router.refresh()
      }
     }

     const styleObject = {
        '--transform' : transfer? '0%' : "120%"
      }
    
    return (
        <div style={styleObject} className = {styles.loginContainer}>
          <div className={styles.subContainer}>
            <h3>Login form</h3>
    
            <div className={styles.email}>
              <input name='email'  onChange={changeHanlder}  required id='logEmail'/>
              <label htmlFor='logEmail'>Email</label>
            </div>
    
            <div className={styles.pass}>
              <input name='password' type={show ? 'text' : 'password'} onChange={changeHanlder} required id='pass' />
              <label htmlFor='pass'>password</label>
              <p className={styles.svgs}>{show ? <span onClick={()=>setShow(false)} > <RiEyeFill/> </span>: <span onClick={()=>setShow(true)}><RiEyeCloseLine/></span>} </p>

            </div>
         
            <div className={styles.already}>
                 <p onClick={()=>setTransfer(!transfer)}> First time visiting us? </p>
            </div>
            <button onClick={loginHandler} >Login</button>
          </div>
        </div>
    );
};

export default Login;