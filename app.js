const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const port = 3000;

const lodash = require('lodash');

const homeStartingContent = "Hi, I’m Vlad! I'm a web developer with in-depth experience in UI/UX design. In a nutshell, I create websites that help organizations address business challenges and meet their needs. I manage everything from website navigation and layout to a company's web hosting and security architecture. My expertise lies within front-end web apps, and the main languages in my tech stack are JavaScript, React, and of course HTML/CSS. I’m a lifelong learner (currently taking a course on building AI chatbots with Python!) and love to read, run, and find new bubble tea shops in Toronto City.";
const aboutContent = "“It is never too late to be wise.” “Thus fear of danger is ten thousand times more terrifying than danger itself.” “Those people cannot enjoy comfortably what God has given them because they see and covet what He has not given them.";
const contactContent = "vlad.yrkevich@gmail.com";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const posts = [];
const titles = [];

app.get("/", function(req, res){
  res.render("home", {homeStartingContent: homeStartingContent, posts: posts});
})

app.get("/posts/:publishId", function(req, res){
  const requestTitle = lodash.snakeCase(req.params.publishId)
  posts.forEach(function(post){
    const storedTitle = lodash.snakeCase(post.newTitle)
    if (storedTitle === requestTitle){
      res.render("post",{title: post.newTitle ,content: post.newText})
    };
  })
})

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
})

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
})

app.get("/compose", function(req, res){
  res.render("compose");
})

app.post("/compose", function(req, res){
  const newPublish = {
    newTitle: req.body.newTitle,
    newText: req.body.newText
  }
  posts.push(newPublish)
  titles.push(lodash.snakeCase(newPublish.newTitle))
  res.redirect("/");
});

app.listen(port, function() {
  console.log("Server started on port: " + port);
});
