import { Iuser } from "../../interface/IUser";
import { IUserRepository } from "../../repository/user/IUserRepository";
import { BcryptPassword } from "../../utils/bcrypt";
import { IUserServices } from "./IuserServices";



export class UserServices implements IUserServices{
    private bcryptPassword:BcryptPassword
    constructor(private UserRepository:IUserRepository){
      this.UserRepository=UserRepository
      this.bcryptPassword=new BcryptPassword()
    }

    async createUser(newUser: Iuser): Promise<Iuser> {
        const email=newUser.email.toLowerCase()
        const existingEmail= await this.UserRepository.findByUserEmail(email)
        if(existingEmail){
            throw new Error('Email already exists')
        }
        const hashPassword=await this.bcryptPassword.hashPassword(newUser.password)
        const userData={...newUser,email:email,password:hashPassword}
        return await this.UserRepository.createUser(userData)
    }
}