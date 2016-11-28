
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
var name;

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

app.use(bodyParser.urlencoded({ extended: true}));

app.get('/create', function(req, res) {
  res.render('create', {user: name});
});

app.get('/social', function(req, res) {
  pg.connect(connect, function (err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query("SELECT * FROM question where category = 'Social'" , function(err, result) {

      res.render('social', {project: result.rows});

      done();

      if(err) {
        return console.error('error running query', err);
      }
    });
  });
  //res.render('social');
});

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/home', function(req, res) {
    res.render('home');

});
app.get('/signin', function(req, res) {

  res.render('signin');
});




app.get('/contribute', function(req,res) {
  res.render('contribute');
});

app.get('/analyze', function(req,res) {
  res.render('analyze');
});


app.get('/signup', function(req, res) {

  res.render('signup');

});

app.get('/signin', function(req, res) {

  res.render('signin');

});

app.get('/health', function(req, res) {
  pg.connect(connect, function (err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query("SELECT * FROM question where category = 'Health'" , function(err, result) {

      res.render('health', {project: result.rows, user: name});

      done();

      if(err) {
        return console.error('error running query', err);
      }
    });
  });
  //res.render('social');
});


app.get('/science', function(req, res) {

  res.render('science');

});

app.get('/environment', function(req, res) {

  res.render('environment');

});


app.get('/forgotpassword', function(req, res) {

  res.render('forgotpassword');

});

app.get('/myprojects', function(req, res) {

  res.render('myprojects');

});




app.get('/addUser', function(req, res) {
  res.render('home');

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
        console.log("database " + result.rows[i].email);
        console.log("database " + result.rows[i].password);
        console.log(req.body.logU);
        console.log(req.body.logP);
        if (result.rows[i].email == req.body.logU && result.rows[i].password == req.body.logP) {
          name = result.rows[i].email;
          return res.render('home', {user: result.rows[i].email});
        }
      }
      res.render('signin', {error: "Invalid Username/Password!"});


      //res.render('signin');
      done();

      if(err) {
        return console.error('error running query', err);
      }
    });
  });
});

//table project

app.post('/createP', function(req, res) {
  pg.connect(connect, function (err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query("INSERT INTO question (owner, projname,category, hypothesis, quest1, quest2, quest3, quest4, quest5) VALUES" +
    "($1, $2, $3, $4, $5, $6, $7, $8, $9)",
    [name, req.body.pName, req.body.selectpicker, req.body.hypo, req.body.ques1,req.body.ques2,req.body.ques3,req.body.ques4,req.body.ques5]);
    done();
    res.render('home');
    if(err) {
      return console.error('error running query', err);
    }
  });
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



app.post('/display', function(req, res) {
  pg.connect(connect, function (err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    var temp = req.body.projectID;
    client.query("SELECT * FROM question where projname = $1",[temp], function(err, result) {
      res.render('project', {info: result.rows});
      done();

    });
  });
});



app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode",
  this.address().port, app.settings.env);
});
