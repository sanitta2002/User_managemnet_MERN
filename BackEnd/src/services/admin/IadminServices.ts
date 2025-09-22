import { Iuser } from "../../interface/IUser";


export interface IadminServies{
    createAdmin(name:string,email:string,password:string):Promise<Iuser>
    isAdminExists(email:string,password:string):Promise<Iuser>
}