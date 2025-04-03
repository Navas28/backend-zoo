const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
require("dotenv").config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/payment", async (req, res) => {
    const { bookingType } = req.body;

    const bookings = {
        standard: 200 * 100,
        premium: 500 * 100,
        vip: 800 * 100,
        deluxe: 1000 * 100,
    };

    if (!bookings[bookingType]) {
        return res.status(400).json({ error: "Invalid Booking Type" });
    }
    try {
        const product = await stripe.products.create({
            name: bookingType.toUpperCase(),
        });
        const price = await stripe.prices.create({
            product: product.id,
            unit_amount: bookings[bookingType],
            currency: "inr",
        });

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: price.id,
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel",
        });
        res.json(session);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
