//dependencies for each module used
var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var app = express();
//route for hashtag
var hashtag = require('./routes/hashtag');
var index = require('./routes/index');
//database setup
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/instagramexample');

//Configures the Template engine
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());

//routes
app.get('/', index.view);
app.get('/hashtag', function (req, res) {
	res.render('hashtag');
})
app.post('/hashtag', hashtag.getHashtag);
app.post('/save', hashtag.saveFavorites);
app.post('/delete', index.deleteImage);
//set environment ports and start application
app.set('port', process.env.PORT || 8080);
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});

//add	instagram api	setup	
var ig	=	require('instagram-node-lib');	
ig.set('client_id',	process.env.instagram_client_id);	
ig.set('client_secret',	process.env.instagram_client_secret);	

ig.tags.info({	
name:	'sushi',	
complete:	function(data)	{	
	 	console.log(data);	
}	
});	