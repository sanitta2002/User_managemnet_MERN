import { Iuser, LoginResponse, } from "../../interface/IUser";

export interface IUserServices{
    createUser(newUser:Iuser):Promise<Iuser>
    userLogin(email:string,password:string):Promise<LoginResponse>
}