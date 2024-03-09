// server.js

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
const corsOptions = {
    origin: 'https://consulwise.onrender.com',
    credentials: true,
};

require("dotenv").config();

const app = express();
app.use(cors(corsOptions));
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

db.on("error", console.error.bind( "errore connessione al server"));
db.once("open", () => { console.log("database mongodb connesso") });

app.listen(PORT, () =>
    console.log(`server avviato e in ascolto sulla porta ${PORT}`)
);
