import { Iuser } from "../../interface/IUser";
import { UserModel } from "../../models/UserModel";
import { IadminRepository } from "./IadminRepository";

export class AdminRepository implements IadminRepository{
   async createAdmin(name: string, email: string, password: string): Promise<Iuser> {
       return await UserModel.create({name,email,password})
   }
   async getuserByEmail(email: string): Promise<Iuser | null> {
       return await UserModel.findOne({email})
   }
    
}