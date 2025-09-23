import e from "cors";
import { Iuser } from "../../interface/IUser";
import { IadminRepository } from "../../repository/admin/IadminRepository";
import { IadminServies } from "./IadminServices";
import { BcryptPassword } from "../../utils/bcrypt";
import { UserModel } from "../../models/UserModel";

export class AdminServices implements IadminServies {
  private bcryptPassword: BcryptPassword;
  constructor(private AdminRepository: IadminRepository) {
    this.bcryptPassword = new BcryptPassword();
  }
  async createAdmin(name: string,email: string,password: string): Promise<Iuser> {
    const existingEmail = await this.AdminRepository.getuserByEmail(email);
    if (existingEmail) {
      throw new Error("email already exists");
    }

    const hashPassword = await this.bcryptPassword.hashPassword(password);
    return await this.AdminRepository.createAdmin(name, email, hashPassword);
  }
  
  async isAdminExists(email: string, password: string): Promise<Iuser> {
    const Adminexisting = await this.AdminRepository.getuserByEmail(email);
    if (!Adminexisting) {
      throw new Error("email already exists");
    }
    if (!Adminexisting.isAdmin) {
      throw new Error("this user is not an admin");
    }
    const isPasswordValid = await this.bcryptPassword.comparePassword(password,Adminexisting.password);
    if (!isPasswordValid) {
      throw new Error("Incorrect password");
    }
    return Adminexisting;
  }
  async getAllUser(): Promise<Iuser[] | []> {
    return this.AdminRepository.getAllUser()
  }

  async delectUser(id: string): Promise<Iuser | null> {
    const user=await this.AdminRepository.delectUser(id)
    if(!user){
      throw new Error ('no student found')
    }
    return user
  }
  async updateUser(id: string,userdata:Partial<Iuser>): Promise<Iuser | null> {
    if(userdata.email){
      const existingUser = await this.AdminRepository.getuserByEmail(userdata.email as string)
      if(existingUser && existingUser._id?.toString()!==id){
        throw new Error("Already have user with this email")
      }
    }
    if(userdata.password){
      userdata.password=await this.bcryptPassword.hashPassword(userdata.password)
    }
    return await this.AdminRepository.updateUser(id,userdata)
  }
 async createUser(newUser: Iuser): Promise<Iuser> {
    const email=newUser.email.toLowerCase()
    const existingEmail=await this.AdminRepository.getuserByEmail(email)
    if(existingEmail){
      throw new Error('Email already exists')
    }
    const hashPassword=await this.bcryptPassword.hashPassword(newUser.password)
    const userData={...newUser,email:email,password:hashPassword}
    return await this.AdminRepository.createUser(userData)
  }
   async isUserEmail(email: string): Promise<boolean> {
    const user=await UserModel.findOne({email:email})
    return !!user
  }

}
