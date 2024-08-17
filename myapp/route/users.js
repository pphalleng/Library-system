const userRoutes = require("express").Router();
const userController = require("../controller/userController");
const authMiddleWare = require("../middleWare/authMiddleware");

userRoutes.post("/login", userController.login)
userRoutes.get("/profile", authMiddleWare, userController.getMyProfile)

userRoutes.post("/users", userController.createNewUser)
userRoutes.delete("/users/:id", userController.deleteUserById)

userRoutes.patch("/users/:id/updatePassword", userController.updatePassword)


module.exports = userRoutes;