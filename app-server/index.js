require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");

mongoose.connect(config.connectionString);

const User = require("./models/user.model");
const express = require("express");
const cors = require ("cors");
const app = express();

const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities")

app.use(express.json());

app.use(
    cors ({
        origin: "*",
    })
);

app.get("/", (req, res) => {
    res.json({data: "hello"});
});

//Create Account
app.post("/signup", async(req, res) => {
    const { fullName, username, email, password } = req.body;

    if (!fullName) {
        return res.status(400).json({error: true, message: "Full Name is required"});
    }
    if (!username) {
        return res.status(400).json({error: true, message: "Username is required"});
    }
    if (!email) {
        return res.status(400).json({error: true, message: "Email is required"});
    }
    if (!password) {
        return res.status(400).json({error: true, message: "Password is required"});
    }

    const isEmail = await User.findOne({email: email});
    const isUser = await User.findOne({username: username});

    if (isUser) {
        return res.json({
            error: true,
            message: "Username already taken",
        });
    }

    if (isEmail) {
        return res.json({
            error: true,
            messsage: "An account already exists with this email address",
        })
    }

    const user = new User({
        fullName,
        username,
        email,
        password,
    });
    
    await user.save();
});

app.listen(3002);

module.exports = app;