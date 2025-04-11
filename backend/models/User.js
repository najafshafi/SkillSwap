const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Male",
    },
    birthdate: { type: Date, required: true },
    skillsOffered: { type: [String], default: [] }, // still array
    profilePicture: { type: Buffer }, // optional, stored in binary
    bio: { type: String },
    location: { type: String },
    skillsWanted: { type: [String], default: [] },
    isAdmin: { type: Boolean, default: false }, // Admin flag for course management
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
