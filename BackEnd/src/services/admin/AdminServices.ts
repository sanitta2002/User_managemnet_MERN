import e from "cors";
import { Iuser } from "../../interface/IUser";
import { IadminRepository } from "../../repository/admin/IadminRepository";
import { IadminServies } from "./IadminServices";
import { BcryptPassword } from "../../utils/bcrypt";

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
}
