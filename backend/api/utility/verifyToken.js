import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated"));
  }

  jwt.verify(token, process.env.KEY, (err, user) => {
    if (err) {
      return next(createError(403, "invalid token"));
    }
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  //Not too comfortable using this only req.user.id === req.params.id || req.user.isAdmin
  //To me, req.user.isAdmin does not do anything here. A user with his valid id will go through weather he is admin or not
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin === req.params.id) {
      next();
    } else {
      return next(createError(403, "You are not the Admin"));
    }
  });
};
