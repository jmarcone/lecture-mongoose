import User from "../models/User.js";
import APIError from "../utils/APIError.js";
import asyncHandler from "../utils/AsyncHandler.js";

export const findAll = async (req, res) => {
    const users = await User.find();

    res.json(users);
}

export const create = asyncHandler(async (req, res) => {
    const { body: { name, first_name, email, age, coworker } } = req;

    const newUser = {
        name: name,
        first_name: first_name,
        email: email,
        age: age,
        coworker: coworker
    }

    const user = await User.create(newUser);

    res
        .status(201)
        .json(user);
});

export const findByName = asyncHandler(async (req, res) => {
    const { params: { name } } = req;

    // 2 different ways of finding your users
    const users = await User.find(
        {
            $or: [
                { name: new RegExp(name, "i") },
                { first_name: new RegExp(name, "i") },
            ]
        }
    );

    res.json(users);
});

export const findOneByName = asyncHandler(async (req, res) => {
    const { params: { name } } = req;

    // 2 different ways of finding your users
    const user = await User
        .findOne()
        .or([
            { name: new RegExp(name, "i") },
            { first_name: new RegExp(name, "i") }
        ])

    if (!user)
        throw new APIError("user not found", 404);

    res.json(user);
});

export const update = asyncHandler(async (req, res) => {
    const { params: { id }, body } = req;

    const user = await User.findByIdAndUpdate(
        id,
        { $set: body },
        { returnOriginal: false }
    )

    res.json(user);
})

export const deleteOne = asyncHandler(async (req, res) => {
    const { params: { id } } = req;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser)
        throw new APIError("user not found", 404);

    res.json(deletedUser);

})

export const findById = asyncHandler(async (req, res) => {
    const { params: { id } } = req;

    const user = await User.findById(id)

    if (!user)
        APIError("user not found", 404);

    if (user.isUnderAge())
        throw new Error("user is underage");

    res.json(user);
})

export const getCoworker = asyncHandler(async (req, res) => {
    const { params: { id } } = req;

    const user = await User.findById(id).populate("coworker");

    if (!user)
        throw new APIError("user not found", 404);

    res.json(user?.coworker);
})