const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch(err => console.log("❌ MongoDB Connection Failed:", err));

// Schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

const User = mongoose.model('User', UserSchema);

/**
 * =========================================
 * ✅ GET API (Fetch All Users)
 * =========================================
 */
app.get('/users', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

/**
 * =========================================
 * ✅ POST API (Create New User)
 * =========================================
 */
app.post('/users', async (req, res) => {
    const { name, email, age } = req.body;
    const newUser = new User({ name, email, age });
    await newUser.save();
    res.status(201).json(newUser);
});

/**
 * =========================================
 * ✅ PUT API (Update User by ID)
 * =========================================
 */
app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;

    // Find user by ID and update
    const updatedUser = await User.findByIdAndUpdate(
        id,
        { name, email, age },
        { new: true } // Return updated document
    );

    if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
});

/**
 * =========================================
 * ✅ DELETE API (Delete User by ID)
 * =========================================
 */
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
});

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
