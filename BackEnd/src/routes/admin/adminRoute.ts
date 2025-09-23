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
       this.adminRoute.get('/getallUser',(req:Request,res:Response)=>{
        this.adminController.getAllUser(req,res)
       })
       this.adminRoute.delete('/deleteUser',(req:Request,res:Response)=>{
        this.adminController.deleteUser(req,res)
       })
       this.adminRoute.put('/upadateUser/:id',(req:Request,res:Response)=>{
        this.adminController.updateUser(req,res)
       })
       this.adminRoute.post('/addUser',(req:Request,res:Response)=>{
        this.adminController.createUser(req,res)
       })
       this.adminRoute.get('/logout',(req:Request,res:Response)=>{
        this.adminController.logout(req,res)
       })
    }
    public getAdminRoute(){
        return this.adminRoute
    }
}