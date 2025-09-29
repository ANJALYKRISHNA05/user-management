import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const userSchema=new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  profilePic: { type: String, default: "" },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
})


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("User", userSchema);
export default User;