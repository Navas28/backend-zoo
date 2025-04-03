const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

//  Middleware

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json()); 
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));

//  Mongo Db connection

mongoose
    .connect(process.env.MONGODB_URI, {
        dbName: "WildAnimals", 
    })
    .then(() => console.log("Mongo Db Connected"))
    .catch((err) => console.error("Mongo Db Connection Error", err));


//   Ticket Booking

const ticketBookingRoutes = require("../../routes/ticketBooking")
app.use("/ticketbooking", ticketBookingRoutes)


//    Contact Form 

const contactRoutes = require("../../routes/contact")
app.use("/contact", contactRoutes)

//     Red List

const animalRoutes = require("../../routes/animals")
app.use("/animals", animalRoutes)

//    Eco Journel

const blogRoutes = require("../../routes/blog")
app.use("/blogs", blogRoutes)

//     Volunteer Application

const jobApplicationRoutes = require("../../routes/jobApplication")
app.use("/job-apply", jobApplicationRoutes)

//  Event Booking

const eventRegistrationRoutes = require("../../routes/eventRegister")
app.use("/event-register", eventRegistrationRoutes)

//   Donation 

const donationRoutes = require("../../routes/donation")
app.use("/donate", donationRoutes)

//  Email Subscription

const subscriptionRoutes = require("../../routes/subscription")
app.use("/subscribe", subscriptionRoutes)

// for Unknown Routes

app.use((req, res, next) => {
    res.status(404).json({ success: false, message: "Route not found" });
});


app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});

