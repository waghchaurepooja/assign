
const app = require("./index");

const Connectdb = require("./configs/db");

app.listen(6800, async() =>
{
    try
    {
        await Connectdb();

        console.log("listening on port 6800");
    }
    catch(error)
    {
        console.log("error :", error);
    }
})