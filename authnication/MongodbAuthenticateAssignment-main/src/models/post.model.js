
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title : {type : String, required : true},
    body : {type : String, required : true},
    UserId : 
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : false,
    }

},
{
    timestamps : true,
    versionKey : false,
});

const Post1 = mongoose.model("post", PostSchema);

module.exports = Post1;