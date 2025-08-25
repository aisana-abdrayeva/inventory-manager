const express = require('express');
const { PrismaClient, UserStatus, UserRole } = require('@prisma/client');
const authGuard = require('../middlewares/authGuard'); 
const router = express.Router();
const prisma = new PrismaClient();

router.get("/inventories/", authGuard, async (req, res) => {
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
