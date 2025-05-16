import addUser from "../controllers/addUser";
import deleteAllUsers from "../controllers/deleteAllusers";
import deleteUserById from "../controllers/deleteUserbyId";
import getuserById from "../controllers/getuserById";
import loadData from "../controllers/loadUsersDetails";

const express = require("express");
const router = express.Router();
console.log("users loaded");

router.get("/load", loadData);
router.get("/users/:userId", getuserById);
router.delete("/users/:userId", deleteUserById);
router.delete("/users", deleteAllUsers);
router.put("/users/", addUser);
module.exports = router;
