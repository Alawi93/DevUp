const apiRequest = {
    getDevelopers: function (filter) {
        console.log(filter);
        $.ajax({
            type: "POST",
            url: "/api/developers",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(filter),
            success: function (response) {
                // Response = Array of developers, based on filter request
                // Clear content body and rebuild
                console.log(response.user);
                //const users = JSON.parse(response.user);
                const users = response.user;
                refreshContent(users);
            },
            error: function (response) {    
                handleError(response);
            }
        });
    },
    getSkillSets: function () {
        $.ajax({
            type: "GET",
            url: "/api/developers/skillsets",
            dataType: "json",
            contentType: "application/json",
            success: function (response) {
                // Response = Array of available skillsets 
                // to search on and include in profile
                console.log(response);
                //sidebar.availableSkills = response.skillset;
                sidebar.availableSkills = tempSkillsets;
                sidebar.setProfileSection();
                sidebar.setSearchSection();
            },
            error: function (response) {
                handleError(response);
            }
        });
    },
    register: function (email, pwd) {
        popup.display("Developer added", [email, pwd]) // TEMP
        // $.ajax({
        //     type: "POST",
        //     url: "/api/member/register",
        //     dataType: "json",
        //     data: JSON.stringify({email, pwd}), // -> {"email":"bla", "pwd": "blu"}
        //     success: function (response) {
        //         // Response = Client object
        //         if(clientManager.client.isAdmin) {
        //             popup.display("Developer added successfully", ["email"]);
        //         } else {
        //             // Make logged in directly
        //         clientManager.setClient(response.ffff); ???
        //         }
        //         // Refresh body content
        //         sidebar.requestDevelopers();
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
        $.ajax({
            type: "POST",
            url: "/api/member/login",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({email, pwd}),
            success: function (response) {
                // Response = Client object
                console.log(response);
                clientManager.loginSuccessful(response.ffff);
            },
            error: function (response) {
                console.log(response);
                handleError(response);
            }
        });
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
         $.ajax({
            type: "PUT",
            url: "/api/member/ban",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({ban, email}),
            success: function () {
                apiRequest.getDevelopers();
            },
            error: function (response) {
                handleError(response);
            }
        });
    },
    setDelete: function (email) {
        $.ajax({
           type: "DELETE",
           url: "/api/member",
           dataType: "json",
           contentType: "application/json",
           data: JSON.stringify({email}),
           success: function () {
               apiRequest.getDevelopers();
           },
           error: function (response) {
               handleError(response);
           }
       });
   }
}

function handleError(error) {
    /*For an error message with a non-200 HTTP status code, the content will not be parsed by jQuery.
    = Need a more manual approach to parsing the HTTP body content of non 200-replies into JSON.*/           
    console.log(error);
    // UPDATE + Call popup
    if (error.responseJSON.message.body) {
        popup.display("Error", [error.responseJSON.message.body]);
    } else {
        popup.display("Oops!", ['You probably lost server connection.']);
    }
}