const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv');
// const session = require('express-session');
// const passport = require('passport');

dotenv.config();

const app = express();
// app.use(cors({
//     origin: ['https://inventory-manager-production-7ab5.up.railway.app', 'http://localhost:5173'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true,
//     maxAge: 0,
//   }));

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
// }));

// app.use(passport.initialize());
// app.use(passport.session());

app.use("/api/auth", require("./routes/auth")); 
// app.use("/api/social-auth", require("./routes/socialAuth"));
app.use("/api/users", require("./routes/users")); 

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});