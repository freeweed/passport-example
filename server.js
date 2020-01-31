let port = process.env.port || 3000;

const express = require('express'),
      bodyParser = require('body-parser'),
      actuator = require('express-actuator'),
      passport = require("passport"),
      Auth = require('./app/core/auth'),
      secretKey = require('./app/config/constants.config').secretKey,
      app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(actuator());
passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.use(require('express-session')({
    secret: secretKey,
    resave: true,
    saveUninitialized: true
  }));
app.use(passport.initialize())
app.use(passport.session())
passport.use(Auth.jwtAuth)
passport.use(Auth.facebookAuth)
require('./app/router')(app);

app.listen(port, function() {
    console.log('Listening on port:' + port);
});

module.exports = app;