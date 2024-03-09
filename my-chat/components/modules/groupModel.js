'use client'
import { useEffect, useRef, useState } from 'react';
import styles from './groupModal.module.css'
import { IoMdCloseCircle } from "react-icons/io";


const GroupModal = ({groups  ,addHandler , setData , data , setShowGroupModal , title , setShowModal }) => {

    const [disabled , setDisabled] = useState(false)
    const submitHandler  = async(e)=>{
        const formData = new FormData(e.target)
        formData.append('title' , title)
        const res  = await fetch("http://localhost:4000/chat/add-groups" ,{
            method:"post" , body : formData , credentials:"include"
        })
        const data = await res.json()
        console.log(data);
        if(data.status == 201){
            setShowGroupModal(false)
            setShowModal(false)
        }
    }



    const cancelHandler= ()=>{
        setData({...data , groups:['']})
        setShowGroupModal(false)

    }
    const scrollRef = useRef(null)

    useEffect(()=>{
        if(groups.length == 4){
           setDisabled(true) 
        }else{  
           setDisabled(false)  
        } 
     },[data]) 

return ( 
  <form 
  encType='multipart/form-data'
  onSubmit={submitHandler}
  className={styles.modalContainer}>
    <div ref={scrollRef} className={styles.subContainer}>

      <div className={styles.topButtonContainer}>
      <button  type='submit'>Create Group</button>
      <button type='button' title={disabled && 'maximum 4 group can be created'} disabled={disabled}  onClick={addHandler}>Add more Groups</button>
      <button  onClick={cancelHandler}>cancel</button>
     </div>

        {groups.map((_,index)=>{
            return <div 
            className={styles.groupInputes}>
            
        
        <div className={styles.inputContainer}>
            <label>Name: </label>
            <input  name={`name`}  maxLength={25} />
        </div>  

        <div className={styles.inputContainer}>
            <label>Image:</label>
            <input name={`image`}  type='file' />
        </div>
        
        <div className={styles.inputContainer} >
            <label>description :</label>
            <input name={`description`}   />
        </div>

        <button type='button' disabled={groups.length == 1}  className={styles.remove} onClick={()=>{ 
            groups.splice(index , 1)
             setData({...data , groups:[...groups]})
        }}> {groups.length ==1 ? <span>at least one group needed</span> : <span>remove Group</span>}<IoMdCloseCircle/> </button>
      </div>
        })}
    </div>
  </form>
    );
};

export default GroupModal;