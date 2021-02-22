$(document).ready(function () {
    $("#main-wrapper").addClass("not-logged-in"); // Remove for dev purposes
    sidebar.onResize();   
    
    demoMode.start(); // TEMP FOR DEV
});

$(window).resize(function () {
    sidebar.onResize();
});


// ___________________________ SCREEN SIZE, MENUES & BEHAVIOUR _________________________________

/* Object literal: Avoid collisions/overwrites with global window properties/variables. */
/* A similar approach would be the Module Pattern, using an anonymous function instead of an object. */
const sidebar = {
    minWidthContent: 440, // Used for dynamic sidebar handling. Set to smallest width of content display.
    minWidthSidebar: 300,
    menuDisplayed: false,
    bigScreen: false,
    onResize: function() {
        this.bigScreen = $(window).width() > (this.minWidthContent + this.minWidthSidebar);
        if(this.bigScreen) {
            $("#main-wrapper").addClass("big-screen");
            $("#main-wrapper").addClass("menu-displayed");
            this.menuDisplayed = true;
        } else {
            $("#main-wrapper").removeClass("big-screen");
            $("#main-wrapper").removeClass("menu-displayed");
            this.menuDisplayed = false;
        }
    },
    toggleMenu: function() {
        if(this.menuDisplayed) {
            $("#main-wrapper").removeClass("menu-displayed");
        } else {
            $("#sidebar").scrollTop(0);
            $("#main-wrapper").addClass("menu-displayed");
        };
        this.menuDisplayed = !this.menuDisplayed;  
    },
    toggleDropdown: function(item) { /* Sidebar items */
        if(!this.menuDisplayed) {
            this.toggleMenu();
        }
        $("#"+item).toggleClass("dropdown");
    },
    setProfileSection: function() {
        const client = clientManager.client;
        if(!client.isAdmin) {
            const $profileSection = $("#edit-profile");
            $profileSection.find("#name").val(client.name);
            $profileSection.find("#mail").val(client.mail);
            $profileSection.find("#profession").val(client.professionLabel);
            $profileSection.find("#age").val(client.age);
            $profileSection.find("#country").val(client.country);
            $profileSection.find("#years-experience").val(client.yearsExperience);
            $profileSection.find("#hour-rate").val(client.pricePerHour);
            $profileSection.find("#description").val(client.selfDescription);
            
            // Load all available skillsets from server -> MAYBE GET AT LOGIN???
            const availableSkills = skillsets;
            // Convert skillsets array to map for key-value access (skill, rating)
            let skillMap = new Map();
            for (availableSkill of availableSkills) {
                skillMap.set(availableSkill, 0); //set skill rate to default 0
            };
            // Integrate client's skillset ratings
            for(clientSkill of client.skillset) {
                skillMap.set(clientSkill.skill, clientSkill.rate);
            };
            // Sort skills on ratings

            // Update Profile section in sidebar
            const $skillSection = $profileSection.find("#skillset");
            // Clear div
            $skillSection.empty();
            // Rebuild div (add sliders for each skill)
            for(let [key, value] of skillMap) {
                var skill = key;
                var rating = value;
                $skillSection.append(
            `<label for="${skill}">${skill}</label>
            <input type="range" id="${skill}" class="slider" min="0" max="10" value="${rating}"><br>`);
            };
            // Add evenlisteners for custom slider behaviours
            var sliders = document.querySelectorAll("#skillset .slider");
            
            sliders.forEach(function(slider) {
                updateSlider(slider);       
                slider.addEventListener("mousemove", function() {updateSlider(slider)});
                slider.addEventListener("click", function() {updateSlider(slider)});
            });

            // Event handler for skillset sliders
            function updateSlider (slider) {
                var x = slider.value * 10;
                    var color = "linear-gradient(90deg, var(--theme-main) " +  x + "%, grey " + x + "%)";
                    slider.style.background = color;
            };
            // Event handler for submit profile changes
            $("#profile-form").on("submit", function(event) {
                event.preventDefault(); // Prevent redirect or reload, but still validate form fields.
                sidebar.submitProfileUpdate();
            });
        };
    },
    submitProfileUpdate: function() {
        // See eventlistener setup in 'this.setProfileSection()'
        // Build an updated client object:
        const upd_client = clientManager.client;
        // 1. Collect updatable fields from profile section:
        const $profileSection = $("#edit-profile");
        upd_client.name = $profileSection.find("#name").val();
        upd_client.mail = $profileSection.find("#mail").val();
        upd_client.professionLabel = $profileSection.find("#profession").val();
        upd_client.age = $profileSection.find("#age").val();
        upd_client.country = $profileSection.find("#country").val();
        upd_client.yearsExperience = $profileSection.find("#years-experience").val();
        upd_client.pricePerHour = $profileSection.find("#hour-rate").val();
        upd_client.description = $profileSection.find("#description").val();
        // 2. Collect and filter skills with rating > 0
        const upd_skillset = [];
        const skillSliders = document.querySelectorAll("#skillset .slider");
        for(skillSlider of skillSliders) {
            skillName = skillSlider.id;
            skillRate = skillSlider.value;
            if(skillRate > 0) {
                upd_skillset.push({
                    skill: skillName,
                    rate: skillRate
                });
            };
        };
        // Overwrite current skillset
        upd_client.skillset = upd_skillset;
        // 3. Make server request
        apiRequest.updateProfile(upd_client); 
    }
};

