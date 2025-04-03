const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: { type: String },
    date: { type: String },
    author: { type: String },
    description: { type: String },
    titleImage: { type: String }, 
    images: { type: [String], default: [] },
    youtubeVideoIds: { type: [String], default: [] }
})

module.exports = mongoose.model("Blog", blogSchema)