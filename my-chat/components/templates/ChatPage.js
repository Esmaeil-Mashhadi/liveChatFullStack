'use client'
import { io } from 'socket.io-client';
import SendModule from '../modules/SendModule';
import styles from './ChatPage.module.css'
import {  useEffect, useRef, useState } from 'react';
import SignOutButton from '../modules/SignOutButton';
import GroupList from '../modules/groupList';
import { FaRegUserCircle } from "react-icons/fa";
import { FaAnglesRight } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";




const ChatPage = ({removeHandler , userName , email}) => {

  const scrollRef  = useRef(null)
  const [value , setValue] = useState()
  const [messages , setMessages] = useState([])
  const [groups , setGroups] = useState([])
  const [nameSpaces , setNameSpaces] = useState([])
  const [groupName , setGroupName] = useState("")
  const [count  , setCount] = useState(1)
  const [show , setShow] = useState(false)
  
  const showStyle ={
    '--opacity':1,
    '--pointerEvents':'auto',
    '--transform' :'0px'
  }

  const hideStyle= {
    '--opacity':0,
    '--pointerEvents':'none',
    '--transform' :'-120%'
  }

  const socket = io("http://localhost:4000")
  const nameSpaceRef = useRef(null)
  
  const initNameSpaceConnection = (endpoint , roomName)=>{  
    setGroupName(roomName)
      nameSpaceRef.current?.close()
      const nameSpaceSocket = io(`http://localhost:4000/${endpoint}`)
      nameSpaceRef.current = nameSpaceSocket;
       nameSpaceSocket?.on("connect" , ()=>{
           nameSpaceSocket.on("roomList" , (data)=>{
               data.endpoint = endpoint
              setGroups(data)
           })

           nameSpaceSocket.on('roomInfo' , (data)=>{
            const {messages , endpoint , roomName } = data
            messages.forEach(message => {
              message.endpoint = endpoint
              message.roomName = roomName
            })
            setMessages([...messages])
           })
       }) 


       if(roomName){
         nameSpaceSocket.emit('joinRoom' , roomName)
         nameSpaceSocket.on('onlineUsers' , (count)=>{
          setCount(count)
         })
       }
   }

  const groupHandler = (e , endpoint)=>{ 
    const roomName = e.currentTarget.getAttribute('name')
      initNameSpaceConnection(endpoint , roomName )
      setGroupName(roomName)
   
  }
  
  useEffect(()=>{
    socket.on('connect' , ()=>{
      socket.on('nameSpacesList' , (data)=>{
        const endpoint = data[0].endpoint
        const roomName = data[0].rooms[0].name   
        setGroupName(roomName)
        initNameSpaceConnection(endpoint , roomName)
      })
    })

  },[])

  useEffect(()=>{
    nameSpaceRef.current?.emit('clientMessage' , ()=>{
      email
    })
  },[nameSpaceRef.current])


  useEffect(()=>{
    scrollRef.current.scrollIntoView({ block:"end"})
  },[messages])


    return (
        <div className={styles.container}>
          <div className={styles.subContainer}>
          {!show ?<button onClick={()=>setShow(true)} className={styles.show}>
              <FaAnglesRight/>
          </button> : <button onClick={()=>setShow(false)} className={styles.close}><FaAnglesLeft/></button>}
            <div style={show ? showStyle : hideStyle} className={styles.leftSide}>

              <div className={styles.leftHeader}>
                <GroupList 
                  initNameSpaceConnection={initNameSpaceConnection}
                  setNameSpaces = {setNameSpaces}
                  nameSpaces={nameSpaces}
                 setGroups = {setGroups}
                 socket={socket}  />
                <h3>&copy; EsiChat.io</h3>
              </div> 

              <div className={styles.groups}>
                  {groups.map(group => {
                    return <div onClick={(e)=>groupHandler(e , groups.endpoint)} name={group.name} className={styles.group}>
                    {group.image&& 
                      <img src={group.image} />
                    }
                    <p>{group.name}</p>
                    </div>
                  })}
              </div>  
            </div>

            <div className={styles.rightSide}>

              <div className={styles.rightHeader}>
                <p className={styles.profile}><FaRegUserCircle/>{userName} </p>
                <p>Online People : {count} </p>
                <SignOutButton removeHandler={removeHandler}  />
              </div>

              <div className={styles.chatInfo}>
                  {groups.map(group => {
                   return groupName == group.name && <p>{group.description}</p>
                  })}
              </div>

    
 
              <div className={styles.chatText}>
                  
                {messages?.map(item =>{
                    const reverseStyle = item.sender.email != email ? {flexDirection:'row-reverse'} :null
                    return <div style={reverseStyle} className={styles.ChatBoxContainer}>
                     <div style={reverseStyle} className={styles.profileChat}><FaRegUserCircle/><span>{item.sender.userName}</span></div> 
                     <div className={item.sender.email == email ? styles.send : styles.reply}>
                     <p>{item.message} <span>{item.dateTime}</span> </p>
                     </div>
                     </div>
                  
                  
                })}
                <div ref={scrollRef}></div>
              </div>

              <div>
                <SendModule nameSpaceRef = {nameSpaceRef} email={email} value={value} setValue ={setValue} />
              </div>

            </div>

          </div> 

        </div>
    );
};

export default ChatPage;


// if(item.endpoint == currentInfo.endpoint && item.roomName == currentInfo.roomName){
