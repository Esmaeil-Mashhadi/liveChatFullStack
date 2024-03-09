import React from 'react';
import {cookies} from 'next/headers'
import checkPermission from '@/utils/checkUserAccessbility';
import { redirect } from 'next/navigation';
import ChatPage from '@/components/templates/ChatPage';

const chatPage = async() => {

        const {userName , email} = await checkPermission(cookies) ||{}
        if(!userName || !email){
            redirect("/")
        }     
   
    const removeHandler = async()=>{
        'use server'
        cookies().delete('authorization')
    }


    return (
       
           <ChatPage userName={userName} email = {email} removeHandler={removeHandler}/>
    );
};

export default chatPage;