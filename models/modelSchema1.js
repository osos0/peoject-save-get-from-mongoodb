const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Defining your schema
const blogSchema = new Schema({
  Title: String,
  summary: String,
  body: String,
});

//Creating a model
const Blog = mongoose.model("Blog", blogSchema);

// Export the models
module.exports = Blog;
