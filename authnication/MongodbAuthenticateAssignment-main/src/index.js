
const express = require("express");

const app = express();

app.use(express.json());

const { body, validationResult} = require("express-validator");

const UserController = require("./controllers/user.controller");

const {register, login, GenerateToken} = require("./controllers/auth.controller");

const PostController = require("./controllers/post.controller");

const User1 = require("./models/user.model");

app.use("/users", UserController);

app.post("/register",
body("firstName").trim().not().isEmpty().withMessage("First Name cannot be Empty").isLength({min : 4}).withMessage("First Name must be atleast four characters"),
body("email").isEmail().custom( async(value) =>
{
    console.log('value:', value)
    const User = await User1.findOne({email : value});

    if(User)
    {
        throw new Error("Email is already taken");
    }

    return true;
}),
body("password").not().isEmpty().withMessage("Password must be required").custom( async(value) =>
{
    const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7,15}$/;

    if(!value.match(passw))
    {
        throw new Error("Password must be strong");
    }
    return true;
}),
body("lastName").custom( async(value) =>
{
    if(value && value.length < 4)
    {
        throw new Error("Last Name if provided must be at least 4 characters");
    }

    return true;
}),
register);

let UserDetails;
app.post("/login",
body("email").isEmail().custom( async(value) =>
{
    console.log('value:', value)
    const User = await User1.findOne({email : value});
    
    if(!User)
    {
        throw new Error("Wrong1 Email or Password");
    }
    
    UserDetails = await User1.findOne({email : value});
    
    // console.log('User1:', User)
    return true;
}),
body("password").not().isEmpty().withMessage("Password must be required").custom( async(value) =>
{
    // let Password = value;
    // console.log('Password1:', Password)
    // let User;
    // body("email").isEmail().custom( async(value) =>
    // {
    //     User = await User1.findOne({email : value});
    //     console.log('User2:', User);
        
    //     if(!User)
    //     {
    //         throw new Error("Wrong Email or Password");
    //     }
    // })
    // console.log('User2:', User);
    // console.log('value1:', value)
    // if(User.password != value)
    // {

    //     throw new Error("Wrong Email or Password");
    // }
    // const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7,15}$/;

    // if(!value.match(passw))
    // {
    //     throw new Error("Password must be strong");
    // }
    // return true;
}).custom( async(value, {req}) =>
{

    const match = UserDetails.checkPassword(req.body.password);
    console.log('req.body.password:', req.body.password)
    console.log('match:', match)

    if(!match)
    {
        throw new Error("Wrong Email or Password");
    }

    return true;
}),
login);

app.use("/posts", PostController);

module.exports = app;