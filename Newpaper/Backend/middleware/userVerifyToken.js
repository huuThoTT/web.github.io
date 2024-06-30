const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  //ACCESS TOKEN FROM HEADER, REFRESH TOKEN FROM COOKIE
  const token = req.headers.token;
  if (token) {
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, async (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }
      req.user = user;

      // Fetch user from database to get the role
      const foundUser = await User.findById(user._id);
      if (foundUser) {
        req.user.role = foundUser.role;
      }

      next();
    });
  } else {
    req.user = { role: 'guest' }; // Nếu không có token, coi như là guest
    next();
  }
};

const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

const verifyTokenAndUserAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json("You're not allowed to do that!");
    }
  });
};
  
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json("You're not allowed to do that!");
    }
  });
};
  
  module.exports = {
    verifyToken,
    authorize,
    verifyTokenAndUserAuthorization,
    verifyTokenAndAdmin,
  };
