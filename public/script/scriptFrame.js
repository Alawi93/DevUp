$(document).ready(function () {
    $("#main-wrapper").addClass("not-logged-in"); // Remove for dev purposes
    // apiRequest.getSkillSets();
    sidebar.init();
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
    availableSkills: [], // Load from server
    searchFilter: {}, // Filter object for searching developers
    onResize: function () {
        this.bigScreen = $(window).width() > (this.minWidthContent + this.minWidthSidebar);
        if (this.bigScreen) {
            $("#main-wrapper").addClass("big-screen");
            $("#main-wrapper").addClass("menu-displayed");
            this.menuDisplayed = true;
        } else {
            $("#main-wrapper").removeClass("big-screen");
            $("#main-wrapper").removeClass("menu-displayed");
            this.menuDisplayed = false;
        }
    },
    init: function () { // Initialize sidebar at page load
        this.onResize();
        // Initialize search filter object
        this.searchFilter =
        {
            is_admin: false,
            skills: [],
            name_start: "",
            price_max:500
        };
        // Load available skillset from server
        apiRequest.getSkillSets();
        
        // Event handler for submit profile changes
        $("#profile-form").on("submit", function (event) {
            event.preventDefault(); // Prevent redirect or reload, but still validate form fields.
            sidebar.submitProfileUpdate();
        });
        // Event handler for submit developer search
        $("#filter-form").on("submit", function (event) {
            event.preventDefault(); 
            sidebar.requestDevelopers();
        });
        // Event handler for submit create developer (admin)
        $("#admin-form").on("submit", function (event) {
            event.preventDefault(); 
            sidebar.adminAddDevloper();
        });

    },
    toggleMenu: function () {
        if (this.menuDisplayed) {
            $("#main-wrapper").removeClass("menu-displayed");
        } else {
            $("#sidebar").scrollTop(0);
            $("#main-wrapper").addClass("menu-displayed");
        };
        this.menuDisplayed = !this.menuDisplayed;
    },
    toggleDropdown: function (item) { /* Sidebar items */
        if (!this.menuDisplayed) {
            this.toggleMenu();
        }
        $("#" + item).toggleClass("dropdown");
    },
    setProfileSection: function () {
        const client = clientManager.client;
        if (client) { // Safety measure
            if (!client.isAdmin) {
                const $profileSection = $("#edit-profile");
                $profileSection.find("#name").val(client.name);
                $profileSection.find("#mail").val(client.email);
                $profileSection.find("#profession").val(client.professionLabel);
                $profileSection.find("#age").val(client.age);
                $profileSection.find("#country").val(client.country);
                $profileSection.find("#years-experience").val(client.yearsExperience);
                $profileSection.find("#hour-rate").val(client.pricePerHour);
                $profileSection.find("#github").val(client.github);
                $profileSection.find("#linkedin").val(client.linkedin);
                $profileSection.find("#description").val(client.selfDescription);

                // Convert skillsets array to map for key-value access (skill, rating)
                let skillMap = new Map();
                for (availableSkill of this.availableSkills) {
                    skillMap.set(availableSkill, 0); //set skill rate to default 0
                };
                // Integrate client's skillset ratings
                for (clientSkill of client.skillset) {
                    skillMap.set(clientSkill.skillName, clientSkill.skillRate);
                };
                // Update Profile section in sidebar
                const $skillSection = $profileSection.find("#skillset");
                // Clear div
                $skillSection.empty();
                // Rebuild div (add sliders for each skill)
                for (let [key, value] of skillMap) {
                    var skill = key;
                    var rating = value;
                    $skillSection.append(
                        `<label for="${skill}">${skill}</label>
                    <input type="range" id="${skill}" class="slider" min="0" max="10" value="${rating}"><br>`);
                };
                // Add evenlisteners for custom slider behaviours
                var sliders = document.querySelectorAll("#skillset .slider");

                sliders.forEach(function (slider) {
                    updateSlider(slider);
                    slider.addEventListener("mousemove", function () { updateSlider(slider) });
                    slider.addEventListener("click", function () { updateSlider(slider) });
                    slider.addEventListener("touchmove", function() {updateSlider(slider)}); // Mobile
                });

                // Event handler for skillset sliders
                function updateSlider(slider) {
                    var x = slider.value * 10;
                    var color = "linear-gradient(90deg, var(--theme-main) " + x + "%, grey " + x + "%)";
                    slider.style.background = color;
                };
            };
        };
    },
    submitProfileUpdate: function () {
        // See eventlistener setup in 'sidebar.init()'
        // Build an updated client object:
        const upd_client = clientManager.client;
        // 1. Collect updatable fields from profile section:
        const $profileSection = $("#edit-profile");
        upd_client.name = $profileSection.find("#name").val();
        upd_client.email = $profileSection.find("#mail").val();
        upd_client.professionLabel = $profileSection.find("#profession").val();
        upd_client.age = $profileSection.find("#age").val();
        upd_client.country = $profileSection.find("#country").val();
        upd_client.yearsExperience = $profileSection.find("#years-experience").val();
        upd_client.pricePerHour = $profileSection.find("#hour-rate").val();
        upd_client.github = $profileSection.find("#github").val();
        upd_client.linkedin = $profileSection.find("#linkedin").val();
        upd_client.description = $profileSection.find("#description").val();
        // 2. Collect and filter skills with rating > 0
        const upd_skillset = [];
        const skillSliders = document.querySelectorAll("#skillset .slider");
        for (skillSlider of skillSliders) {
            skillName = skillSlider.id;
            skillRate = skillSlider.value;
            if (skillRate > 0) {
                upd_skillset.push({
                    skillName: skillName,
                    skillRate: skillRate
                });
            };
        };
        // Overwrite current skillset
        upd_client.skillset = upd_skillset;
        // 3. Make server request
        apiRequest.updateProfile(upd_client);
    },
    setSearchSection() {
        // Add evenlisteners for custom price slider behaviour
        var slider = document.querySelector("#filter-search .slider");
        var label = document.querySelector("#filter-search #price-selected");
        slider.addEventListener("mousemove", function () { updateSlider(slider, label) });
        slider.addEventListener("click", function () { updateSlider(slider, label) });
        slider.addEventListener("touchmove", function() {updateSlider(slider, label)}); // Mobile

        function updateSlider(slider, label) {
            // Update slider colors
            var x = slider.value;
            var color = "linear-gradient(90deg, var(--theme-main) " + x + "%, grey " + x + "%)";
            slider.style.background = color;
            // Update label
            label.innerHTML = slider.value * 5; //0-100-> 0-500  
        };
        // Set an initial slider value
        updateSlider(slider, label);

        // Update available skillsets
        const skillSection = document.querySelector("#filter-search #filter-skills");
        // Clear section
        skillSection.innerHTML = "";
        // Rebuild section
        for(skill of this.availableSkills) {
            skillSection.insertAdjacentHTML("beforeend", 
            `<label class="checkbox-container">${skill}
            <input type="checkbox" id="${skill}" onclick="sidebar.checkboxUpdate(this);">
            <span class="checkmark"></span>
            </label><br>`);
        };
    },
    checkboxUpdate: function(checkbox) {
        // Set parent label to white font if checkbox is checked
        checkbox.parentNode.style.color = checkbox.checked ? "white" : "";
    },
    requestDevelopers: function () {
       // Update filter object 'searchFilter'
       // NOTE: Server verifies client search privelegies.
        if(clientManager.client)  { // Security measure
            this.searchFilter.is_admin = clientManager.client.isAdmin;
        }
        // Update filter object according to sidebar dropdown: "Filter search"
        const $searchSection = $("#filter-search");
        this.searchFilter.name_start = $searchSection.find("#filter-name").val();
        this.searchFilter.price_max = $searchSection.find("#price-selected").text();
        // Load checked skills
        this.searchFilter.skills = []; // Clear skill list
        $searchSection.find("input[type=checkbox]").each(function() {
            if(this.checked) {
                const skill = this.id;
                sidebar.searchFilter.skills.push(skill);
            };
        });
        // API request, passing the updated search filter object
        apiRequest.getDevelopers(this.searchFilter);
        this.onResize();
    },
    adminAddDevloper: function() {
        // Fetch data
        const email = $("#admin-tools").find("#admin-add-email").val();
        const pwd = $("#admin-tools").find("#admin-add-pwd").val();
        // Empty input fields
        $("#admin-tools").find("#admin-add-email").val("");
        $("#admin-tools").find("#admin-add-pwd").val("");
        // API request
        apiRequest.register(email, pwd);
        sidebar.onResize();
    },
    requestLogout: function () {
        if (demoMode.isOn) {
            demoMode.end();
            clientManager.viewAdapt("not-logged-in");
            sidebar.onResize(); 
        } else {
            apiRequest.logout();
        }
        this.onResize();
    }
};

const signIn = {  // Drop down from header
    approach: "login", // 'login' / 'register'
    signInDisplayed: false,
    toggleSignIn: function (approach) {
        if (this.signInDisplayed && this.approach == approach) {
            this.hideSignIn();
        } else {
            /* Instead of toggle slide down: Switch between Register/Login */
            $("#input-mail").val("");
            $("#input-pwd").val("");
            this.showSignIn(approach);
        }
    },
    showSignIn: function (approach) {
        $("#content").fadeTo("slow", 0.4); // Fade background
        $("#sign-in-label").text(approach == "login" ? "Enter login credentials" : "Create new account");
        $("#sign-in").addClass("display"); // Slide in div
        this.approach = approach;
        this.signInDisplayed = true;
        if (approach == "register") {
            $("#link-demo").addClass("hide");
        } else {
            $("#link-demo").removeClass("hide");
        }
    },
    hideSignIn: function () {
        $("#sign-in").removeClass("display");
        $("#content").fadeTo("slow", 1); // Unfade background
        // Clear fields
        $("#sign-in-header").find("#input-mail").empty();
        $("#sign-in-header").find("#input-pwd").empty();;
        this.signInDisplayed = false;
    },
    submit: function () {
        // Fetch data
        const email = $("#sign-in-header").find("#input-mail").val();
        const pwd = $("#sign-in-header").find("#input-pwd").val();
        // Clear input fields
        $("#sign-in-header").find("#input-mail").empty();
        $("#sign-in-header").find("#input-pwd").empty();
        // API request
        if (this.approach == "login") {
            apiRequest.login(email, pwd);
        } else {
            apiRequest.register(email, pwd);
        }
        // Adapt view
        this.hideSignIn();
        sidebar.onResize();
    }
};

const clientManager = {
    client: null,
    loginSuccessful: function (client) {
        this.setClient(client);      
        this.viewAdapt(client.isAdmin ? "admin" : "developer");
    },
    logoutSuccessful: function() {
        this.client = null;
        this.viewAdapt("not-logged-in");
    },
    setClient: function(client) {
        this.client = client;
        sidebar.setProfileSection();
        $("#header #label-name").text(this.client.name.toUpperCase());
    },
    viewAdapt: function (clientProfile) {
        // Adapt view to type of client
        $("#main-wrapper").removeClass("not-logged-in");
        $("#main-wrapper").removeClass("developer");
        $("#main-wrapper").removeClass("admin");
        $("#main-wrapper").addClass(clientProfile);
    }
};

const popup = {
    display: function (header, msgLines) {
        // Example call: popup.display("Hello", ["Line 1", "Line 2"])
        $("#popup-header").text(header);
        const popupMsg = document.getElementById("popup-msg");
        popupMsg.innerHTML = "";
        for (const line of msgLines) {
            popupMsg.insertAdjacentHTML("beforeend",
                `<p>${line}</p><br>`);
        };
        // $("#popup-msg").text(msg);
        $("#popup-container").addClass("display");
        $("#content-wrapper").fadeTo("slow", 0.3); // Fade background
    },
    discard: function () {
        $("#popup-container").removeClass("display");
        $("#content-wrapper").fadeTo("slow", 1); // Unfade background

    }
};

const demoMode = {
    isOn: false,
    demoClient:
    {
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
    },
    start: function () { // 'developer' / 'admin'
        clientManager.loginSuccessful(this.demoClient); // REMOVE LATER?
        $("#main-wrapper").addClass("demo-mode");
        this.isOn = true;
        signIn.hideSignIn();
        sidebar.onResize();
        popup.display("Demo mode started",
            ["Explore the view when logged in as a software developer.",
                "API access is limited in demo mode."]);
        apiRequest.getDevelopers(sidebar.searchFilter);
    },
    end: function () {
        this.isOn = false;
        $("#main-wrapper").removeClass("demo-mode");
        clientManager.logoutSuccessful();
        popup.display("Demo mode ended", ["Continue to browse developers, or create an account."]);
    }
};
