import { Request, Response } from "express";
import { userServices } from "./user.service";
import { pool } from "../../config/db";

const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const result = await userServices.createUser(name,email)
    // console.log(result.rows[0]);
    // res.send({ message: "data inserted" });
    res.status(201).json({
      success: true,
      message: "data inserted successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUser()
    res.status(200).json({
      success: true,
      message: "users retrived successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      datails: err,
    });
  }
}

const getSingleUser = async (req: Request, res: Response) => {
  // console.log(req.params.id);

  try {
    const result = await userServices.getSingleUser(req.params.id as string);
    
    if (result.rows.length === 0){
      res.status(404).json({
          success: false,
          message: "User not found",
        })
    }else{
      res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: result.rows[0]
      })
    }
     
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      datails: err,
    });
  }
}

const deleteUser = async (req: Request, res: Response) => {
  // console.log(req.params.id);

  try {
    const result = await userServices.deleteUser(req.params.id as string) ;

    // console.log(result);

    if (result.rowCount === 0){
      res.status(404).json({
          success: false,
          message: "User not found",
        })
    }else{
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: result.rows
      })
    }
     
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      datails: err,
    });
  }
}

const updateUser = async (req: Request, res: Response) => {

  const {name, email} = req.body;

  try {
    const result = await userServices.updateUser(name,email,req.params.id!);

    if (result.rows.length === 0){
      res.status(404).json({
          success: false,
          message: "User not found",
        })
    }else{
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: result.rows[0]
      })
    }
     
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      datails: err,
    });
  }
}

export const userControllers = {
    createUser,
    getUser,
    getSingleUser,
    deleteUser,
    updateUser

}