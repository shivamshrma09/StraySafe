const jwt = require("jsonwebtoken");
const SECRET = "yourSecretKey";

function generateToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, SECRET, { expiresIn: "1d" });
}

function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("No token");
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).send("Invalid token");
  }
}

function requireRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) return res.status(403).send("Forbidden");
    next();
  };
}

module.exports = { generateToken, verifyToken, requireRole };