import { AdminContriller } from "../../controllers/admin/adminController";
import express ,{Request,Response} from 'express'

export class AdminRoute{
    private adminRoute:express.Router
    constructor (private adminController:AdminContriller){
       this.adminController=adminController
       this.adminRoute=express.Router()
       this.setAdminRoute()
    }
    private setAdminRoute(){
       this.adminRoute.post('/login',(req:Request,res:Response)=>{
        this.adminController.adminLogin(req,res)
       })
    }
    public getAdminRoute(){
        return this.adminRoute
    }
}