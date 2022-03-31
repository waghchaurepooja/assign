
require("dotenv").config();

const jwt = require("jsonwebtoken");
const verifyToken = (token) =>
{
    return new Promise((resolve, reject) =>
    {
        var decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) =>
        {
            if(error)
            {
                return reject(error);
            }
            return resolve(decoded);
        })
    })
}
const authenticate = async(req,res,next) =>
{
    // console.log('req.headers.authorization:', req.headers.authorization)
    if(!req.headers.authorization)
    {
        return res.status(500).send({message : "Authorization token not found or incorrect"});
    }
    var value = req.headers.authorization.startsWith("Bearer")
    // console.log('value:', value)
    if(!req.headers.authorization.startsWith("Bearer"))
    {
        return res.status(500).send({message : "Authorization token not found or incorrect"})
    }

    const token = req.headers.authorization.trim().split(" ")[1];
    // console.log('token:', token)
    // console.log('req.headers.authorization.trim().split(" ")[1]:', req.headers.authorization.trim().split(" ")[1])


    let decoded;
    try
    {
        decoded = await verifyToken(token);
    }
    catch(error)
    {
        return res.status(500).send({message : "Authorization token not found or incorrect"});
    }

    // console.log('decoded:', decoded)
    // console.log('decoded:', decoded.User);
    // console.log('decoded:', decoded.User._id);

    req.User2 = decoded.User;
    // console.log('req.User2:', req.User2)
    
    
    return next();
}

module.exports = authenticate;