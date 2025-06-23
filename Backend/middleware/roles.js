/**
 * Middleware for role-based access control.
 * Usage: authorizeRoles('admin', 'ngo', ...)
 * Only allows access if req.user.role matches one of the allowed roles.
 */
exports.authorizeRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};