'use client'
import { useEffect } from 'react';
import styles from './SendModule.module.css'

const SendModule = ({email, value , setValue , nameSpaceRef}) => {

    let trimmedValue
    let nameSpaceSocket = nameSpaceRef.current
    
    trimmedValue = value?.trim()

    
    const sendHandler = ()=>{
        if(!trimmedValue){
            return setValue("")
        }
        
         nameSpaceSocket.emit('clientMessage' , {     
            message:value ,
            email 
         })
         
        setValue('')
    }
    
    const changeHandler = (e)=>{
        setValue(e.target.value)
    }


    
    useEffect(()=>{
        function handlKeyPress(e){
                if(e.key == "Enter" && !e.shiftKey){
                        e.preventDefault()
                        sendHandler()  
                }
        }

        window.addEventListener('keypress' , handlKeyPress)

        return()=>{
            window.removeEventListener('keypress' , handlKeyPress )
        }
       
    },[value])

    return (
        <div  className={styles.bottomRight}>
             <textarea  value={value} onChange={changeHandler}/>
             <button  style={!trimmedValue  ? {opacity :".5" , cursor:"none"} :null}
              disabled ={!trimmedValue} 
              title={!trimmedValue ? 'message is empty' :null}
             onClick={sendHandler}>Send</button>

        </div>
    );
};

export default SendModule;