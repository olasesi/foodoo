import express from "express";
import {
  getUser,
  getUsers,
  deleteUser,
  updateUser,
} from "../controllers/user.js";
import {
  verifyToken,
  verifyUser,
  verifyAdmin,
} from "../utility/verifyToken.js";

const router = express.Router();

router.get("/checkauthentication", verifyToken, (req, res, next) => {
  res.send("Hello user, you are now logged in");
});

router.get("/checkuser/:id", verifyUser, (req, res, next) => {
  res.send("Hello user, you are logged in and can delete your account");
});

router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
  res.send("Hello admin, you are logged in and can delete all accounts");
});

router.get("/", verifyAdmin, getUsers);

router.get("/:id", verifyUser, getUser);

router.patch("/:id", verifyUser, updateUser);

router.delete("/:id", verifyUser, deleteUser);

export default router;
