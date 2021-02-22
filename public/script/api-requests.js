const apiRequest = {
    login: function(mail, pwd) {
        // Implement
    },
    logout: function() {
        // Implement
    },
    getDevelopers: function(filter) {
        // Implement
    },
    updateProfile: function(updatedClient) {
        if(demoMode.isOn) {
            clientManager.client = updatedClient;
            sidebar.setProfileSection();
            popup.display("Success!", ["Demo profile updated."])
        }
        alert(updatedClient.name);
        // Send update request to server
    }
}