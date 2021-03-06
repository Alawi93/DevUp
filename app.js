const express      = require('express');
const bodyParser   = require('body-parser');
const mongoose     = require('mongoose');
const app          = express();
const port         = process.env.PORT || 3000;
const developer    = require('./routes/developer');
const member       = require('./routes/member');
const path         = require("path");
const middleware   = require('./middleware/middleware');  
const session      = require('express-session');
require('dotenv').config()



//connect to database                        
mongoose.connect(process.env.DATABASE_LINK,{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

app.use(express.static(path.join(__dirname,"views")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(session({secret: process.env.SECRETS,resave:false,saveUninitialized: true}))
app.use("/api/developers",developer);
app.use("/api/member",member);
app.use(middleware.incomingRequest);

middleware.checkSkillSets();
middleware.checkCreateDummyUser();
middleware.checkAddAdmin();

app.listen(port, ()=>{
console.log(`Server started on port: ${port}`)
});
