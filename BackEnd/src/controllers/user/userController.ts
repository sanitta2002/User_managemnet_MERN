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
}