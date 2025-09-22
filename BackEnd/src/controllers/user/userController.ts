import { Iuser } from "../../interface/IUser";
import { IUserServices } from "../../services/user/IuserServices";
import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import { generateToken } from "../../utils/jwt";

export class UserController {
  constructor(private UserServices: IUserServices) {
    this.UserServices = UserServices;
  }
  async userRegister(req: Request, res: Response): Promise<void> {
    try {
      const user: Iuser = req.body;
      const result = await this.UserServices.createUser(user);
      res.status(201).json({ message: "user created" });
    } catch (error) {
      res.status(500).json({ success: false, message: "error" });
    }
  }
  async UserLogin(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      console.log("checking........", email, password);
      if (!email || !password) {
        throw new Error("All fields are required");
      }
      const result = await this.UserServices.userLogin(email, password);
      // console.log("...",result)
      const { user, accessToken, refreshToken } = result;
      res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.cookie("accesstoken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res
        .status(200)
        .json({ message: "Login successful", user, accessToken, refreshToken });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "error" });
    }
  }

  async finduserDetails(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params as { id: string };
      const result = await this.UserServices.findbyUserId(id);
      if (result) {
        res.status(200).json({ message: "profile data fetched", result });
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      res.status(500).json({ success: false, message: error });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id  } = req.params as { id: string };
      const userData = req.body as Partial<Iuser>;
      // const {imageUrl}=req.body
      const result = await this.UserServices.updateProfile(id,userData);
      if (result) {
        res.status(200).json({ message: "profile updated", result });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "error" });
    }
  }
  async refreshToken(req:Request,res:Response):Promise<void>{
    try {
      const token=req.cookies.refreshtoken
      if(!token){
         res.status(401).json({message: "No refresh token"})
         return
      }
      const secret = process.env.REFRESH_SECRET
      const decoded=jwt.verify(token,secret!)
       if(typeof decoded==='string' || !("id" in decoded)){
            res.status(403).json({ message: "invalid token" });
            return
        }
        const user=await this.UserServices.findbyUserId(decoded.id)
        if(!user){
          res.status(401).json({message: "User not found"})
          return
        }
        const {accessToken} = generateToken(user._id)
        res.cookie('accesstoken',accessToken,{
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        res.status(200).json({accessToken,user})
    } catch (error) {
      
    }
  }
  async logout(req:Request,res:Response):Promise<void>{
    try {
      res.clearCookie('refreshtoken',{
         httpOnly: true,
          secure: true,
          sameSite: 'strict'
      })
      res.clearCookie('accesstoken',{
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
      })
      res.status(200).json({message: 'Logged out successfully'})
    } catch (error) {
      console.log(error)
    }
  }
}
