import { verify } from "jsonwebtoken";

const checkPermission = async (cookies) => {
    try {
      const { value } = cookies().get("authorization"); 
      if (!value) return null;
  
      const res = await fetch("http://localhost:4000/auth/permission", {
        method: "POST" , headers:{"Authorization" :`Bearer ${value}`} , credentials:'include'});
      const {data} = await res.json();
      const {token} = data
      const {userName , email, exp} = verify(token , process.env.USER_SECRET_KEY)
      if(exp*1000 < Date.now()) throw new Error("token expired")
      return {userName , email}
    } catch (error) {
      if (error) {
        return null;
      }
    }
  };
  
export default checkPermission;
