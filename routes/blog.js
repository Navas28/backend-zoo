const express = require("express");
const router = express.Router();

const Blog = require("../models/BlogSchema");

router.get("/", async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (err) {
        console.error("Errpr fetching", err);
        res.status(500).json({ error: err.message });
    }
});

// Fetch single blog by ID

router.get("/:id", async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
});

module.exports = router;
