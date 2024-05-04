import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants.js";

export function authMiddleware(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).send({ error: true, message: "Token not recieved" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send({ error: true, message: "Invalid token" });
    }

    req.email = user.email;
    req.userId = user.userId;
    next();
  });
}
