const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient, UserStatus, UserRole } = require('@prisma/client');
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();
const prisma = new PrismaClient();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

router.post("/register", async (req: any, res: any) => {
    console.log("🔐 [REGISTER] Endpoint hit");
    console.log("🔐 [REGISTER] Request body:", req.body);
    console.log("🔐 [REGISTER] Headers:", req.headers);

    const { name, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    try {
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash,
                status: UserStatus.active,
                role: UserRole.user,
            },
        });

        const accessToken = jwt.sign({ userId: newUser.id }, ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
        console.log("🔐 [REGISTER] Generated access token:", accessToken);

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 60 * 60 * 1000
        });
        console.log("🔐 [REGISTER] Cookie set successfully");

        res.status(201).json({
            accessToken,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                status: newUser.status,
                role: newUser.role,
            }
        });

    } catch (error) {
        const prismaError = error as any;
        if (
            prismaError.code === "P2002" &&
            prismaError.meta?.target?.includes("email")
        ) {
            return res.status(409).json({ error: "User with this email already exists" });
        }

        console.error("❌ [REGISTER] Unexpected error during registration:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/login", async (req: any, res: any) => {
    console.log("🔐 [LOGIN] Endpoint hit");
    console.log("🔐 [LOGIN] Request body:", req.body);
    console.log("🔐 [LOGIN] Headers:", req.headers);
    
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    console.log("🔐 [LOGIN] User lookup result:", user ? "Found" : "Not found");
    
    if (!user || user.status === UserStatus.blocked) {
        console.log("❌ [LOGIN] User not found or blocked:", { 
            userFound: !!user, 
            status: user?.status 
        });
        return res.status(403).json({ error: "User not found or blocked" });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    console.log("🔐 [LOGIN] Password validation:", valid ? "Valid" : "Invalid");
    
    if (!valid) {
        console.log("❌ [LOGIN] Invalid password for user:", email);
        return res.status(401).json({ error: "Invalid password" });
    }

    await prisma.user.update({
        where: { id: user.id },
        data: { lastLogin: new Date() },
    });

    const accessToken = jwt.sign({ userId: user.id }, ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
    console.log("🔐 [LOGIN] Generated access token:", accessToken);

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 60 * 60 * 1000
    });
    console.log("🔐 [LOGIN] Cookie set successfully");

    res.status(200).json({
        accessToken,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            status: user.status
        }
    });
});

module.exports = router;