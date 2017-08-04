
var path = require('path');
var express = require('express');
var app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/source/templates"));

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

var mainMenu = [
    {name:"Home", route:"/"},
    {name:"Other", route:"/other"}
];

app.locals.mainMenu = mainMenu;
app.locals.siteName = "Data Tools";

app.get('/', (req, res) => {
    res.render("home", {
        userName: "Simon"
    })
});

const portNum = 3000;
app.listen(process.env.PORT || portNum, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || portNum))
})
