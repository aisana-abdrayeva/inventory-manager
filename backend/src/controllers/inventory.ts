const express = require('express');
const { PrismaClient, UserStatus, UserRole } = require('@prisma/client');
const authGuard = require('../middlewares/authGuard'); 
const router = express.Router();
const prisma = new PrismaClient();

router.get("/", authGuard, async (req, res) => {
    try {
        const inventories = await prisma.inventory.findMany({
            where: {
                id: true,
                title: true,
                description: true,
                category: true,
                tags: true,
                ownerId: true,
                public: true,
                imageUrl: true,
            },
            orderBy: { createdAt: 'desc' },
        });
        res.json(inventories);
    } catch (error) {
        console.error("Error fetching inventories:", error);
        res.status(500).json({ error: "Could not fetch inventories" });
    }
});

router.get("/:inventoryId", authGuard, async (req, res) => {
    try {
        const { inventoryId } = req.params;
        const inventory = await prisma.inventory.findUnique({
            where: { id: parseInt(inventoryId) }
        });
        res.json(inventory);
    } catch (error) {
        console.error("Error fetching inventory:", error);
        res.status(500).json({ error: "Could not fetch inventory" });
    }
});

router.post("/", authGuard, async (req, res) => {
    try {
        const { title, description, category, tags, ownerId, public: isPublic, imageUrl } = req.body;
        const inventory = await prisma.inventory.create({
            data: {
                title,
                description,
                category,
                tags,
                ownerId,
                public: isPublic,
                imageUrl: imageUrl,
            }
        });
        res.json(inventory);
    } catch (error) {
        console.error("Error creating inventory:", error);
        res.status(500).json({ error: "Could not create inventory" });
    }
});

module.exports = router;