const signIn = {  // Drop down from header
    approach: "login", // 'login' / 'register'
    signInDisplayed: false,
    toggleSignIn: function(approach) {
        if(this.signInDisplayed && this.approach == approach) {
            this.hideSignIn();
        } else {
            /* Instead of toggle slide down: Switch between Register/Login */
            $("#input-mail").val("");
            $("#input-pwd").val("");
            this.showSignIn(approach);
        }
    },
    showSignIn: function(approach) {
        $("#content").fadeTo("slow", 0.4); // Fade background
        $("#sign-in-label").text(approach=="login" ? "Enter login credentials" : "Create new account");
        $("#sign-in").addClass("display"); // Slide in div
        this.approach = approach;
        this.signInDisplayed = true;
        if(approach == "register") {
            $("#link-demo").addClass("hide");
        } else {
            $("#link-demo").removeClass("hide");
        }
    },
    hideSignIn: function() { 
        $("#sign-in").removeClass("display");
        $("#content").fadeTo("slow", 1); // Unfade background
        this.signInDisplayed = false;
    },
    submitSignIn: function() {
        if(this.approach == "login") {
            
            alert("Login");
            
        } else {
            alert("Regsiter")
        }
        this.hideSignIn();
    }
};

const clientManager = {
    client: null,
    setClient: function(client) {
        this.client = client;
        sidebar.setProfileSection();
    },
    viewAdapt: function(clientProfile) { 
        // Adapt view to type of client
        $("#main-wrapper").removeClass("not-logged-in");
        $("#main-wrapper").removeClass("developer");
        $("#main-wrapper").removeClass("admin");
        $("#main-wrapper").addClass(clientProfile);
        if(clientProfile == "developer") {
            $("#label-name").text(this.client.name.toUpperCase());
        } else if(clientProfile == "admin") {
            $("#label-name").text("ADMIN");
        }
    },
    logout: function() {
        if(demoMode.isOn) {
            demoMode.end();
        };
        this.viewAdapt("not-logged-in");
    }
};

const popup = {
    display: function(header, msgLines) {
        // Example call: popup.display("Hello", ["Line 1", "Line 2"])
        $("#popup-header").text(header);
        const popupMsg = document.getElementById("popup-msg");
        popupMsg.innerHTML = "";
        for(const line of msgLines) {
            popupMsg.insertAdjacentHTML("beforeend",
            `<p>${line}</p><br>`);
        };

       // $("#popup-msg").text(msg);
        $("#popup-container").addClass("display");
        $("#content-wrapper").fadeTo("slow", 0.3); // Fade background
    },
    discard: function() {
        $("#popup-container").removeClass("display");
        $("#content-wrapper").fadeTo("slow", 1); // Unfade background

    }
};

const demoMode = {
    isOn: false,
    demoClient: 
    {
        _id: 1,
        mail: "john@mail.com",
        isAdmin: false,
        name: "John Ohlsson",
        professionLabel: "Web developer",
        age: 30,
        country: "SWEDEN",
        yearsExperience: 5,
        pricePerHour: 1100,
        rating: 4.5,
        ratings: 7,
        memberSince: "2020-09-12",
        selfDescription: "A dedicated software developer.",
        banUntil: "never",
        skillset: [
            {
                skill: "Java",
                rate: 8
            },
            {
                skill: "HTML",
                rate: 2
            },
            {
                skill: "JavaScript",
                rate: 4
            },
            {
                skill: "Python",
                rate: 3
            },
            {
                skill: "MySql",
                rate: 6
            }  
        ]  
    },
    start: function() { // 'developer' / 'admin'
        clientManager.setClient(this.demoClient);
        clientManager.viewAdapt("developer");
        $("#main-wrapper").addClass("demo-mode");
        this.isOn = true;
        signIn.hideSignIn();
        refreshContent();
        popup.display("Demo mode started", 
        ["Explore the view when logged in as a software developer.",
        "API access is limited in demo mode."]);
    },
    end: function() {
        this.isOn = false;
        $("#main-wrapper").removeClass("demo-mode");
        popup.display("Demo mode ended", ["Hope you liked it."]);

    }
};
