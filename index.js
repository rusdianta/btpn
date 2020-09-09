const express = require("express");
const bodyParser = require("body-parser");
//const cookieParser = require("cookie-parser");
//const cookieSession = require("cookie-session");

const env = require("./common/env");
const { routes } = require("./routes");

const app = express();
const port = env.get("LISTEN_PORT");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(cookieParser);

// set up the cookie for the session
/*app.use(cookieSession({
  name: 'session',                              // name of the cookie
  secret: 'MAKE_THIS_SECRET_SECURE',            // key to encode session
  maxAge: 24 * 60 * 60 * 1000,                  // cookie's lifespan
  sameSite: 'lax',                              // controls when cookies are sent
  path: '/',                                    // explicitly set this for security purposes
  secure: process.env.NODE_ENV === 'production',// cookie only sent on HTTPS
  httpOnly: true                                // cookie is not available to JavaScript (client)
}));*/

app.use(routes);
app.use((req, res) => { res.sendStatus(404); });

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});

module.exports = app;