import { Iuser } from "../../interface/IUser";

export interface IUserRepository {
  createUser(user: Iuser): Promise<Iuser>;
  findByUserEmail(email: string): Promise<Iuser | null>;
  // findUserbyId(id: string): Promise<Iuser | null>;
  // updateProfile(id: string, user: Partial<Iuser>): Promise<Iuser | null>;
}
