import express,{Application} from 'express'
import dotenv from 'dotenv'
import { UserController } from './controllers/user/userController';
import { UserRoute } from './routes/user/userRoute';
import { UserRepository } from './repository/user/userRepository';
import { UserServices } from './services/user/userSarvices';

 export class App{
    private app:Application;
    constructor(){
       this.app=express()
       dotenv.config()
       this.app.use(express.json())
       this.injectUser()
       this.setUserRoute()
    
    }

    public listen(){
      this.app.listen(process.env.PORT,()=>{console.log('server is running')})
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

}