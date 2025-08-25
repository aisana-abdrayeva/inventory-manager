const express = require('express');
const { PrismaClient, UserStatus, UserRole } = require('@prisma/client');
const authGuard = require('../middlewares/authGuard'); 
const router = express.Router();
const prisma = new PrismaClient();

router.get("/", authGuard, async (req, res) => {
    try {
        const items = await prisma.inventoryItem.findMany({
            where: {
                inventoryId: req.params.inventoryId,
            },
        });
        res.json(items);
    } catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).json({ error: "Could not fetch items" });
    }
});

router.get("/:id", authGuard, async (req, res) => {
    try {
        const item = await prisma.inventoryItem.findUnique({
            where: { id: req.params.id },
        });
        res.json(item);
    } catch (error) {
        console.error("Error fetching item:", error);
        res.status(500).json({ error: "Could not fetch item" });
    }
});

router.post("/", authGuard, async (req, res) => {
    try {
        const { inventoryId, customId, createdById } = req.body;
        const item = await prisma.inventoryItem.create({
            data: {
                inventoryId,
                customId,
                createdById,
            }
        })
        res.json(item);
    } catch (error) {
        console.error("Error creating item:", error);
        res.status(500).json({ error: "Could not create item" });
    }
});

router.put("/:id", authGuard, async (req, res) => {
    try {
        const { inventoryId, customId, createdById } = req.body;
        const item = await prisma.inventoryItem.update({
            where: { id: req.params.id },
            data: {
                inventoryId,
                customId,
                createdById,
            }
        })
        res.json(item);
    } catch (error) {
        console.error("Error updating item:", error);
        res.status(500).json({ error: "Could not update item" });
    }
});

router.delete("/:id", authGuard, async (req, res) => {
    try {
        const item = await prisma.inventoryItem.delete({
            where: { id: req.params.id },
        })
        res.json(item);
    } catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).json({ error: "Could not delete item" });
    }
});

module.exports = router;