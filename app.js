const express = require("express");
const bodyParser = require("body-parser");
const app = new express();
const dates = require(__dirname + "/date.js"); 

app.use(express.static("public")); // move the static files to the public folder
app.use(bodyParser.urlencoded({extended:true})); // to get form values
app.set('view engine', 'ejs'); // use ejs as view engine , to render html
app.listen(3000,function(){

});

var itemsList = ["Buy Food","Cook Food" , "Eat Food"]; // array reference kept to store the items
var worklist = [];

app.get("/",function(req,res){
    day = dates.getDate(); // call the binded function to the object, the function was bind in the date.js file
    day = dates.getDay(); // just gets the day

    console.log("items list length " + itemsList.length);
    res.render("list",{ listtype : day, items : itemsList});
});

app.post("/add",function(req,res){
    var item = req.body.newitem;
    
    if(req.body.button === "Work"){
        worklist.push(item);
        res.redirect("/work");
    }
    else{
        itemsList.push(item);
        res.redirect("/");
    }
    
});

app.get("/work",function(req,res){
    res.render("list",{listtype : "Work",items : worklist});
});