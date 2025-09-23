import { Iuser } from "../../interface/IUser";
import { IadminRepository } from "../../repository/admin/IadminRepository";
import { IadminServies } from "../../services/admin/IadminServices";
import { Request, Response } from "express";

export class AdminContriller {
  constructor(private adminServices: IadminServies) {
    this.adminServices = adminServices;
  }
  async adminLogin(req: Request, res: Response): Promise<void> {
    try {
      console.log("Admin login request:", req.body);
      const { email, password } = req.body;
      const admin = await this.adminServices.isAdminExists(email, password);
      if (admin) {
        res.status(200).json({ message: "login successfull", admin });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
      const isUserEmail = await this.adminServices.isUserEmail(email)
      if(isUserEmail){
         res.status(401).json({message:"This is not admin email"})
         return
      }
    } catch (error:any) {
      console.log(error);
      res.status(500).json({ success: false, message: "Something went wrong" });
    }
  }
  async getAllUser(req: Request, res: Response): Promise<void> {
    try {
      const userList = await this.adminServices.getAllUser();
      if (userList) {
        res.status(200).json({ message: "user details fetched", userList });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "error" });
    }
  }
  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.query;
      if (!id) {
        res.status(400).json({ message: "User ID missing" });
        return;
      }
      const deleteUser = await this.adminServices.delectUser(id as string);
      if (deleteUser) {
        res.status(200).json({ message: "user deleted", deleteUser });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "error" });
    }
  }
  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params as { id: string };
      const userData = req.body as Partial<Iuser>;
      if (!id) {
        res.status(400).json({ message: "User ID is required" });
        return;
      }
      const result = await this.adminServices.updateUser(id, userData);
      if (!result) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res
        .status(200)
        .json({ message: "Profile updated successfully", user: result });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "error" });
    }
  }
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const newUser: Iuser = req.body;
      const createUser = await this.adminServices.createUser(newUser);
      res
        .status(201)
        .json({
          success: true,
          message: "User created successfully",
          user: createUser,
        });
    } catch (error: any) {
      res
        .status(400)
        .json({
          success: false,
          message: error.message || "Failed to add user",
        });
    }
  }
  async logout(req: Request, res: Response) {
    try {
      res.clearCookie("refreshtoken", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      res.clearCookie("accesstoken", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Logout failed" });
    }
  }

}
