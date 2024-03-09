const { Router } = require("express");
const { authRoutes } = require("./auth.router");
const { chatRoutes } = require("./chat.router");
const { verifyUser } = require("../middlewares/verifyUser");

const router = Router()

router.use('/auth' , authRoutes)
router.use('/chat' , verifyUser  , chatRoutes)
router.get("/" , (req , res , next)=>{
    res.json("hi")
})

module.exports  = {
    allRoutes :router
}