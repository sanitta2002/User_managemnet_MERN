import { Iuser } from "../../interface/IUser";
import { IUserServices } from "../../services/user/IuserServices";
import { Request,Response } from "express";

export class UserController{
    constructor(private UserServices:IUserServices){
        this.UserServices=UserServices
    }
    async userRegister(req:Request,res:Response):Promise<void>{
        try {
            const user:Iuser=req.body
            const result=await this.UserServices.createUser(user)
            res.status(201).json({message:'user created'})
        } catch (error) {
            res.status(500).json({ success: false, message:"error" });
        }
    }
    async UserLogin(req:Request,res:Response):Promise<void>{
        try {
            const {email,password}=req.body
            console.log('checking........', email ,password)
            if(!email || !password){
                throw new Error("All fields are required")
            }
            const result=await this.UserServices.userLogin(email,password)
            // console.log("...",result)
            const { user, accessToken, refreshToken } =result
            res.cookie('refreshtoken',refreshToken,{
                httpOnly:true,
                secure:true,
                sameSite:"strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            res.cookie('accesstoken',accessToken,{
                httpOnly:true,
                secure:true,
                sameSite:'strict',
                maxAge:7 * 24 * 60 * 60 * 1000,
            })

            res.status(200).json({message: "Login successful",user,accessToken,refreshToken})
            
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message:"error" });
        }
    }
}