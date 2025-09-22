import { Iuser, LoginResponse, } from "../../interface/IUser";

export interface IUserServices{
    createUser(newUser:Iuser):Promise<Iuser>
    userLogin(email:string,password:string):Promise<LoginResponse>
    findbyUserId(id:string):Promise<Iuser |null>
    updateProfile(id:string,userdata:Partial<Iuser>):Promise<Iuser |null>
}