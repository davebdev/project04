const express = require("express");
const fs = require("fs");
const app = express();
// Dependancies
const db = require('./database/db')
// Express library to handle sessions
const expressSession = require("express-session");

// Store session in DB
const pgSession = require("connect-pg-simple")(expressSession);

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static("./client/build"));

// Controllers
const adminController = require('./controllers/admin');
const emailController = require('./controllers/email');
const guestController = require('./controllers/guest');

// Middleware
app.use((request, response, next) => {
    console.log(`*** Request method: ${request.method} and route: ${request.path} at ${new Date()} ***`)
    next();
});

// Session middleware (using connect-pg-simple and express-session)
app.use(
    expressSession({
        store: new pgSession({
            pool: db,
            createTableIfMissing: true,
        }),
        secret: process.env.EXPRESS_SESSION_SECRET_KEY,
        resave: false,
        saveUninitialized: false
    })
);

// Routing
app.use('/admin', adminController);
app.use('/email', emailController);
app.use('/guest', guestController);

// Used for unspecified routes
app.get("*", (req, res) => {
    res.setHeader("content-type", "text/html");
    fs.createReadStream(`${__dirname}/client/build/index.html`).pipe(res);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}. Go to http://localhost:${port} to view.`);
});