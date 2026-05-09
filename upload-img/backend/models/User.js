const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true, 
    lowercase: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true, 
    lowercase: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  profileImage: { 
    type: String, 
    default: '/default-avatar.png' 
  }
});

/**
 * 1. PRE-SAVE HOOK (Hashing)
 * This automatically hashes the password before it is saved to MongoDB.
 */
UserSchema.pre("save", function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();

  try {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

/**
 * 2. VALIDATION HELPER
 */
UserSchema.methods.validateUser = function() {
  const errors = [];
  if (this.username === "") errors.push("Username is required.");
  if (this.password === "") errors.push("Password is required.");
  if (this.password.length > 0 && this.password.length < 6) errors.push("Password must be at least 6 characters.");
  return errors;
};

/**
 * 3. REGISTER LOGIC
 */
UserSchema.methods.register = function() {
  return new Promise(async (resolve, reject) => {
    const errors = this.validateUser();

    if (errors.length === 0) {
      try {
        await this.save();
        resolve();
      } catch (e) {
        if (e.code === 11000) {
          reject(["That username or email is already taken."]);
        } else {
          reject(["Database error. Please try again."]);
        }
      }
    } else {
      reject(errors);
    }
  });
};

/**
 * 4. LOGIN LOGIC
 */
UserSchema.methods.login = function() {
  return new Promise(async (resolve, reject) => {
    try {
      const attemptedUser = await mongoose.model('User').findOne({ username: this.username });
      
      // TEMP LOGS - Check your terminal
      console.log("Password from Frontend:", this.password);
      console.log("Password in Database:", attemptedUser ? attemptedUser.password : "User Not Found");

      if (attemptedUser && bcrypt.compareSync(this.password, attemptedUser.password)) {
        resolve({ token: "dummy-token-123", username: attemptedUser.username });
      } else {
        reject("Invalid username / password.");
      }
    } catch (e) {
      reject("Server error.");
    }
  });
};
const User = mongoose.model('User', UserSchema);
module.exports = User;