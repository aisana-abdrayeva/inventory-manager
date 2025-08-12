const jwt = require("jsonwebtoken");

exports.authGuard = (req: any, res: any, next: any) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ error: "Not authenticated" });
    try {
        req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};