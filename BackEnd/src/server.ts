import { App } from "./app"
import { ConnectDB } from "./config/db"


const database = new ConnectDB()
database.ConnectDB()

const app=new App()
app.listen()