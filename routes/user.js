import { Router } from "express";
import User from "../models/User.js";
import asyncHandler from "../utils/AsyncHandler.js";


const userRoutes = Router();

userRoutes
    .route("/")
    
    .get(async (req, res) => {
        const users = await User.find({});

        res.json(users);
    })

    .post(asyncHandler(async (req, res) => {
        const { body: { name, first_name, email } } = req;

        const newUser = {
            name: name,
            first_name: first_name,
            email: email
        }

        const user = await User.create(newUser);

        res
            .status(201)
            .json(user);
    }))

userRoutes
    .get("/find-by-name/:name", asyncHandler(async (req, res) => {
        const { params: { name } } = req;

        const users = await User.find(
            {
                $or: [
                    { name: new RegExp(name, "i") },
                    { first_name: new RegExp(name, "i") },
                ]
            }
        );

        console.log(users);

        if (users.length === 0)
            throw new Error("no user matching the provided name")

        res.json(users);
    }))

userRoutes
    .route("/:id")
    .put(asyncHandler(async (req, res) => {
        const { params: { id } } = req;

        const { body: { name, first_name, email } } = req;

        const newUser = {
            name: name,
            first_name: first_name,
            email: email
        }

        const user = await User.findByIdAndUpdate(
            id,
            {
                $set: newUser
            }
        )

        res.json(user);
    }))

    .delete(asyncHandler(async (req, res) => {
        const { params: { id } } = req;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser)
            throw new Error("couldn't find user to be deleted");

        res.json(deletedUser);

    }))



export default userRoutes;