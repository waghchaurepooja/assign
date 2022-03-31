
const express = require("express");

const User1 = require("../models/user.model");

const jwt = require("jsonwebtoken");

const {body , validationResult} = require("express-validator");
// console.log('body:', body)

require("dotenv").config();


const GenerateToken = (User) =>
{
    return jwt.sign({User}, process.env.JWT_SECRET_KEY);
}

const register = async(req,res) =>
{
    try
    {

        const errors = validationResult(req);
        if (!errors.isEmpty()) 
        {
            return res.status(400).json({ errors: errors.array() });
        }

        // let User = await User1.findOne({email : req.body.email});
        // console.log('User:', User)

        // if(User)
        // {
        //     console.log('User1:', User)

        //     return res.status(500).send({message : "Email already exists"});
        // }

        let User = await User1.create(req.body);

        const token = GenerateToken(User);

        return res.status(200).send({User : User, token : token});
    }
    catch(error)
    {
        return res.status(500).send({message : error.message});
    }
};

const login = async(req,res) =>
{
    try
    {
        const errors = validationResult(req);
        if (!errors.isEmpty()) 
        {
            return res.status(400).json({ errors: errors.array() });
        }

        const User = await User1.findOne({email : req.body.email});

        // if(!User)
        // {
        //     return res.status(500).send("Wrong Email or Password");
        // }


        const match = User.checkPassword(req.body.password);
        
        // if(!match)
        // {
        //     return res.status(500).send({message : "Wrong Email or Password"});
        // }
        
        const token = GenerateToken(User);


        return res.status(201).send({User : User, token : token});
    }
    catch(error)
    {
        return res.status(500).send({message : error.message});
    }
};

module.exports = {register,login, GenerateToken};