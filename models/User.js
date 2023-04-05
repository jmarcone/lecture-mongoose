import mongoose from "mongoose";
import addressSchema from "./Address.js";
const { Schema, model } = mongoose;

function checkName(value) {
    if (value === "forbidenName")
        return false;

    return true;
}

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        //this is how you create custom validations
        validate: {
            validator: checkName,
            message: props => `${props.value} is not a valid name`
        }
    },
    age: {
        type: Number,
        min: 18,
        max: 65
    },
    first_name: {
        type: String,
        minLength: 5,
        maxLength: 50,
        required: true,
        uppercase: true
    },
    email: {
        type: String,
        lowercase: true
    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    },
    coworker: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    languages: [String]
});

//this add methods to every document instance
userSchema.methods.isUnderAge = function () {
    console.log(this.age < 18)
}

//this will be available statically in  the model
userSchema.statics.findUnderaged = function () {
    return this.find()
}

//this will be available statically in  the model
userSchema.statics.findByName = function (name) {
    return this.find({ name: new RegExp(name, 'i') });
};

//this will be available in the "query builder"
userSchema.query.byName = function (name) {
    return this.where({ name: RegExp(name, "i") })
}

//this will are "fake" prperties that you can access in every instance but are not projected into the DB
userSchema.virtual('fullName').get(function () {
    return `my name is  ${this.name} or ${this.first_name}`
})

//this is a middleware that will run before the "save" event
userSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
})

//this is a middleware that will set options before running findByIdAndUpdate
userSchema.pre("findByIdAndUpdate", function (next) {
    this.options.runValidators = true;
    next();
})

//this will run after the "save" event and the document saved is available for reading
userSchema.post("save", function(doc, next){
    console.log("I saved", doc);
})

export default model("User", userSchema);