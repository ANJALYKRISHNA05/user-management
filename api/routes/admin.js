import express from "express";
import { body } from "express-validator";
import { protect,adminOnly } from "../middleware/authMiddleware.js";
import {getAllUsers,updateUser,deleteUser,addUser,} from "../controllers/adminController.js";

const router = express.Router();
router.get("/", protect,adminOnly, getAllUsers);

router.post("/add",protect,adminOnly,[
    body("username").notEmpty().withMessage("Username is required").isLength({ min: 3 }).withMessage("Username must be at least 3 characters"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  addUser
);

router.put( "/update/:id",protect,adminOnly,[
    body("username").notEmpty().withMessage("Username is required").isLength({ min: 3 }).withMessage("Username must be at least 3 characters"),
    body("email").isEmail().withMessage("Invalid email format"),
  ],
  updateUser
);


router.delete("/delete/:id", protect,adminOnly,deleteUser);

export default router;
