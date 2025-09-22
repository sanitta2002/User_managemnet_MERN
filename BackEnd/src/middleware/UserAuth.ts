import { NextFunction, Request,Response } from "express"
import jwt from "jsonwebtoken"
import { UserModel } from "../models/UserModel"
import dotenv from 'dotenv'

dotenv.config()

export const userAuth = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const token=req.cookies.accesstoken
        // console.log('access token',token)
        if(!token){
           return res.status(401).json({message:"no access token"})

        }
        const secret =process.env.ACCESS_SECRET
        const decoded = jwt.verify(token,secret!) 
        if(typeof decoded==='string' || !("id" in decoded)){
            return res.status(403).json({ message: "invalid token" });
        }
        const user= await UserModel.findById(decoded.id) 


        if(!user){
            return res.status(401).json({message: "user not found"})
        }
        next()
    } catch (error) {
        console.log(error)
         res.status(403).json({ message: "expired token" });
    }
}