import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import path from 'path';

dotenv.config();

const app = express();
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));
console.log(path.join(__dirname, 'dist'));

// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist', 'index.html'))
// })
console.log("🚀 [SERVER] Registering routes...");
app.use("/auth", require("./routes/auth"));
console.log("✅ [SERVER] Auth routes registered at /auth");
app.use("/admin", require("./routes/admin"));
console.log("✅ [SERVER] Admin routes registered at /admin");
// app.use("/inventories", require("./controllers/inventory"));
// app.use("/items", require("./controllers/item"));
// app.use("/users", require("./controllers/user"));
// app.use("/social-auth", require("./routes/socialAuth"));

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});