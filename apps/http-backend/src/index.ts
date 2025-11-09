import express from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import {CreateUserSchema,SignInSchema,CreateRoomSchema} from '@repo/common/types'
const app = express();

app.use(express.json());


 app.post("/signin",(req,res)=>{
   const data = SignInSchema.safeParse(req.body);
   if(!data.success){
      res.json({
         message:"Incorrect input"
      })
      return;
   }
    const userId = 1 ;
   const token =  jwt.sign({
        userId
    },JWT_SECRET);
    
    res.json({message:"Sign-in successful", token });
 })

 app.post("/signup",middleware,(req,res)=>{

   const data = CreateUserSchema.safeParse(req.body);
   if(!data.success){
      res.json({
         message:"Incorrect input"
      })
      return;
   }
    //db call here 
    res.json({message:"Sign-up successful",userId:123});
 })

 app.post("/room",middleware,(req,res)=>{
   const data = CreateRoomSchema.safeParse(req.body);
   if(!data.success){
      res.json({
         message:"Incorrect input"
      })
      return;
   }
    //db call 
    res.json({message:"room successful", roomId :123},);
 })

app.listen(3001,()=>{
    console.log("HTTP backend server started on http://localhost:3001");
})