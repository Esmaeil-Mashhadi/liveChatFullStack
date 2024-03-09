'use client'
import React, { useState } from 'react';
import SignUp from './SignUp';
import Login from './Login';
import styles from './Register.module.css'

const Register = () => {

    const [transfer , setTransfer] = useState(false)
    return (
        <div className={styles.registerContainer}>
            <img src='/chatBackground.jpg' />
            <SignUp transfer = {transfer} setTransfer = {setTransfer}/>
            <Login transfer={transfer} setTransfer={setTransfer} />
            
        </div>
    );
};

export default Register;

