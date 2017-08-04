
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
    {name:"Other", route:"/other"},
    {name: "Dropdown",
            subList: [
                {name: "One", route: "/content/1"},
                {name: "Two", route: "/content/2"}
            ]
    }
];

app.locals.mainMenu = mainMenu;
app.locals.siteName = "Data Tools";

app.get('/', (req, res) => {
    res.render("home", {
        userName: "Simon"
    })
});

var contentPages = [
    {id: 1, title: 'Page One', content: '<h1>Hello</h1><p>memes</p>'},
    {id: 2, title: 'Page Two', content: '<h1>Nah</h1><p>asdf</p>'},
];

app.get('/content/:contentId', (req, res) => {
    var match = contentPages.filter(o => o.id == req.params.contentId)[0];
    res.render("content", {
        pageContent: match.content
    })
});

app.get('/other', (req, res) => {
    res.render("home", {
        userName: "Simon"
    })
});

const portNum = 3000;
app.listen(process.env.PORT || portNum, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || portNum))
})
