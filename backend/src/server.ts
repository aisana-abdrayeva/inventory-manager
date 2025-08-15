const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');

dotenv.config();

const app = express();

// Debug middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

app.use(cors(
    {
        origin: [process.env.FRONTEND_URL || "https://inventory-manager-production-7ab5.up.railway.app"],
        credentials: true,
    }
));

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

// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
});

app.use("/api/auth", require("./routes/auth")); 
// app.use("/api/social-auth", require("./routes/socialAuth"));
app.use("/api/users", require("./routes/users")); 

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});