import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      maxlength: [100, 'Full name cannot exceed 100 characters'],
    },
    rollNo: {
      type: String,
      required: [true, 'Roll number is required'],
      unique: true,
      trim: true,
      uppercase: true,
      match: [/^[0-9]{2}[A-Za-z]-[0-9]{4}$|^[A-Za-z0-9-]+$/, 'Please provide a valid university roll number (e.g. 24F-0646)'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid university email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false, // Exclude by default from query results
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      enum: ['BSCS', 'BSSE', 'BSAI', 'BSDS', 'BBA'],
      default: 'BSCS',
    },
    semester: {
      type: String,
      required: [true, 'Semester is required'],
      enum: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'],
      default: '1st',
    },
    role: {
      type: String,
      enum: ['student', 'president', 'admin'],
      default: 'student',
    },
    avatar: {
      type: String,
      default: null,
    },
    societies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Society',
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Pre-save hook: Hash password with bcrypt if modified
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Instance method to check password against hash
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
