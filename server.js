var http = require('http');
var express = require('express');
var exphbs = require('express-handlebars');
var Twit = require('twit');


var routes = require('./routes');
var config = require('./config');

var app = express();
var port = process.env.PORT || 8000;

// Set handlebars as the templating engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Disable etag headers on responses
app.disable('etag');

var T = new Twit(config.twitter);

// Index Route
app.get('/', routes.index);

// Set /public as our static content dir
app.use("/", express.static(__dirname + "/public/"));

var server = http.createServer(app).listen(port, function() {
  console.log('Express server listening on port ' + port);
});

var io = require('socket.io').listen(server);

var puertoRico = [ '-67.28', '17.88', '-65.21', '18.52' ];

var stream = T.stream('statuses/filter', { locations: puertoRico });

io.sockets.on('connection', function (socket) {
  stream.on('tweet', function(tweet) {
    socket.emit('info', { tweet: tweet});
  });
});