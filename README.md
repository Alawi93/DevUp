# <img  src="/views/images/logo.svg" width="200">

#### Technology Stack| `Languagues and Tools`
><img alt="NodeJS" src="https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/> <img alt="JavaScript" src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/> <img alt="HTML5" src="https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white"/> <img alt="CSS3" src="https://img.shields.io/badge/css3%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white"/> <img alt="Express.js" src="https://img.shields.io/badge/express.js%20-%23404d59.svg?&style=for-the-badge"/> <img alt="jQuery" src="https://img.shields.io/badge/jquery%20-%230769AD.svg?&style=for-the-badge&logo=jquery&logoColor=white"/> <img alt="MongoDB" src ="https://img.shields.io/badge/MongoDB-%234ea94b.svg?&style=for-the-badge&logo=mongodb&logoColor=white"/> <img alt="GitHub" src="https://img.shields.io/badge/github%20-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/> <img alt="Git" src="https://img.shields.io/badge/git%20-%23F05033.svg?&style=for-the-badge&logo=git&logoColor=white"/> 
>
---

<br>

[Check out](https://devup.duckdns.org/) the deployed web app.

<img src="/views/images/print_screen.png" alt="Print screen" width="800" border-radius="12">

## Table of contents <!-- omit in toc -->

- **[About DevUp](#About-DevUp)**
- **[Architectural Approach](#Architectural-Approach)**
    - **Single Page Application (SPA)**
    - **Restful API**
    - **Model View Controller (MVC)**
- **[Security](#Security)**
    - **Session**
    - **Hosting**
    - **Data storage**
- **[Backend](#Backend)**
    - **Server**
    - **Routes**
    - **MongoDB**
   - **Middleware**   
- **[Frontend](#Frontend)**
    - **SPA**
    - **Responsive design**
    - **Stateful CSS**
    - **Variable scope**
- **[File Structure](#File-Structure)**
---
<br>

## About DevUp 
DevUps allows software developers to easily market themselves for job or gig opportunities.

*Features:*
- Browse developers
  - No account or login required.
  - Filter function to specialize searches.
- Register as developer
  - Create an account.
  - Edit your profile in simple steps.
  - Autmatic login if didn't log out last time.
- DevUp admin
  - Same login field as developers.
  - Privileged to ban, delete and add developers.

## Architectural Approach
 - **Single Page Architecture (SPA):** The browser experience centres around one generic HTML document being loaded at session start, and updated at client side as new content is requested. By not reloading the entire page when content is requested, the amounts of data being transferred is heavily reduced. This provides fast and light network operations. Also, by delegating the DOM-manipulations and thus the HTML rendering to client side, the server is relieved.
 - **Restful API:** Dynamic data is provided in JSON format using a dedicated Restful API. This way, the service is not constrained to only serving browser clients. For example, it would be easy to create a companion app for mobile phones, or a desktop app, using the existing API. 
 - **Model View Controller (MVC):**
 - **Error management** using appropriate HTTP status codes, served by backend and handled by frontend.
## Security
 - **Session | `Session managament`:** Since HTTP is stateless (no session information is retained by the receiver), there is no way to associate a request to any other request and thus we need a way to identify the current user accessing our system. In devUp this helps us keep track of what users are logged in and have the privilege to access server information.
 - **Hosting:** The web app is deployed on a VPS using NGINX as reverse proxy server. Certbot is used to force HTTPS on the communication channel (with Let's Encrypt TLS certificates). The Node app itself is managed with PM2.
 - **Data storage:**
- **Enviromental variable:** We use load enviromental variables from `.env` file into `process.env` and include it for storing the connection address to the database and for the secret used in sessions. It helps us hide configurations that we would not like to include with our github pushes since this information is not to be showed. See the following for an example of declaring these variables in .env file and how its used in the server (`app,js`).
```
DATABASE_LINK="link-To-Database"
SECRETS="someLongSentenceHere"
```
 And how its included (marked in quotation):
 ```javascript
mongoose.connect("process.env.DATABASE_LINK",{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

app.use(session({
    secret: "process.env.SECRETS",
    resave:false,saveUninitialized: true}))
```
## Backend
   - **Server:**
      -  The server is using Node.js which is a Javascript run-time enviroment that is used for building HTTP servers. The server is the starting point of DevUp and includes several imports (`require`) and important code segments that deals with security, database connections, and setup code.
          - `require()`:

            1. Express: Setting up express for incoming HTTP requests by using `routes`. It helps us respond to requests with route support to specific URLs. We create the express app by setting it to the app variable. We also use the app variable for the server to listen to a specific port for incoming requests.
            ```javascript
                const express = require('express');
                const app     = express();
                const port    = process.env.PORT || 3000;

              app.listen(port, ()=>{
              console.log(`Server started on port: ${port}`)
              });  
            ``` 
            2. Express-session: For establishinga session variable (read more under security section)
            ```javascript
            const session = require('express-session');

            app.use(session({secret: process.env.SECRETS,resave:false,saveUninitialized: true}))

            ```

            3. MongoDB: For establishing connections to a database we need to require this package and use it with the `connect` method.
             ```javascript
             const mongoose   = require('mongoose');

             mongoose.connect(process.env.DATABASE_LINK,{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
            ``` 
            4. BodyParser: It's a middleware that is used for parsing incoming request bodies before its handled in the routes. It's purpose is to make the incoming request more managable since it extracts the entire body portion of the incoming request and insert it to the `req.body`.
            ```javascript
            const bodyParser = require('body-parser');

            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({
            extended:true
            })); 
            ``` 
            
   - **Routes:** All the routes are built up in the same way, the router specifies what type of `CRUD` method its expecting on a predefined URL with a callback function that triggers after the request has come in. The last thing is to export the routes, they are then used in the server.
        - `routes`:
   ```javascript
        var express = require('express');
        var router = express.Router();

        router.post('/',function(req,res){
            //logic
        });
        module.exports = router;
   ```
    
 - `Server`:
       ```javascript
        app.use("/api/developers",developer);
        app.use("/api/member",member);
       ```

   - **MongoDB:**
        -    MongoDB is intigrated as the backend database. The database is used as it gives a good structure of JSON objects. As the data communication in devUp is designed to work with JSON data, makes it a perfect fit without need to take into consideradion of relationship. As all data is connected to every specific developer. This also reduce the risk of SQL injection.
        -   Backend implement the `Moongose framework` for a faster and easier implementation of the MongoDB. To create specific schema and model templates for adding Developers and creating accounts. The two Model classes are `user.js` and `utils.js`.
            -   `user.js`:  this class implementing a template for when users/devlopers are added and retrived from the MongoDB. Making sure every user follow the same structure. This class also make sure that passwords get hashed and salted with bcrypt and validate so data is in correct format.

                ```javascript
                const mongoose = require('mongoose');
                const bcrypt = require('bcrypt');
                const saltRounds = 10;

                var validateEmail = function(email) {
                    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    return re.test(email)
                };
                // Schema
                const userSchema = new mongoose.Schema({
                    _id: {
                        type: mongoose.Types.ObjectId,
                        default: mongoose.Types.ObjectId(),
                        auto: true
                    },
                    email: {
                        type: String,
                        trim: true,
                        lowercase: true,
                        unique: true,
                        required: 'Email address is required',
                        validate: [validateEmail, 'Not a valid emails'],
                        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Not a a valid email'],
                    },
                    password: String,
                    isAdmin: {
                        type: Boolean,
                        default: false
                    },
                    // Code extended
                 ```
            -   `utils.js`:  This as a helper class for helping the frontend display and implement Skills the devlopers can pick and assign to themself. The skills are later sent to the frontend and helps them to render this data when page is loaded.

   - **MiddleWare and Controllers:**
        -    In the backend multiple classes are implemented for handling speciffic function in the backend system and act as helpers. This make the code more readable and seperate majority of logic out of important classes.
                -   `middleware.js` act to setup mockdata, creating important data that is needed both for the frontend and backend.
                -   `memberController.js` controlls and handle the data for the `member.js` routes class that manipulate data from the database to respond the necassary information to the frontend. Function exampeel is check if a user isBanned, creatinging specific clientObjects so they can be displayed correctly.
                -   `developerController.js` helps the `developer.js` routes class. By implementing function for filtingering information from the database to respond the right objects depending on a front end filter search.

                ```javascript
                function searchFilter (admin,skills,name_start,price_max){
                    let adminFilter;
                    if(!admin){
                        var isBanned = {isBanned: false};
                    }
                    if(skills.length > 0){
                        //var skillFilter = {'skillset': {$elemMatch: {'skillName': skills}}};
                        var skillFilter = { 'skillset.skillName':  {$all: skills}};
                    }
                    adminFilter ={...isBanned,...skillFilter};
                    console.log(adminFilter);
                    return adminFilter;
                }
                 module.exports = {
                searchFilter: searchFilter,
                }
                ```

## Frontend
> *HTML, CSS, Javascript, AJAX, jQuery*
- **Single Page Application (SPA)**

  - The single HTML-document acts as a general-purpose frame with multiple dedicated **injection points** for dynamic content. It thus includes all compontents and scripts neccessary to perform client-side DOM rendering and asynchronous API-requests for adapting the view. Content requests are performed using **AJAX with jQuery**. Client-side rendering of the HTML document is then performed by processing the JSON response from the server.

- **Responsive design**
  - *Mobile-first design*.
  - *CSS with static width thresholds for determing basic scaling*. This includes removing selected items from the view for smaller screens. As an example, the header will remove the DevUp logo and the client's name on small screens.
  - *JavaScript to calculate behaviours based on screen size*. On big screens the sidebar will shrink the adjacent content area, possibly forcing items to be stacked on top of each other rather than side by side. However, on small screens, the sidebar instead overlaps the content area, as shrinking it would appear jittery. For this calculation, the script takes into account the width of the sidebar, and the minimum width required to display one item in the main content area. If both cannot fit side by side, the sidebar instead overlaps the content area. <br>
  The same script also determines the sidebar defualt mode: For big screens, the sidebar is displayed by defualt.
 

- **Stateful view**
  - The generic HTML template supports displays in three modes, based on the client state: ``not-logged-in``, ``developer`` and ``admin``. The display is always in one of these modes, making it a stateful approach. What's displayed for each mode is governed by CSS propertites being added or removed to a main wrapper. JavaScript is then used to dynamcially trigger a certian mode.<br>
  The below takes place in the Javascript scope ``clientManager``, and is issued upon changes in the current client object ``clientManager.client``.
    ```javascript
     viewAdapt: function (clientProfile) {
         // Adapt view to type of client
         $("#main-wrapper").removeClass("not-logged-in");
         $("#main-wrapper").removeClass("developer");
         $("#main-wrapper").removeClass("admin");
         // Adding: 'not-logged-in', 'developer' OR 'admin'.
         $("#main-wrapper").addClass(clientProfile);
     }
    ``` 

- **Variable scope**
  -  Global Javascript methods and variables are collision protected in object litterals of appropriate cathergories. For example, the object ``sidebar`` holds all the globally accessible variables and methods associated with the sidebar operations. Thus, invoking a sidebar operation could look like this:
        ```javascript
        sidebar.toggleDropDown("edit-profile");
        ```
  - Other global Javascript scopes are ``signIn`` (for register and login operations), ``clientManager`` (for the current client setup, initialized upon login or register), ``popup`` (for displaying short messages, like error messages fromt the server), ``demoMode`` (for indicating demo login) and ``apiRequest`` (for data requets to the server). 
  - Another inportant aspect of the Javascript scope separations is the independence between features. For example, the ``apiRequest`` scope is dedicated only to server requests. Responses are then passed to the appropraiate view scope for rendering. This creates a clean separation of concern between the view scope and the data communications scope.<br>
  Below is an example of one server request function from the ``apiRequest`` scope.
    ```javascript
    const apiRequest = {
        [...]
        login: function (email, password) {
            $.ajax({
                type: "POST",
                url: "/api/member/login",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify({ email, password }),
                success: function (response) {
                    // Response = Client object
                    clientManager.loginSuccessful(response.user);
                },
                error: function (response) {
                    // Derive message and display in popup.
                    handleError(response);
                }
            });
        }, [...]
    ```

---
<br>

## File Structure
<pre>
📦DA377B
 ┣ 📂controller
 ┣ 📂middleware
 ┣ 📂models
 ┃ ┣ 📜user.js
 ┃ ┗ 📜utils.js
 ┣ 📂routes
 ┃ ┣ 📜developer.js
 ┃ ┗ 📜member.js
 ┣ 📂views
 ┃ ┣ 📂css
 ┃ ┣ 📂images
 ┃ ┣ 📂script 
 ┃ ┗ 📜index.html
 ┣ 📜.env
 ┣ 📜.gitignore
 ┣ 📜app.js
 ┣ 📜dbUsers.json
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜README.md
 </pre>
