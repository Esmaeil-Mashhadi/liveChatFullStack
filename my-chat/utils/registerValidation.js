const registerValidation = (payload)=>{
    const messages = {}

    if(!payload.email){
        messages.emailError = "waiting for your email"
    }else if(!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(payload.email)){
        messages.emailError = 'good but not valid yet'
    }else{
        delete messages.emailError
    }
    if(!payload.userName){
        messages.userNameError = "waiting for your user name"
    }else if(payload.userName.length < 3){
        messages.userNameError = 'at least 3 characters'
    }else{
        delete messages.userNameError
    }

    if(!payload.password){
        messages.password = "waiting for the password"
    }if(!(/^(?=.*[A-Z])(?=.*[0-9a-zA-Z]).{6,}$/).test(payload.password)){
        messages.passwordError ="one upper case , 6 character at least"
    }else{
        delete messages.passwordError
    }

    if(!payload.confirm){
        messages.confirmError = "waiting for the confirmation"
    }else if(payload.confirm !== payload.password){
        messages.confirmError = "pass doesn't match yet"
    }else{
        delete messages.confirmError
    }
    

    return messages


}


export default registerValidation