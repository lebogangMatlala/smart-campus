// controllers/authController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from '../utils/sendEmail.js';
export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ name, email, password: hashedPassword, role });
  await user.save();
 // Send welcome email
 await sendEmail(
  user.email,
  "Welcome to Smart Campus",
  `Hello ${user.name},\n\nYour account has been successfully created on Smart Campus.\n\nBest regards,\nSmart Campus Team`
);
  res.status(201).json({ message: "User registered successfully",user:user });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);
  res.json({message: "Login successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      studentNumber: user.studentNumber,
      department: user.department,
      phone: user.phone,
      profilePicture: user.profilePicture,
      createdAt: user.createdAt,
    },
    
  });
};

// Update user details (including sensitive information like password)
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role, department, phone, profilePicture, studentNumber, idOrPassportNumber } = req.body;

  try {
    // Check if the user trying to update is the same as the one in the token or an admin
    if (req.user.userId !== id && req.user.role !== 'Admin') {
      return res.status(403).json({ error: 'You are not authorized to update this user' });
    }

    // If the password is being updated, hash it before saving
    if (password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(password, salt);
    }

    // Check if the email or student number already exists (if being updated)
    const emailExists = await User.findOne({ email });
    const studentNumberExists = await User.findOne({ studentNumber });

    if (emailExists && emailExists._id.toString() !== id) {
      return res.status(400).json({ error: 'Email is already taken' });
    }

    if (studentNumber && studentNumberExists && studentNumberExists._id.toString() !== id) {
      return res.status(400).json({ error: 'Student number is already taken' });
    }

    // Update user in the database
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        password: req.body.password,
        role,
        department,
        phone,
        profilePicture,
        studentNumber,
        idOrPassportNumber
      },
      { new: true } // return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Delete a user (Only Admin can delete any user)
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Ensure that only an Admin can delete a user
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ error: 'Only admins can delete users' });
    }

    // Find the user by ID and delete
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
