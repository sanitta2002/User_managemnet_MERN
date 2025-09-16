import bcrypt from 'bcrypt'

export class BcryptPassword{
    public async hashPassword(password:string):Promise<string>{
        const hashPassword=await bcrypt.hash(password,0)
        return hashPassword
    }
    public async comparePassword(password:string,passwordInDb:string):Promise<boolean>{
        const comparePassword=await bcrypt.compare(password,passwordInDb)
        return comparePassword
    }
}