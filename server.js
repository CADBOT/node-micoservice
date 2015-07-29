var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/User');
var app = express();
app.use(bodyParser.json());

//mongoose.connect('mongodb://localhost/myapp');
mongoose.connect('mongodb://database/myapp');

app.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    if (err) res.status(500).json({success: false})
    else {
      res.json(users) 
    }
  })
});

app.post('/users', function(req, res) {
  console.log('post /users');
  var user = new User(req.body);
  user.save(function(err, user) {
    if (err) res.status(500).json({success: false})
    else {
      res.json(user) 
    }
  }); 
});

var port = process.env.port || 3000;
app.listen(port, function() {
  console.log('server started');
});
