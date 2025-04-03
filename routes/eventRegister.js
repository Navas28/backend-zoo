const express = require("express");
const router = express.Router();

const EventRegistration = require("../models/EventRegistrationSchema");

router.post("/", async (req, res) => {
    try {
        const { name, email, phone, participants, requests } = req.body;
        if (!name || !email || !phone || !participants) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newEventRegistration = new EventRegistration({
            name,
            email,
            phone,
            participants,
            requests,
        });
        await newEventRegistration.save();
        res.status(201).json({ message: "Registration Successful" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
