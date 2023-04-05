import mongoose from "mongoose";

const { Schema, model } = mongoose;

const addressSchema = new Schema({
    street: String,
    number: Number,
    city: String
})


export default addressSchema;