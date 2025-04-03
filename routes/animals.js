const express = require("express");
const router = express.Router();
const Animal = require("../models/AnimalSchema");

router.get("/", async (req, res) => {
    try {
        const animals = await Animal.find();
        res.json(animals);
    } catch (err) {
        console.error("Error Fetching Animals");
        res.status(500).json({ error: err.message });
    }
});

//     Fetch single animal by ID

router.get("/:id", async (req, res) => {
    try {
        const animal = await Animal.findById(req.params.id);
        if (!animal) {
            return res.status(404).json({ message: "Animal Not Found" });
        }
        res.json(animal);
    } catch (err) {
        console.error("Error Fetching Animal", err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
