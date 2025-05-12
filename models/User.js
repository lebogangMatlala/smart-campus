import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  studentNumber: {
    type: String,
    unique: true,
    sparse: true // applies only for students
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Student', 'Lecturer', 'Admin'],
    required: true
  },
  department: {
    type: String
  },
  phone: {
    type: String
  },
  profilePicture: {
    type: String // URL to the profile image
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('User', userSchema);
