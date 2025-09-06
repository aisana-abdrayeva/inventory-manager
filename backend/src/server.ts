import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';

dotenv.config();

const app = express();
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
// }));

// app.use(passport.initialize());
// app.use(passport.session());

app.use("/auth", require("./routes/auth")); 
app.use("/social-auth", require("./routes/socialAuth"));
app.use("/users", require("./routes/users")); 

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});