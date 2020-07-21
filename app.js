const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const port = 3000;

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('view engine', 'ejs');
app.use(express.static("public"));

const day = date.getDay();
let items = [];
let checkedItems = [];


app.get("/", function(req, res) {
  res.render('index', {
    dayOfWeek: day,
    listItems: items,
    listCheckedItems: checkedItems
  });
});

app.post("/", function(req, res) {
  if (Object.keys(req.body)[0] === "newItem") {
    let item = req.body.newItem;
    console.log("Tried to add an item");
    items.push(item);
    res.redirect("/");
  } else if (Object.keys(req.body)[0] === "checkedItem") {
    let selectedCheckedItem = req.body.checkedItem;
    console.log("Tried to move an item back");
    for ( i = 0; i < checkedItems.length; i++) {
      if (checkedItems[i] === selectedCheckedItem) {
        console.log(selectedCheckedItem + " was sliced and added to the top list, hopefully.");
        if (checkedItems.length === 1) {
          checkedItems = [];
        } else {
          checkedItems.splice(i, 1);
        }
        items.push(selectedCheckedItem);
        res.redirect("/");
      }
    }
  } else if (Object.keys(req.body)[0] === "item"){
    let selectedItem = req.body.item;
    console.log("Tried to remove an item");
    for (i = 0; i < items.length; i++) {
      if (items[i] === selectedItem) {
        console.log(selectedItem + " was sliced and added to the bottom list, hopefully.");
        if (items.length === 1) {
          items = [];
        } else {
          items.splice(i, 1);
        }
        checkedItems.push(selectedItem);
        res.redirect("/");
      }
    }
  } else if (Object.keys(req.body)[0] === "clearChecked"){
      checkedItems = [];
      res.redirect("/");
  }
  console.log(req.body);
});

app.listen(3000, function() {
  console.log("Server started on port " + port + ".");
});
