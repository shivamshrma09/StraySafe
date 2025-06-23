let userLastReport = {};

/**
 * Middleware to rate limit report submissions per IP address.
 * Allows only one report per 2 minutes per IP.
 */
function rateLimit(req, res, next) {
  const ip = req.ip;
  const now = Date.now();
  if (userLastReport[ip] && now - userLastReport[ip] < 2 * 60 * 1000) {
    return res.status(429).send("You can only submit one report every 2 minutes.");
  }
  userLastReport[ip] = now;
  next();
}

module.exports = rateLimit;