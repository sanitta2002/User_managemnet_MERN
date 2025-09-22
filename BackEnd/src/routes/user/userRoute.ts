import { UserController } from "../../controllers/user/userController";
import express,{Request,Response} from 'express'
import { userAuth } from "../../middleware/UserAuth";

export class UserRoute{
      private UserRouter:express.Router
    constructor(private userController:UserController){
        this.userController=userController
        this.UserRouter=express.Router()
        this.setRouter()
    }
    private setRouter(){
          this.UserRouter.post('/signup',(req:Request,res:Response)=>{
           this.userController.userRegister(req,res)
          })
          this.UserRouter.post('/login',(req:Request,res:Response)=>{
            this.userController.UserLogin(req,res)
          })
          this.UserRouter.put('/update/:id',userAuth,(req:Request,res:Response)=>{
            this.userController.updateUser(req,res)
          })
          this.UserRouter.get('/profile/:id',userAuth,(req:Request,res:Response)=>{
            this.userController.finduserDetails(req,res)
          })
          this.UserRouter.get('/verify',userAuth,(req:Request,res:Response)=>{
            res.status(200).json({message:"Token is valid"})
          })
          this.UserRouter.get('/refresh',(req:Request,res:Response)=>{
            this.userController.refreshToken(req,res)
          })
          this.UserRouter.get('/logout',(req:Request,res:Response)=>{
            this.userController.logout(req,res)
          })
    }

    public getUserRouter(){
    return this.UserRouter
}
}

