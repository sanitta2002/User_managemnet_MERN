import { Iuser } from "../../interface/IUser";

export interface IUserServices{
    createUser(newUser:Iuser):Promise<Iuser>
    
}