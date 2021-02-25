const apiRequest = {
    getDevelopers: function (filter) {
        // console.log(filter);
        // $.ajax({
        //     type: "POST",
        //     url: "/api/developers",
        //     dataType: "json",
        //     data: JSON.stringify(filter),
        //     success: function (response) {
        //         // Response = Array of developers, based on filter request
        //         //Clear content body and rebuild
        //         refreshBody(response);
        //     },
        //     error: function (response) {
        //         /**
        //          * For an error message with a non-200 HTTP status code, the content will not be parsed by jQuery.
        //          * = Need a more manual approach to parsing the HTTP body content of non 200-replies into JSON.
        //          */
        //         var responseJSON = response.responseJSON;   ??????         
        //         handleError(responseJSON);
        //     }
        // });

        // TEMP:
        console.log(filter);
        refreshContent(); // TEMP        
    },
    getSkillSets: function () {
        // $.ajax({
        //     type: "GET",
        //     url: "/api/developers/skillsets",
        //     dataType: "json",
        //     success: function (response) {
        //         // Response = Array of available skillsets 
        //         // to search on and include in profile
        //         sidebar.availableSkills = response.hhhh !!!!!
        //         sidebar.setProfileSection();
        //         sidebar.setSearchSection();
        //     },
        //     error: function (response) {
        //         handleError(response);
        //     }
        // });

        // TEMP:
        // UPDATE: From server -> sidebar.availableSkills
        sidebar.availableSkills = tempSkillsets; // TEMP
        sidebar.setProfileSection();
        sidebar.setSearchSection();
    },
    register: function (email, pwd) {
        // $.ajax({
        //     type: "POST",
        //     url: "/api/member/register",
        //     dataType: "json",
        //     data: JSON.stringify({email, pwd}), // -> {"email":"bla", "pwd": "blu"}
        //     success: function (response) {
        //         // Response = Client object
        //         clientManager.setClient(response.ffff); ???
        //     },
        //     error: function (response) {
        //         handleError(response); ????
        //     }
        // });
    },
    tryAutoLogin: function () {
        // $.ajax({
        //     type: "GET",
        //     url: "/api/member/isloggedin",
        //     dataType: "json",
        //     success: function (response) {
        //         // Response = Client object
        //         clientManager.loginSuccessful(response.ffff); ???
        //     },
        //     error: function (response) {
        //         handleError(response); ????
        //     }
        // });
    },
    login: function (email, pwd) {
        // $.ajax({
        //     type: "POST",
        //     url: "/api/member/login",
        //     dataType: "json",
        //     data: JSON.stringify({email, pwd}),
        //     success: function (response) {
        //         // Response = Client object
        //         clientManager.loginSuccessful(response.ffff); ???
        //     },
        //     error: function (response) {
        //         handleError(response); ????
        //     }
        // });
    },
    logout: function () {
        // $.ajax({
        //     type: "GET",
        //     url: "/api/member/logout",
        //     dataType: "json",
        //     success: function () {
        //         clientManager.logoutSuccessful();
        //     },
        //     error: function (response) {
        //         handleError(response); ????
        //     }
        // });
    },
    updateProfile: function (updatedClient) {
        console.log(updatedClient);
        if (demoMode.isOn) {
            clientManager.setClient(updatedClient);
            popup.display("Success!", ["Demo profile updated."]);
        } else {
            // $.ajax({
            //     type: "PUT",
            //     url: "/api/member",
            //     dataType: "json",
            //     data: JSON.stringify(updatedClient),
            //     success: function (response) {
            //         // Response = Updated client object
            //         clientManager.setClient(response.ffff); ???
            // },
            //     error: function (response) {
            //         handleError(response); ????
            // }
            // });
        };
    },
    setBan: function (ban, email) {
        //  $.ajax({
        //     type: "PUT",
        //     url: "/api/member/ban",
        //     dataType: "json",
        //     data: JSON.stringify({ban, email}),
        //     success: function () {
        //         // Proceed to set ban in GUI
        //         // maybe reolad all developers from the list to the body?
        //     },
        //     error: function (response) {
        //         handleError(response); ????
        //     }
        // });
    }
}

function handleError(error) {

    // UPDATE + Call popup
    if (error.msg) {
        alert("Error: " + error.msg); // Error msg from server API
    } else {
        alert("Oops! You probably lost server connection.")
    }
}