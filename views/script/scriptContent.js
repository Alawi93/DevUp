const demoUsers = [{
    _id: 1,
    email: "john@mail.com",
    password: "",
    isAdmin: false,
    name: "John Ohlsson",
    professionLabel: "Web developer",
    age: 30,
    country: "SWEDEN",
    yearsExperience: 5,
    pricePerHour: 1100,
    github: "DevOps97",
    linkedin: "Wee",
    memberSince: "2020-09-12",
    selfDescription: "A dedicated software developer.",
    isBanned: false,
    skillset: [
        { skillName: "Java", skillRate: 8 },
        { skillName: "HTML", skillRate: 2 },
        { skillName: "JavaScript", skillRate: 4 },
        { skillName: "Python", skillRate: 3 },
        { skillName: "MySql", skillRate: 6 }]
}, {
    _id: 2,
    email: "john2@mail.com",
    password: "",
    isAdmin: false,
    name: "John Ohlsson",
    professionLabel: "Web developer",
    age: 28,
    country: "SWEDEN",
    yearsExperience: 5,
    pricePerHour: 1100,
    github: "DevOps97",
    linkedin: "Wee",
    memberSince: "2020-09-12",
    selfDescription: "A dedicated software developer.",
    isBanned: false,
    skillset: [
        { skillName: "Java", skillRate: 8 },
        { skillName: "HTML", skillRate: 2 },
        { skillName: "JavaScript", skillRate: 4 },
        { skillName: "Python", skillRate: 3 },
        { skillName: "MySql", skillRate: 6 }]
}, {
    _id: 3,
    email: "john3@mail.com",
    password: "",
    isAdmin: false,
    name: "John Ohlsson",
    professionLabel: "Web developer",
    age: 37,
    country: "SWEDEN",
    yearsExperience: 5,
    pricePerHour: 1100,
    github: "DevOps97",
    linkedin: "Wee",
    memberSince: "2020-09-12",
    selfDescription: "A dedicated software developer.",
    isBanned: true,
    skillset: [
        { skillName: "Java", skillRate: 8 },
        { skillName: "HTML", skillRate: 2 },
        { skillName: "JavaScript", skillRate: 4 },
        { skillName: "Python", skillRate: 3 },
        { skillName: "MySql", skillRate: 6 }]
}, {
    _id: 4,
    email: "john@mail.com",
    password: "",
    isAdmin: false,
    name: "John Ohlsson",
    professionLabel: "Web developer",
    age: 30,
    country: "SWEDEN",
    yearsExperience: 5,
    pricePerHour: 1100,
    github: "DevOps97",
    linkedin: "Wee",
    memberSince: "2020-09-12",
    selfDescription: "A dedicated software developer.",
    isBanned: false,
    skillset: [
        { skillName: "Java", skillRate: 8 },
        { skillName: "HTML", skillRate: 2 },
        { skillName: "JavaScript", skillRate: 4 },
        { skillName: "Python", skillRate: 3 },
        { skillName: "MySql", skillRate: 6 }]
}, {
    _id: 5,
    email: "john@mail.com",
    password: "",
    isAdmin: false,
    name: "John Ohlsson",
    professionLabel: "Web developer",
    age: 30,
    country: "SWEDEN",
    yearsExperience: 5,
    pricePerHour: 1100,
    github: "DevOps97",
    linkedin: "Wee",
    memberSince: "2020-09-12",
    selfDescription: "A dedicated software developer.",
    isBanned: false,
    skillset: [
        { skillName: "Java", skillRate: 8 },
        { skillName: "HTML", skillRate: 2 },
        { skillName: "JavaScript", skillRate: 4 },
        { skillName: "Python", skillRate: 3 },
        { skillName: "MySql", skillRate: 6 }]
}];

function refreshContent(users) {
    var cardsContainer = document.getElementById('content');
    cardsContainer.innerHTML = '';

    
    var loggedInIsAdmin = false;
    if(clientManager.client){
        const loggedInClient = clientManager.client;
        loggedInIsAdmin = loggedInClient.isAdmin;
    }

    if(users){
        users.forEach(user => {
            if (!user.isDeleted) {
                var banBtn = '';
                var deleteBtn = '';
                var cardState = '';
                var skills = user.skillset;
                var skillsHtmlString = '';
    
                skills.forEach(skill => {
                    skillsHtmlString += '<a class="skillSpan"><li class="skill">' + skill.skillName  + '</li><span class="skillLevel">' + skill.skillRate + '/10</span></a>';
                });
    
                var onBanClick = 'javascript:requestBan("' + user.email + '")';
    
                if (loggedInIsAdmin) {
                    if (user.isBanned) {
                        banBtn = `<a href='` + onBanClick + `' class='adminBtn unbanBtn'><span class='deleteSpan unbanSpan'>UNBAN</span><i class='fas fa-user-plus'></i></a>`;
                        cardState = 'bannedCard';
                    } else {
                        banBtn = `<a href='` + onBanClick + `' class='adminBtn banBtn'><span class='deleteSpan banSpan'>BAN</span><i class='fas fa-user-minus'></i></a>`;
                        cardState = 'notBannedCard';
                    }
    
                    var onDeleteClick = 'javascript:requestDelete("' + user.email + '")';
                    deleteBtn = `<a href='` + onDeleteClick + `' class='adminBtn banBtn'><span class='deleteSpan banSpan'>DELETE</span><i class="fas fa-trash-alt"></i></a>`;
                }
    
                cardsContainer.insertAdjacentHTML('beforeend', '<div id="' + user.email + '" class="card ' + cardState + '">\
                        <div class="cardHeader"><div class="adminContent">' + deleteBtn + banBtn + '</div>' +
                    '<h1 class="title">' + user.name + '</h1>\
                        <h2>' + user.professionLabel + '</h2>\
                        <div class="linksContainer"><a href="' + user.github + '"><i class="fab fa-github-square linkIcon"></i></a>\
                        <a href="' + user.linkedin + '"><i class="fab fa-linkedin linkIcon"></i></a>\
                        </div>\
                        </div>\
                        <div class="cardBody">\
                            <p class="age">Age: ' + user.age + '</p>\
                            <p class="location">Location: ' + user.country + '</p>\
                            <p class="experience">Experience: ' + user.yearsExperience + ' Years</p>\
                            <p class="cost">Cost: ' + user.pricePerHour + ' $/hour</p>\
                            <p class="about">About: ' + user.selfDescription + '</p>\
                            </div>\
                            <div class="skillsContainer">\
                            <h6 class=skillsTitle>SKILLS:</h6>\
                            <ul>'
                    + skillsHtmlString +
                    '</ul>\
                            </div>\
                    <a href="mailto:' + user.email + '?subject=DEVUP" class="btn">Hire Me!</a>');
            }
        });
    }  
}

function requestBan(email) {
    var isBanned = document.getElementById(email);

    if (isBanned.classList.contains('bannedCard')) {
        //Card is banned, when clicked means it should get unbanned.
        apiRequest.setBan(false, email);
    } else {
        //Card is not banned, when clicked means it should get banned.
        apiRequest.setBan(true, email);
    }
}

function requestDelete(email) {
    //No true/false when deleting, one should only be able to delete the user and not add back him from the GUI.
    apiRequest.setDelete(email);
}


