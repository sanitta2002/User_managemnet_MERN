import { UserController } from "../../controllers/user/userController";
import express,{Request,Response} from 'express'

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
    }

    public getUserRouter(){
    return this.UserRouter
}
}

