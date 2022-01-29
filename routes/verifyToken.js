const jwt = require(`jsonwebtoken`);

module.exports = function (req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json("Missing auth header");
  const token = authHeader.split(" ")[1];
  if (!token) return res.status(400).json("Missing required token");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json("Unauthorozed");
  }
};
