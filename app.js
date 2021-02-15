const express      = require('express');
const bodyParser   = require('body-parser');
const mongoose     = require('mongoose');
const app          = express();
const port         = process.env.PORT || 3000;
const developer    = require('./routes/developer');
const member       = require('./routes/member');
const path         = require("path");
require('dotenv').config();
const middleware   = require('./middleware/middleware');

//connect to database                        
mongoose.connect(process.env.DATABASE_LINK,{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use("/api/developers",developer);
app.use("/api/member",member);
app.use(middleware.incomingRequest);
//root route
app.get("/",function(req,res){
//res.sendFile()
});

app.listen(port, ()=>{
    console.log(`Server started on port: ${port}`)
});
