const jwt = require("jsonwebtoken");

const authGuard = (req: any, res: any, next: any) => {
    console.log("🔐 [AUTH GUARD] Request received:", {
        method: req.method,
        path: req.path,
        headers: req.headers,
        cookies: req.cookies
    });

    const token = req.cookies.accessToken;
    console.log("🔐 [AUTH GUARD] Token from cookies:", token ? "Present" : "Missing");
    
    if (!token) {
        console.log("❌ [AUTH GUARD] No token found, returning 401");
        return res.status(401).json({ error: "Not authenticated" });
    }
    
    try {
        console.log("🔐 [AUTH GUARD] Verifying token...");
        req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log("✅ [AUTH GUARD] Token verified successfully:", {
            userId: req.user.userId,
            iat: req.user.iat,
            exp: req.user.exp
        });
        next();
    } catch (err: any) {
        console.log("❌ [AUTH GUARD] Token verification failed:", err.message);
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};

module.exports = authGuard;