// ✅ RIGHT (Using Mongoose .save())
const Post = require("../models/Post")

exports.create = function(req, res) {
  // 1. Create the instance
  let post = new Post({
    title: req.body.title,
    body: req.body.body
    // Don't try to save the 'token' into the database here
  })

  // 2. Use .save() which is the correct Mongoose method
  post.save()
    .then(function(newId) {
      res.json(newId) 
    })
    .catch(function(errors) {
      res.status(500).send("Check your required fields.")
    })
}