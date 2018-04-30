const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bancoo');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

var Post = require("../models/post");

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())


app.get('/posts', (req, res) => {
    Post.find({}, 'title description', function(error, posts){
        if(error) {console.log(error)}
        res.send({
            posts: posts
        })
    }).sort({_id:-1})  
})

app.post('/posts', (req, res) => {
    var db = req.db;
    var title = req.body.title;
    var description = req.body.description;
    var new_post = new Post({
      title: title,
      description: description
    })
  
    new_post.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true,
        message: 'Post saved successfully!'
      })
    })
  })


app.listen(process.env.PORT || 8081)