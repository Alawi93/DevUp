$(document).ready(function () {
    screenConfig.onResize();       
});

$(window).resize(function () {
    screenConfig.onResize();
});

// ___________________________ SCREEN SIZE, MENUES & BEHAVIOUR _________________________________

/* Object literal: Avoid collisions/overwrites with global window properties/variables. */
/* A similar approach would be the Module Pattern, using an anonymous function instead of an object. */
const screenConfig = {
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
    clientAdapt: function(clientProfile) { // defualt(not looged in) / developer / admin
        // Adapt view to type of client

    }
};
