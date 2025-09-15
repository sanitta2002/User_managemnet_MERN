import express,{Application} from 'express'

 export class App{
    private app:Application;
    constructor(){
       this.app=express()
    
    }

    public listen(){
      this.app.listen(process.env.PORT,()=>{console.log('server is running')})
    }

}