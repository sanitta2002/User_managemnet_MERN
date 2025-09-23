import { Iuser } from "../../interface/IUser";


export interface IadminServies{
    createAdmin(name:string,email:string,password:string):Promise<Iuser>
    isAdminExists(email:string,password:string):Promise<Iuser>
    getAllUser():Promise<Iuser[] | []>
    delectUser(id:string):Promise<Iuser |null>
    updateUser(id:string,userdata:Partial<Iuser>):Promise<Iuser |null>
    createUser(newUser:Iuser):Promise<Iuser>
    isUserEmail(email:string):Promise<boolean>
}