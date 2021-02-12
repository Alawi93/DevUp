const express      = require('express');
const bodyParser   = require('body-parser');
const mongoose     = require('mongoose');
const session      = require('express-session');
const passport     = require('passport');
var   MongoStore   = require('connect-mongo')(session);
const app          = express();
const port         = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

//connect to database                        
//mongoose.connect('mongodb://localhost:27017/nameDB',{useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true});

//session & security
app.use(session({
    secret: 'someSecretHere',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    cookie:{maxAge: 180* 60* 1000} //3 hours
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next){
res.locals.login   = req.isAuthenticated();
res.locals.session = req.session;
next();    
});

/* //use with userSchema when user is defined
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
*/

app.listen(port, () =>{
    console.log(`Server started on port: ${port}`)
    console.log("testing bransches etc")
    // Some coment from sepastian
});
