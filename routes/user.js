import { Router } from "express";
import * as userController from "../controllers/user.js";

const userRoutes = Router();

userRoutes
    .route("/")
    .get(userController.findAll)
    .post(userController.create)

userRoutes.get("/:id/get-coworker", userController.getCoworker)
userRoutes.get("/find-by-name/:name", userController.getByName)

userRoutes
    .route("/:id")
    .get(userController.findById)
    .put(userController.update)
    .delete(userController.deleteOne)



export default userRoutes;