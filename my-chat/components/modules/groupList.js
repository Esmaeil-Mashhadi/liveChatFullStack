'use client'

import { useEffect } from 'react';
import styles from './groupList.module.css'
import { BsChatDotsFill } from "react-icons/bs";

const GroupList = ({ socket , initNameSpaceConnection , setNameSpaces , nameSpaces }) => {


  useEffect(()=>{
    socket.on("nameSpacesList" , (data)=>{
      setNameSpaces(data)
    }) 
  },[])




    const listHandler = (endpoint , roomName)=>{
      
        initNameSpaceConnection(endpoint , roomName)
    }



    return (
        <div className={styles.groupList}>
            <BsChatDotsFill/> Groups
            <ul className={styles.groupsContainer}>
              {nameSpaces.map(group =>{
                return <li onClick={()=>listHandler(group.endpoint , group.rooms[0].name)}>{group.title}</li>
              })}
            </ul>
      </div>
    );
};

export default GroupList;