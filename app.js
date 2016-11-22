
/**
* Module dependencies.
*/

var y = require('events').EventEmitter.prototype._maxListeners = 100;

var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var cons = require('consolidate');
var dust = require('dustjs-helpers');
var pg   = require('pg');
var app = express();
var html_dir = './html/';
var connect = "postgres://wkffstrhlpupdr:DVb427-jc3Z7gnunzpVeA6XFji@ec2-54-221-244-62.compute-1.amazonaws.com:5432/d3vt508c43cdvj?ssl=true"


//var pool = new pg.Pool(config);&ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory
app.engine('dust', cons.dust);

// all environments
app.set('view engine', 'dust');
//app.set('port', process.env.PORT || 3000);
//app.set('views', path.join(__dirname, 'views'));
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.json());
app.use(express.bodyParser());

app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', function(req, res) {
  res.render('index');
});
app.get('/home', function(req, res) {
  res.sendfile(html_dir + 'home.html');
});
app.get('/signin', function(req, res) {

  res.render('signin');
});
app.post('/addUser', function(req, res) {
  pg.connect(connect, function (err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM users', function(err, result) {
      //console.log(result.rows);
      //res.render('index');
      for (var i = 0; i < result.rows.length; i++) {
        console.log(result.rows[i].email);
        console.log(result.rows[i].password);
        console.log(req.body.logU);
        console.log(req.body.logP);
        if (result.rows[i].email == req.body.logU && result.rows[i].password == req.body.logP) {
          //res.sendfile(html_dir + 'home.html');
          return console.log("pass");
        } else {
          console.log("fail");
          res.render('signin');
        }
      }
      //res.render('signin');
      done();

      if(err) {
        return console.error('error running query', err);
      }
    });
  });

});

app.get('/signup', function(req, res) {

  res.render('signup');

});



app.post('/add', function(req, res) {
  pg.connect(connect, function (err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query("INSERT INTO users (email, password) VALUES ($1, $2)",
    [req.body.email, req.body.password]);
    done();
    res.render('signin');
  });
});
/*app.listen(3000, function() {
  console.log('Server Started On Port 3000');
});*/

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});


/*
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
*/
/*
var html_dir = './html/';

app.get('/index', function(req, res) {
res.sendfile(html_dir + 'index.html');
=======



});
  app.get('/signin', function(req, res) {
    pg.connect(connect, function (err, client, done) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }
      client.query('SELECT * FROM users', function(err, result) {
        //console.log(result.rows);
        //res.render('index');
        res.render('signin', {jake: result.rows});
        done();

        if(err) {
          return console.error('error running query', err);
        }
      });
    });

  });

  app.get('/signup', function(req, res) {
    res.sendfile(html_dir + 'signup.html');
  });
  app.get('/home', function(req, res) {
    res.sendfile(html_dir + 'home.html');
  });
  app.listen(3000, function() {
    console.log('Server Started On Port 3000');
  });


  /*
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(express.cookieParser('Intro HCI secret key'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  */
  /*
  var html_dir = './html/';

  app.get('/index', function(req, res) {
  res.sendfile(html_dir + 'index.html');
>>>>>>> e62444f8e989f570e7d72dc9e4b3d5262bb96a11
});


// routes to serve the static HTML files
app.get('/home', function(req, res) {
res.sendfile(html_dir + 'home.html');
});
// Note: route names need not match the file name
app.get('/signin', function(req, res) {
res.sendfile(html_dir + 'signin.html');
});

// Add routes here

//app.get('/signin', signin.view);
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
console.log('Express server listening on port ' + app.get('port'));
});*/
