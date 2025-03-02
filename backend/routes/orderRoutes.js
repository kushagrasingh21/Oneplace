const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Order = require("../models/Order");

const router = express.Router();

// Create an Order
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { products, totalPrice } = req.body;
        const order = new Order({
            user: req.user.userId,
            products,
            totalPrice
        });

        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Get User's Orders
router.get("/", authMiddleware, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.userId }).populate("products.product");
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
