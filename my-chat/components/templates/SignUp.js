'use client'

import {useState } from 'react';
import styles from './Signup.module.css'
import { RiEyeCloseLine } from "react-icons/ri";
import { RiEyeFill } from "react-icons/ri";
import { GoCheckCircleFill } from "react-icons/go";
import registerValidation from '@/utils/registerValidation';
import { useRouter } from 'next/navigation';


const SignUp = ({transfer , setTransfer}) => {

    const [value , setValue] = useState({
        email:"",
        password:"",
        userName:'',
        confirm:""
      })
    
      const [focusted , setFocusted] = useState ({
        email:false,
        userName: false,
        password:false,
        confirm:false
      })
    
      const [show , setShow] = useState(false)
      const router = useRouter()
    
       const changeHanlder = (e)=>{
          setValue({
          ...value ,  [e.target.name]  : e.target.value
          })
       }
    
       const  focusHandler = (e)=>{
          setFocusted({
            ...focusted , [e.target.name] : true
          })
       }
    
    
      const submitHandler = async(e)=>{
        e.preventDefault()
        const res =  await fetch("http://localhost:4000/auth/signUp" , {
          method:"POST" , body:JSON.stringify(value) , headers:{"Content-Type" :"application/json"} , credentials:"include"
        })

        const data = await res.json()
        if(data.statusCode == 201){
          console.log(data);
          router.refresh()
          router.push('/chat')
        }
      }

      const styleObject = {
        '--transform' : transfer? '120%' : "0%"
      }
    
       const {emailError , passwordError , confirmError , userNameError} =  registerValidation(value)

    return (
        <form style={styleObject} className = {styles.SignUpContainer}>
          <div className={styles.subContainer}>
            <h3>Register Form</h3>
    
            <div className={styles.email}>
              <input name='email'  onChange={changeHanlder} onFocus={focusHandler} required id='email'/>
              <label htmlFor='email'>Email</label>
              {focusted.email && !emailError &&  <div className={styles.doneSvg}><GoCheckCircleFill/></div>}
              <p className={styles.error}>{focusted.email && emailError && emailError } </p>
            </div>
    
            <div className={styles.email}>
              <input name='userName'  onChange={changeHanlder} onFocus={focusHandler} required id='userName'/>
              <label htmlFor='userName'>user name</label>
              {focusted.userName && !userNameError &&  <div className={styles.doneSvg}><GoCheckCircleFill/></div>}
              <p className={styles.error}>{focusted.userName && userNameError && userNameError } </p>
            </div>
    
            <div className={styles.password}>
              <input name='password' type={show ? 'text' : 'password'} onChange={changeHanlder} onFocus={focusHandler} required id='password' />
              <label htmlFor='password'>password</label>
              {focusted.password && !passwordError &&  <div style={{right:"25px"}} className={styles.doneSvg}><GoCheckCircleFill/></div>}
              <p className={styles.svgs}>{show ? <span onClick={()=>setShow(false)} > <RiEyeFill/> </span>: <span onClick={()=>setShow(true)}><RiEyeCloseLine/></span>} </p>
              <p className={styles.error}>{focusted.password && passwordError && passwordError } </p>
            </div>
    
            <div className={styles.confirm}>
              <input type='password' name='confirm' onChange={changeHanlder} onFocus={focusHandler} required id='confirm' />
              <label htmlFor='confirm'>confirm password</label>
              {focusted.confirm && !confirmError &&  <div className={styles.doneSvg}><GoCheckCircleFill/></div>}
              <p className={styles.error}>{focusted.confirm && confirmError && confirmError } </p>
            </div>
            
            <div className={styles.already}>
              <p onClick={()=>setTransfer(true)}> Already have an account? </p>
            </div>
            <button onClick={submitHandler}>Submit</button>
          </div>
        </form>
    );
};

export default SignUp;