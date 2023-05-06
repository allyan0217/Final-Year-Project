var jwt = require('jsonwebtoken');
const User=require('../model/UserInfo')
async function middleware(req,res,next){
    const token=req.query.token 
    console.log(token)
    const flag=jwt.verify(token,'Thisismyapp')
    const User1=await User.findOne({_id:flag._id})
    if(User1){
        console.log(flag)
        next();
    }
    else{
        res.status(400).send('error')
    }
   
    
}

module.exports=middleware