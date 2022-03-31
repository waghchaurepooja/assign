
const mongoose = require("mongoose");

const Connectdb = () =>
{
    return mongoose.connect("mongodb+srv://pooja41180:pooja12345@cluster0.jjbeq.mongodb.net/MongodbAuthenticateAssignment?retryWrites=true&w=majority")
}

module.exports = Connectdb;