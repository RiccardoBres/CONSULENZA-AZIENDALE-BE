// UserRoutes.js
const express = require('express');
const mongoose = require("mongoose");
const UserModel = require('../Models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const passport = require('passport');
const router = express.Router();

// routes/auth.js

router.post("/user/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                statusCode: 400,
                message: "Email already exists",
            });
        }
        const newUser = new UserModel({ username, email });
        await newUser.setPassword(password);
        await newUser.save();
        res.status(201).json({
            statusCode: 201,
            message: "User successfully registered",
            userId: newUser._id,
        });
    } catch (error) {
        console.error("Error during user registration:", error);
        res.status(500).json({
            statusCode: 500,
            message: "Internal server error",
            error: error.message,
        });
    }
});

router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        try {
            if (err) {
                console.error("Error during authentication:", err);
                throw new Error("Internal server error");
            }
            if (!user) {
                console.error("Authentication failed:", info.message);
                throw new Error("Authentication failed");
            }
            req.login(user, (err) => {
                if (err) {
                    console.error("Error during login:", err);
                    throw new Error("Internal server error");
                }
                const authToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                    expiresIn: "1h",
                });
                res.status(200).json({
                    statusCode: 200,
                    message: "Login successful",
                    userId: user._id,
                    token: authToken,
                });
            });
        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).json({
                statusCode: 500,
                message: "Internal server error",
                error: error.message,
            });
        }
    })(req, res, next);
});

router.post("/logout", (req, res) => {
    try {
        req.logout(function(err) {
            if (err) {
                console.error("Error during logout:", err);
                res.status(500).json({
                    statusCode: 500,
                    message: "Internal server error",
                    error: err.message,
                });
            } else {
                res.status(200).json({
                    statusCode: 200,
                    message: "Logout successful",
                });
            }
        });
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({
            statusCode: 500,
            message: "Internal server error",
            error: error.message,
        });
    }
});

module.exports = router;

