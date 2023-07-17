import express from 'express';
import jwt from'jsonwebtoken';
// import bcrypt from'bcrypt'
import bcrypt from'bcrypt';
import {userModel}  from '../model/User';


const router = express.Router()

router.post('/register',async(req,res)=>{
    const {username,password} = req.body;
    const user = await userModel.findOne({username})

    if(user){
      return res.json({message: 'User already exists !'})
    }

    const hashed = await bcrypt.hash(password,10);

     const newUser =  new userModel({username,password:hashed})
    
    newUser.save()
    
    // res.json(user)
    return res.json({
      massage: 'success'
      // user
    })

 
})
router.post('/login',async(req,res)=>{
  
  const {username,password} = req.body;
  // console.log({username,password});
  const user =  await userModel.findOne({username})
  if(!user){
    return res.json({message: 'User not found'})
  }
 const ispassword = await bcrypt.compare(password,user.password)  
//  console.log(ispassword)
 if(!ispassword){
  return res.json({message: 'your passwor is wrong'});
 }
 const token = jwt.sign({id: user._id},'secret');
 res.json({token, userId: user._id})
})
router.get('/',(req,res)=>{
  res.json({
    name: 'hellow'
  })
})



export {router as userRouter}