import express,{Application} from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import { UserController } from './controllers/user/userController';
import { UserRoute } from './routes/user/userRoute';
import { UserRepository } from './repository/user/userRepository';
import { UserServices } from './services/user/userSarvices';
import cookiParser from "cookie-parser"
import { AdminContriller } from './controllers/admin/adminController';
import { AdminRepository } from './repository/admin/AdminRepository';
import { AdminServices } from './services/admin/AdminServices';
import { AdminRoute } from './routes/admin/adminRoute';

 export class App{
    private app:Application;
    constructor(){
      // dotenv.config()
       this.app=express()
       this.app.use(express.json())
       this.setMiddleware()
       this.injectUser()
       this.setUserRoute()
       this.injectAdmin()
       this.setAdminRoute()
    
    }

    public listen(){
      this.app.listen(process.env.PORT,()=>{console.log('server is running')})
    }

    setMiddleware(){
      this.app.use(cors({
        origin:"http://localhost:5173",
        methods:["GET", "POST", "PUT", "DELETE" , "OPTIONS"],
        credentials:true
      }))

      this.app.use(cookiParser())
     
    }

    private injectUser():UserController{
      const userRepository=new UserRepository()
      const UserService=new UserServices(userRepository)
      return new UserController(UserService)
    }

    private setUserRoute(){
      const userController=this.injectUser()
      const userRoute = new UserRoute(userController)
      this.app.use('/user',userRoute.getUserRouter())
    }
    private injectAdmin():AdminContriller{
      const adminRepository=new AdminRepository()
      const adminServices=new AdminServices(adminRepository)
      return new AdminContriller(adminServices)
    }
    private setAdminRoute(){
      const adminController=this.injectAdmin()
      const adminRoute = new AdminRoute(adminController)
      this.app.use('/admin',adminRoute.getAdminRoute())
    }

}