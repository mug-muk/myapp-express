var express=require("express");
var stusRouter=require("./routes/stus");
var config=require("config");


var port=parseInt(config.get("port"));
var app=express();




app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use("/stus",stusRouter);

app.listen(port,()=>
{
    console.log("server is listening on port 7777");
})