const apiRequest = {
    getDevelopers: function(filter, isLoadMore) {
        // Implement
        refreshContent(); // TEMP
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