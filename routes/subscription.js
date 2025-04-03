const express = require("express");
const router = express.Router();

const Subscriber = require("../models/Subscriber");

router.post("/", async (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });

    try {
        const emailExists = await Subscriber.findOne({ email });
        if (emailExists) {
            return res.status(409).json({ message: "Already subscribed" });
        }
        await Subscriber.create({ email });
        res.status(201).json({ message: "Subscribed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error subscribing" });
    }
});

module.exports = router;
