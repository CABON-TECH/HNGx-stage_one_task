import express from "express";
import { createUser, getUserInfo } from "../controller/user.controller.js";

const userRoute = express.Router();

//create user
userRoute.post("/register", createUser);
userRoute.get("/", getUserInfo)


export default userRoute;