import { Iuser } from "../../interface/IUser";
import { UserModel } from "../../models/UserModel";
import { IUserRepository } from "./IUserRepository";

export class UserRepository{
    constructor(){}
    async createUser(newUser:Iuser):Promise<Iuser>{
       return await UserModel.create(newUser)
    }
   async findByUserEmail(email: string): Promise<Iuser | null>{
        return await UserModel.findOne({email})
    }
}