var express = require('express'),
app = express(); 
var yelp = require("./sample")

//calls to index.html
app.use('/', express.static(__dirname + '/'));
app.listen(8080);

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
