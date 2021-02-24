const apiRequest = {
    getDevelopers: function(filter, isLoadMore) {
        /*
          Filter object structure:
          {
            from_id: 0,
            include_banned: false,
            skills: [],
            name_start: "",
            price_max:10000
        }
         */
        // Implement
        refreshContent(); // TEMP
        popup.display("API requests not supported in frontend prototype", [
            "Skills: " + (filter.skills ? "Not specified" : filter.skills), 
            "Max price: " + filter.price_max, 
            "Name start: " + (filter.name_start=="" ? "Not specified" : filter.name_start)]);
        console.log("API request")
        console.log(filter)
        
        // On success: 
        // If isLoadMore: Append result to existing content body
        // Else: Clear content body and rebuild
    },
    getSkillRegister: function() {
        // UPDATE: From server -> sidebar.availableSkills
        sidebar.availableSkills = tempSkillsets; // TEMP
        // On success:
        sidebar.setProfileSection();
        sidebar.setSearchSection();

    },
    register: function(mail, pwd) {
        // On success: is logged in: clientmanager.setClient()
    },
    login: function(mail, pwd) {
        // Implement
        // On success: clientmanager.setClient()
        popup.display("Login not supported in frontend prototype", [
            "Try the demo mode."]);
    },
    logout: function() {
        // Implement
    },
    
    updateProfile: function(updatedClient) {
        if(demoMode.isOn) {
            clientManager.setClient(updatedClient);
            popup.display("Success!", ["Demo profile updated."])
        }
        // Send update request to server
        // On success: basically same as if demoMode == on
    }
}