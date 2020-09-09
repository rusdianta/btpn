const jwt = require("jsonwebtoken");

const secret = "7sakasfjfy892wfk";

const getSecretKey = () => {
  return secret;
}

const checkAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    
    jwt.verify(token, getSecretKey(), (err, user) => {
        if (err) return res.sendStatus(400);
        console.log("Authorized : ");
        console.log(user);
        res.user = user;
        next();
    });

  } else res.sendStatus(401);
}

module.exports = {
  getSecretKey,  
  checkAuth
}