import express from "express"; 
import { register, login,updateUser, deleteUser  } from "../controllers/authController.js";
import { authenticate, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.put('/updateUser/:id', authenticate, authorizeRoles('Student', 'Lecturer', 'Admin'), updateUser);

// Delete user (Admin only)
router.delete('/deleteUser/:id', authenticate, authorizeRoles('Admin'), deleteUser);

export default router;