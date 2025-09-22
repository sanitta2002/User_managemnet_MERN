import { IadminRepository } from "../../repository/admin/IadminRepository";
import { IadminServies } from "../../services/admin/IadminServices";
import { Request,Response } from "express";

export class AdminContriller{
   
    constructor( private adminServices:IadminServies){
        this.adminServices=adminServices
    }
    async adminLogin(req:Request,res:Response):Promise<void>{
        try {
            console.log("Admin login request:", req.body);
            const {email,password}=req.body 
        const admin= await this.adminServices.isAdminExists(email,password)
        if(admin){
            res.status(200).json({message:"login successfull",admin})
        }else{
            res.status(401).json({message: "Invalid credentials" })
        }
        } catch (error) {
            console.log(error)
             res.status(500).json({success: false, message: "Something went wrong" })
        }
    }
}