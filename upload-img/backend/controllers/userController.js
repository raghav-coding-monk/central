const User = require('../models/User') 

// 1. LOGIN
// backend/controllers/userController.js
// backend/controllers/userController.js

exports.login = function(req, res) {
  // 1. ADD THIS LOG HERE
  console.log("DATA RECEIVED FROM FRONTEND:", req.body);

  let user = new User(req.body);
  user.login()
    .then(function(result) {
      res.json({
        token: result.token,
        username: result.data.username,
        avatar: result.data.avatar
      });
    })
    .catch(function(e) {
      // 2. This is likely what is sending the error back to your frontend
      console.log("Login failed because:", e); 
      res.json({ error: "No data received" });
    });
};
// 2. REGISTER
// 2. REGISTER
// backend/controllers/userController.js
exports.register = async function(req, res) {
  try {
    let user = new User(req.body);
    await user.register();
    res.json({ msg: "Success!" });
  } catch (err) {
    // THIS LOG IS CRITICAL
    console.error("CRASH DETAILS:", err); 
    res.status(500).json(err);
  }
};

exports.home = function(req, res) {
    res.send("Welcome to the home page");
};