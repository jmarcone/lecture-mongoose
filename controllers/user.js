import User from "../models/User.js";
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

export const getByName = asyncHandler(async (req, res) => {
    const { params: { name } } = req;

    // const user = await User.findOne(
    //     {
    //         $or: [
    //             { name: new RegExp(name, "i") },
    //             { first_name: new RegExp(name, "i") },
    //         ]
    //     }
    // );


    const users = await User
        .where("age")
        .gt(10)
        .select("name age")
        .limit(1)

    users[0].age = 80;

    users[0].save();

    console.log(users);

    // if (users.length === 0)
    //     throw new Error("no user matching the provided name")

    res.json(users);
});
export const update = asyncHandler(async (req, res) => {
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
})

export const deleteOne = asyncHandler(async (req, res) => {
    const { params: { id } } = req;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser)
        throw new Error("couldn't find user to be deleted");

    res.json(deletedUser);

})

export const findById = asyncHandler(async (req, res) => {
    const { params: { id } } = req;
    const user = await User.findById(id);

    if (!user)
        throw new Error("couldn't find user");

    user.isUnderAge();

    // user.populate("coworker")

    res.json(user);

})