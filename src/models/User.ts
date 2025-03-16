import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false }, // Email verification flag
  verificationToken: { type: String }, // Token for email verification
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
