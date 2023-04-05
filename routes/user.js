import { Router } from "express";
import * as userController from "../controllers/user.js";

const userRoutes = Router();

userRoutes
    .route("/")
    .get(userController.findAll)
    .post(userController.create)

userRoutes
    .get("/find-by-name/:name", userController.getByName)

userRoutes
    .route("/:id")
    .put(userController.update)
    .delete(userController.deleteOne)

export default userRoutes;