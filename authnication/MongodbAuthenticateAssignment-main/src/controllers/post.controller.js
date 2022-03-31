
const express = require("express");

const router = express.Router();

const Post1 = require("../models/post.model");

const authenticate = require("../middlewares/authenticate");

router.post("", authenticate, async(req,res) =>
{
    try
    {
        const Post = await Post1.create(req.body);

        return res.status(201).send({Post : Post});
    }
    catch(error)
    {
        return res.status(500).send({message : error.message});
    }
});

router.get("", async(req,res) =>
{
    try
    {
        const Post = await Post1.find();

        return res.status(200).send({Post : Post});
    }
    catch(error)
    {
        return res.status(500).send({message : error.message});
    }
})

router.patch("/:id", authenticate, async(req,res) =>
{
    try
    {
        const Post = await Post1.findByIdAndUpdate(req.params.id, req.body, {new : true});

        return res.status(201).send({Post : Post});
    }
    catch(error)
    {
        return res.status(500).send({message : error.message});
    }
});

router.delete("/:id", authenticate, async(req,res) =>
{
    try
    {
        const Post = await Post1.findByIdAndDelete(req.params.id);

        return res.status(202).send({Post : Post});
    }
    catch(error)
    {
        return res.status(500).send({message : error.message});
    }
})


module.exports = router;