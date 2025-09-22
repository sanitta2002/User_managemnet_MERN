import { Iuser } from "../../interface/IUser";

export interface IadminRepository{
createAdmin(name:string,email:string,password:string):Promise<Iuser>
getuserByEmail(email:string):Promise<Iuser | null>
}