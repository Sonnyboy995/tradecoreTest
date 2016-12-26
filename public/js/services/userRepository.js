(function(){
    
    "use strict";
    
    var app = angular.module("tradeCoreApp");
    
    app.factory("userRepo", function(localStorageProvider, md5) {
        
        var db = localStorageProvider;
        
        /**
        * Get all users form localStorage
        *
        * @return {array} Array that contains all users objects
        */
        function getAllUsers() {
            return db.getAllUsers();
        }
        
        /**
        * Get user data by id
        *
        * @param {number} id - id of the user
        *
        * @return {object} Data of the user with ID provided as function param
        */
        function getUserData(id) {            
            return db.getUserData(id);
        }
        
        /**
        * Find user by email
        *
        * @param {string} email - user email
        *
        * @return {object} All data of the user with email provided as function param
        */
        function findByEmail(email) {
            var users = getAllUsers();

            var user = users.filter(function(user) {
                return user.email === email;
            });

            if (user.length > 0) {                
                return user[0];
            }
            

            return false;
        }
        
        /**
        * Creates new user in localStorage
        *
        * @param {object} data - data provided by user in registration form
        */
        function create(data) {
            data.password = md5.createHash(data.password);
            db.insertUser(data);
        }
        
        /**
        * Update user info
        *
        * @param {object} data - data provided by user in edit form
        */
        function update(data) {            
            db.updateUserInfo(data.data);
        }
        
        return {
            getAllUsers: getAllUsers,
            findByEmail: findByEmail,
            getUserData: getUserData,
            create: create,
            update: update
        }
    });
}());