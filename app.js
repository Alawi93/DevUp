const express      = require('express');
const bodyParser   = require('body-parser');
const mongoose     = require('mongoose');
const session      = require('express-session');
const passport     = require('passport');
//var   MongoStore   = require('connect-mongo')(session);
const app          = express();
const port         = process.env.PORT || 3000;
//routes
const developer    = require('./routes/developer');
const member       = require('./routes/member');

const path         = require("path");
require('dotenv').config()

app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

//connect to database                        
mongoose.connect(process.env.DATABASE_LINK,{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

//to be removed
/*session & security 
app.use(session({
    secret: process.env.SECRETS,
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

//use with userSchema when user is defined
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
*/

// API routers
app.use("/api/developers",developer);
app.use("/api/member",member);

//root route
app.get("/",function(req,res){
//res.sendFile()
});

app.listen(port, () =>{
    console.log(`Server started on port: ${port}`)
});
