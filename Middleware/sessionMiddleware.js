/* const session = require('express-session');
const MongoStore = require('connect-mongo');
const crypto = require('crypto');


const sessionSecret = crypto.randomBytes(64).toString('hex');
console.log(sessionSecret);

const sessionMiddleware = session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_DB_URL }),
    cookie: { sameSite: 'lax', secure: process.env.NODE_ENV === 'production' , maxAge: 24 * 60 * 60 * 1000 }
});

app.use((err, req, res, next) => {
    console.error("Error in session middleware:", err);
    res.status(500).send({
        statusCode: 500,
        message: "Internal Server Error"
    });
});

app.use(sessionMiddleware);
 */
