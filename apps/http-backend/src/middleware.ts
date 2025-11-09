import  jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "@repo/backend-common/config";

export function middleware(req:Request,res:Response,next:NextFunction){
  const token = req.headers["authorization"] ??" ";

  const decoded = jwt.verify(token, JWT_SECRET);
  console.log("decoded",decoded);

  if(decoded){  
    //@ts-ignore
       req.userId = decoded.userId
       next()
  }else{
    res.status(403).json({
        message :" unauthorized"
    })
  }
  // don't call next() here unconditionally; only continue when authenticated above
}