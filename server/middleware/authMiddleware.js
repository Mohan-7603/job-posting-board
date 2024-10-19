const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; 

  console.log("Received token:", token); 

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.userId = decoded.id; 
    console.log("User ID from token:", req.userId); 
    next(); 
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: 'Invalid token' }); 
  }
};

module.exports = authMiddleware;
