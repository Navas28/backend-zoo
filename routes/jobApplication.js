const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const JobApplication = require("../models/JobApplicationSchema");

// Resume Uploading to uploads folder

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "uploads/");
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    fileFilter: (req, file, callback) => {
        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];
        if (allowedTypes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(new Error("Only PDF/DOCX files are allowed!"));
        }
    },
});

// Job Application Form

router.post("/", upload.single("resume"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Resume file is required" });
        }
        const newApplication = new JobApplication({
            ...req.body,
            resume: req.file.path,
        });
        await newApplication.save();
        res.status(201).json({ success: true, message: "Job Application Submitted" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

module.exports = router;
