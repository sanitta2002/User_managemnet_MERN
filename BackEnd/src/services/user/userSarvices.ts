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
        if(user.isAdmin=true){
            throw new Error('Your not a user')
        }
        const passwordMatch=await this.bcryptPassword.comparePassword(password,user.password)
        if(!passwordMatch){
            throw new Error('invalid password')
        }
        const {accessToken,refreshToken}=generateToken(user._id)
        return {user,accessToken,refreshToken}
    }

    async findbyUserId(id: string): Promise<Iuser | null> {
        const userId=await this.UserRepository.findUserbyId(id)
        if(!userId){
            throw new Error('no student found')
        }
        return userId
    }
    async updateProfile(id: string, userdata: Partial<Iuser>): Promise<Iuser |null> {
      if(userdata.email){
         const existingUser =await this.UserRepository.findByUserEmail(userdata.email as string)
       if(existingUser  && existingUser ._id?.toString()!==id){
        throw new Error("Already have user with this email")
       }
       
     }
     if(userdata.password){
        userdata.password=await this.bcryptPassword.hashPassword(userdata.password)
     }
      return await this.UserRepository.updateProfile(id,userdata)
    }
    

}