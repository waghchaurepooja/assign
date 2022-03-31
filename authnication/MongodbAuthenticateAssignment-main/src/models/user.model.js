
const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    firstName : {type : String, required : true},
    lastName : {type : String, required : false},
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true}
},
{
    timestamps : true,
    versionKey : false,
});

UserSchema.pre("save", function(next)
{
    const hash = bcrypt.hashSync(this.password, 8);

    this.password = hash;

    return next();
})

UserSchema.methods.checkPassword = function(password)
{
    return bcrypt.compareSync(password, this.password);
}

const User1 = mongoose.model("user", UserSchema);

module.exports = User1;