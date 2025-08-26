const express = require('express');
const { PrismaClient, UserStatus, UserRole } = require('@prisma/client');
const authGuard = require('../middlewares/authGuard'); 
const router = express.Router();
const prisma = new PrismaClient();

router.get("/", authGuard, async (req: any, res: any) => {
    try {
    const users = await prisma.user.findMany({
        select: {
        id: true,
        name: true,
        email: true,
        lastLogin: true,
        role: true,
        status: true,
        },
        orderBy: { lastLogin: 'desc' },
    });
    res.json(users);
    } catch (error) {
    res.status(500).json({ error: "Could not fetch users" });
    }
});

router.patch("/:userId/block", authGuard, async (req: any, res: any) => {
    try {
        const { userId } = req.params;
        const user = await prisma.user.findUnique({ 
            where: { id: parseInt(userId) } 
        });
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        await prisma.user.update({
            where: { id: parseInt(userId) },
            data: { status: UserStatus.blocked }
        });
        
        res.json({ message: "User blocked successfully" });
    } catch (error) {
        console.error("Error blocking user:", error);
        res.status(500).json({ error: "Could not block user" });
    }
});

router.patch("/:userId/unblock", authGuard, async (req: any, res: any) => {
    try {
        const { userId } = req.params;
        
        const user = await prisma.user.findUnique({ 
            where: { id: parseInt(userId) } 
        });
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        await prisma.user.update({
            where: { id: parseInt(userId) },
            data: { status: UserStatus.active }
        });
        
        res.json({ message: "User unblocked successfully" });
    } catch (error) {
        console.error("Error unblocking user:", error);
        res.status(500).json({ error: "Could not unblock user" });
    }
});

router.delete("/:userId", authGuard, async (req: any, res: any) => {
    try {
        const { userId } = req.params;
        
        const user = await prisma.user.findUnique({ 
            where: { id: parseInt(userId) } 
        });
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        await prisma.user.delete({
            where: { id: parseInt(userId) }
        });
        
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Could not delete user" });
    }
});

router.patch("/:userId/admin", authGuard, async (req: any, res: any) => {
    try {
        const { userId } = req.params;

        await prisma.user.update({
            where: {id: parseInt(userId)},
            data: {role: UserRole.admin}
        })

        res.json("User's role was changed to admin succesfully")
    } catch (error) {
        console.error("Error assigning admin role:", error)
        res.status(500).json({ error: "Could not assign admin role" });
    }
})

router.patch("/:userId/user", authGuard, async (req: any, res: any) => {
    try {
        const { userId } = req.params;

        await prisma.user.update({
            where: {id: parseInt(userId)},
            data: {role: UserRole.user}
        })

        res.json("User's role was changed to user succesfully")
    } catch (error) {
        console.error("Error assigning userr role:", error)
        res.status(500).json({ error: "Could not assign user role" });
    }
})

module.exports = router;