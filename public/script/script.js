$(document).ready(function () {
    $("#main-wrapper").addClass("not-logged-in"); // Remove for dev purposes
    sidebar.onResize();       
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
}

const demoMode = {
    isOn: false,
    demoClient: 
    {
        email: "john@mail.com",
        name: "John Ohlsson",
        isAdmin: false
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
}
