const express = require('express');
const mongoose = require('mongoose');
const PORT = 9090;
const cors = require('cors');
const session = require('express-session');
const passport = require('./Middleware/passport');
const MongoStore = require('connect-mongo');
const crypto = require('crypto');
const UserRoute = require('./Routes/UserRoutes');
const CompanyRoute = require('./Routes/CompanyRoutes');

require("dotenv").config();

const app = express();
app.use(cors({
    origin: 'https://consultwise.netlify.app',
    credentials: true,
}));
app.use(express.json());

const sessionSecret = crypto.randomBytes(64).toString('hex');
const sessionMiddleware = session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    store: MongoStore.create({ mongoUrl: process.env.MONGO_DB_URL }),
});

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', UserRoute);
app.use('/', CompanyRoute);

mongoose.connect(process.env.MONGO_DB_URL);
const db = mongoose.connection;

// Aggiunta dei log per il debug
db.on("error", err => console.error("Errore durante la connessione al database:", err));
db.once("open", () => console.log("Database MongoDB connesso"));

app.listen(PORT, () =>
    console.log(`Server avviato e in ascolto sulla porta ${PORT}`)
);
