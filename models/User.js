import mongoose from "mongoose";

const { Schema, model } = mongoose;

function checkName(value) {
    if (value.length < 5)
        return false;

    return true;
}

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: checkName,
            message: props => `${props.value} is not a valid name`
        }
    },
    first_name: String,
    email: String,
    date: {
        type: Date,
        default: Date.now()
    }
});


export default model("User", userSchema);