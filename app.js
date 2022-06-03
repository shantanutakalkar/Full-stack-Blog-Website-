//jshint esversion:6
// Install Package Required For Website using bpm install
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
//Home page content
const homeStartingContent = "“Blog” is an abbreviated version of “weblog,” which is a term used to describe websites that maintain an ongoing chronicle of information. A blog features diary-type commentary and links to articles on other websites, usually presented as a list of entries in reverse chronological order. Blogs range from the personal to the political, and can focus on one narrow subject or a whole range of subjects.Many blogs focus on a particular topic, such as web design, home staging, sports, or mobile technology. Some are more eclectic, presenting links to all types of other sites. And others are more like personal journals, presenting the author’s daily life and thoughts.";
const aboutContent = "WEBLOG is a combination of both Blog as well as Novels. Blog contain the Information of various things related to Technology, Education, News, International, Business, Sports, Entertainment and ongoing college activities. The main aim of this project is to provide data to students in only one site. Students can gather the information from one site as well as give their feedback and create their own blog. Students can post their views and thought and analyze themselves. Besides all such core functionalities, the application also includes features like FAQ, request, feedback etc. so as to provide a satisfactory user experience";
const contactContent = "You can contact us on any time. we are giving service 24*7 till next year. we hope to serve you soon. we are here to expand this blogging website a way beyond it's limitation. you can visit our branches in pune,Delhi, banglore, indore , gujrat.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
// connect application to monogodb database using below link 
mongoose.connect("mongodb+srv://admin-shantanu:admin@cluster0.fttpie0.mongodb.net/blogDB", {useNewUrlParser: true});
// Standard Schema in which data is stored
const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);
// Get methood tp fetch data ans show it on root directory
app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});
//compose page to get data like title and description
app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

//after writting get back to root and show blog on home page
  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});
// each post is having post data which we can identify by using unique post id that is identify by below code
app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});
//website accessible ports
let port = process.env.PORT;
if(port == null || port == "")
{
  port = 3000;                                   
}

app.listen(port, function() {
  console.log("Server started successfully");
});
