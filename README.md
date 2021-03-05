# Devup

#### Technology Stack| `Languagues and Tools`
><img alt="NodeJS" src="https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/> <img alt="JavaScript" src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/> <img alt="HTML5" src="https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white"/> <img alt="CSS3" src="https://img.shields.io/badge/css3%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white"/> <img alt="Express.js" src="https://img.shields.io/badge/express.js%20-%23404d59.svg?&style=for-the-badge"/> <img alt="jQuery" src="https://img.shields.io/badge/jquery%20-%230769AD.svg?&style=for-the-badge&logo=jquery&logoColor=white"/> <img alt="MongoDB" src ="https://img.shields.io/badge/MongoDB-%234ea94b.svg?&style=for-the-badge&logo=mongodb&logoColor=white"/> <img alt="GitHub" src="https://img.shields.io/badge/github%20-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/> <img alt="Git" src="https://img.shields.io/badge/git%20-%23F05033.svg?&style=for-the-badge&logo=git&logoColor=white"/> 

---
<br>
<br>

## Table of contents <!-- omit in toc -->

- **[About DevUp](#About-DevUp)**
- **[Architectural Approach](#Architectural-Approach)**
    - **Single page (SPA)**
    - **Restful API**
    - **Model View Controller (MVC)**
- **[Security](#Security)**
    - **Session**
    - **Hosting**
    - **Data storage**
- **[Backend](#Backend)**
    - **Server:**
    - **Routes:**
    - **MongoDB:**
   - **Middleware:**   
- **[Frontend](#Frontend)**
- **[File Structure](#File-Structure)**
---
<br>


## About DevUp
- DevUps allows software developers  to easily market themselves for job or gig opportunities.

- No account or login is required for browsing among developers.

- If you are looking for a developer for employment or gig purposes, use the filter function to specialize your search.

- If you are a developer, create an account to start edit your profile in simple steps.

- A DevUp admin is privileged to ban, delete and add developers

- Error management using appropriate HTTP status codes, served by backend and handled by frontend.


## Architectural Approach
 - **#Single page (SPA):**
 - **Restful API:**
 - **Model View Controller (MVC):**
 - 
## Security
 - **Session:**
 - **Hosting:**
 - **Data storage:**

## Backend
   - **Server:**
      - **Enviromental Variables**
   - **Routes:** 
   ```javascript
        var express = require('express');
        var router = express.Router();

        router.post('/',function(req,res){
            //logic
        });
        module.exports = router;
   ```
   - **MongoDB:**
   - **MiddleWare:**
## Frontend
 - **Injectable components:**
 - **DOM manipulation:**
 - **Ajax:**

```html

<p>show html preview here</p>

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