const jwtUtils = require("../utils/jwtUtils");
const authMiddleWare = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({ message: "Bad header" });
  }

  if (!authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Bad Scheme" });
  }

  const [_scheme, _token] = authorization.split(" ");
  const token = req.cookies.token || '';
  if (!token) {
    return res.status(401).send({ message: "Missing token" });
  }
  try {
    const payload = jwtUtils.verifyToken(token);
    const { id } = payload;
    req.userId = id;
    next();
  } catch (error) {
    console.log({error});
    return res.status(401).send({ message: "Invalid token" });
  }
};

module.exports = authMiddleWare;