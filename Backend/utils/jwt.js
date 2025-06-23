const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "yourSecretKey";

/**
 * Generate a JWT for a user.
 * @param {Object} user - User object, requires _id and role.
 * @returns {String} JWT token.
 */
function generateToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, SECRET, { expiresIn: "1d" });
}

/**
 * Express middleware to verify JWT token and attach user to req.
 */
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("No token provided");
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).send("Invalid token");
  }
}

/**
 * Express middleware to require a specific user role.
 * @param {String} role - Required user role (e.g. 'admin', 'ngo').
 */
function requireRole(role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) return res.status(403).send("Forbidden");
    next();
  };
}

module.exports = { generateToken, verifyToken, requireRole };