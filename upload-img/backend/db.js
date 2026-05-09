const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
// Inside db.js
const app = require("./index"); // Because you chose to keep the name index.js
// We don't need MongoClient if we are using Mongoose
mongoose.set('strictQuery', false); 

mongoose.connect(process.env.CONNECTIONSTRING)
  .then(() => {
    console.log("✅ Successfully connected to MongoDB");
    
    // This loads your express app settings
    
    // Start listening
    const port = process.env.PORT || 5005;
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("❌ MongoDB connection error:", err);
  });