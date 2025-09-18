import { Iuser, LoginResponse } from "../../interface/IUser";
import { IUserRepository } from "../../repository/user/IUserRepository";
import { BcryptPassword } from "../../utils/bcrypt";
import { generateToken } from "../../utils/jwt";
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
    async userLogin(email: string,password:string): Promise<LoginResponse> {
        const user = await this.UserRepository.findByUserEmail(email)
        if(!user){
            throw new Error('no Account found with the provided email address.');
            
        }
        const passwordMatch=await this.bcryptPassword.comparePassword(password,user.password)
        if(!passwordMatch){
            throw new Error('invalid password')
        }
        const {accessToken,refreshToken}=generateToken(user._id)
        return {user,accessToken,refreshToken}
    }

}