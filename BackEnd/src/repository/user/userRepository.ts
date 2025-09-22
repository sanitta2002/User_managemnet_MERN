import { Iuser } from "../../interface/IUser";
import { UserModel } from "../../models/UserModel";
import { IUserRepository } from "./IUserRepository";

export class UserRepository{
    async createUser(newUser:Iuser):Promise<Iuser>{
       return await UserModel.create(newUser)
    }
   async findByUserEmail(email: string): Promise<Iuser | null>{
        return await UserModel.findOne({email})
    }
    async findUserbyId(id:string):Promise<Iuser| null>{
        return await UserModel.findById(id)
    }

    async updateProfile(id:string,updateData:Partial<Iuser>):Promise<Iuser|null>{
        return await UserModel.findByIdAndUpdate(id,updateData,{new:true})
    }
}