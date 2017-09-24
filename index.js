var express = require("express");
var path = require("path");
var app = express();
var postsFile = require('./data/posts.json');
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.set('port', (process.env.PORT || 3000));
app.use(express.static('public'))

// Dit is de route naar de homepage.
app.get('/', function (req, res) {
    res.render("home", {});
});
// Dit is de route naar de blog.
app.get('/blog', function (req, res) {
    res.render("index", {
        posts: postsFile.blogposts
    });
});
// Dit is de route naar de contact pagina.
app.get("/contact", function (req, res) {
    res.render("contact");
});
// Dit is de route naar de about pagina.
app.get("/about", function (req, res) {
    res.render("bio");
});
// Dit is de route naar de view om een individuele post te tonen
// Ik gebruik hiervoor een regular expression. Dit is een superkrachtig mechanisme om tekstpatronen op te sporen
// Jullie hoeven dit niet te gebruiken: je kan rustig met een ID werken zoals vrijdag getoond in de les
// Wil je toch meer weten over regular expressions (een aanrader!)
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
// https://www.lynda.com/Regular-Expressions-tutorials/Using-Regular-Expressions/85870-2.html
app.get(/^\/(\d\d\d\d\/\d\d\/\d\d\/.*)$/, function (req, res) {
    var slug = req.params[0];
    var teller = 0;
    var blogpost = "";
    while (teller < postsFile.blogposts.length) {
        if (postsFile.blogposts[teller].slug === slug) {
            blogpost = postsFile.blogposts[teller];
        }
        teller++;
    }
    if (blogpost !== "") {
        res.render("post", {
            post: blogpost
        });
    } else {
        console.log(slug);
        res.render("404", {});
    }
});
// de server starten op poort 3000
app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});
