import { Iuser } from "../../interface/IUser";

export interface IadminRepository{
createAdmin(name:string,email:string,password:string):Promise<Iuser>
getuserByEmail(email:string):Promise<Iuser | null>
getAllUser():Promise<Iuser[]>
delectUser(id:string):Promise<Iuser |null>
getUserById(id:string):Promise<Iuser |null>
updateUser(id:string,userdata:Partial<Iuser>):Promise<Iuser |null>
createUser(user: Iuser): Promise<Iuser>;
}