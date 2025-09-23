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
   async getAllUser(): Promise<Iuser[]> {
       return await UserModel.find({isAdmin:false})
   }
   async delectUser(id: string): Promise<Iuser | null> {
       return await UserModel.findByIdAndDelete(id)
   }
   async getUserById(id: string): Promise<Iuser | null> {
       return await UserModel.findById(id)
   }
   async updateUser(id: string,updateData:Partial<Iuser>): Promise<Iuser |null> {
       return await UserModel.findByIdAndUpdate(id,updateData,{new:true})
   }
   async createUser(newUser: Iuser): Promise<Iuser> {
       return await UserModel.create(newUser)
   }
    
}