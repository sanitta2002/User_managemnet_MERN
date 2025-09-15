import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

export class ConnectDB {
    private databaseurl:string
    constructor(){
        if(!process.env.DB_URL){
            throw new Error("MONGO_URI is not defined in .env file")
        }
        this.databaseurl=process.env.DB_URL
    }
    public async ConnectDB():Promise<void>{
        try {
            await mongoose.connect(this.databaseurl)
            console.log('database connect')
        } catch (error) {
            console.error('Error connecting mongo db')
            throw new Error('Faild for connecting database')
        }
    }
}