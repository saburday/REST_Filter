var express = require('express');
    mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/bookAPI');

var Book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 3000;

var bookRouter = express.Router();

bookRouter.route('/Books')
    .get(function(reg,res){

      var query = {};
      if(reg.query.genre)
      {
        query.genre = reg.query.genre;
      }
        Book.find(query, function(err,books){
          if(err)
             res.status(500).send(err)
          else
             res.json(books);
        });
    });
    
bookRouter.route('/Books/:bookId')
    .get(function(reg,res){

        Book.findById(reg.params.bookId, function(err,books){
          if(err)
             res.status(500).send(err)
          else
             res.json(books);
        });
    });

app.use('/api', bookRouter);

app.get('/', function(reg, res){
  res.send('welcome to my API');
});

app.listen(port, function(){
  console.log('Running on PORT: '+ port);
});
