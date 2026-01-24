import express from "express";
import Order from "../models/order.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Fetch Orders Error:", err);
    res.status(500).json({
      message: "Error fetching orders",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const newOrder = new Order({
      customerName: req.body.customerName,
      items: req.body.items,
      total: req.body.total,
      paymentMethod: req.body.paymentMethod,
      status: req.body.status || "pending",
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("Create Order Error:", err);
    res.status(400).json({
      message: "Error saving order",
    });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(updatedOrder);
  } catch (err) {
    console.error("Update Status Error:", err);
    res.status(400).json({
      message: "Update failed",
    });
  }
});

export default router;
