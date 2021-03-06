const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//local modules
const date = require(__dirname + "/date.js");

// variables
const items = ["Buy food", "cook food"];
const workItems = [];

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.listen(process.env.PORT || 3000,function(req,res){
  console.log("Server is now running on port 3000");
});

app.get("/", function(req, res) {

  const day = date.getDate();

  res.render('list', {
    listTitle: day,
    newListItems: items
  });

});

app.post("/", function(req, res) {

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }

})

app.get("/work", function(req, res) {
  res.render('list', {
    listTitle: "Work List",
    newListItems: workItems
  });
})

app.post("/work", function(req, res) {
  const item = req.body.newItem;
  workItems.push((item));
  res.redirect("/work");
})

app.get("/about", function(req,res) {
  res.render("about");
})
