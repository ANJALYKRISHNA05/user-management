import express from 'express'
import {body} from 'express-validator'
import {protect} from '../middleware/authMiddleware.js'
import upload from '../middleware/upload.js'

import { registerUser,login,updateUser } from '../controllers/userController.js'
const router=express.Router();

router.post("/register",[
    body("username").notEmpty().withMessage("Username is required").isLength({min:3}).withMessage("Username must be at least 3 characters"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").isLength({min:6}).withMessage("Password must be atleast 6 characters"),
],
registerUser);

router.post("/login",[
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").isLength({min:6}).withMessage("Password must be atleast 6 characters")
],
login);

router.put(
  "/update/:id",
  protect,
  upload.single("profilePic"), 
  [
    body("username").notEmpty().withMessage("Username is required").isLength({ min: 3 }),
    body("email").isEmail().withMessage("Invalid email format"),
  ],
  updateUser
);


export default router;
