const mongoose = require('mongoose');

// Define the schema for the Blog model
const blogSchema = new mongoose.Schema({
   image:{
    type: String,
    required: [true, 'Image URL is required'],
    trim: true,
   },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

// Create and export the model
const Blog =  new mongoose.model('Blog', blogSchema);

module.exports = Blog;
