(function() {
    
    "use strict";
    
    var app = angular.module("tradeCoreApp");
    
    app.factory("auth", function(localStorageProvider, adminProvider, $q, $location, User, userRepo) {
        
        /**
        * Get data of current logged in user
        *
        * @return {object} instance of user constructor function, return false if no user was found
        */
        function user() {
            if (isUserLoggedIn()) {
                return new User(localStorage.getItem("userId"));
            } 
            
            return false;
        }
        
        /**
         * Register user in localStorage.
         * 
         * @param {object} formData - User register info
         * @param {function} callback - The callback that handle the response 
         */
        function register(formData, callback) {
            var user = userRepo.findByEmail(formData.email);
            
            if (user) {                
                  callback("User with email " + formData.email + " already exist!");
            } else {
                userRepo.create(formData);
                callback(null);
            }
        } 
        /**
         * This callback sends the error message as response if there is an error.
         * 
         * @callback registerCallback
         * 
         * @param {string} errorMessage
         * 
         */

        
        /**
        * Check if user is curently logged in
        *
        * @return {number} id of logged in user or null if there is no logged in user
        */
        function isUserLoggedIn() {
            return null !== localStorage.getItem("userId");
        }
        
        /* remove id of logged in user from localStorage */
        function logOut() {
            localStorage.removeItem("userId");
        }
        
        /* set id of logged in user in localStorage */
        function logIn(user) {
            localStorageProvider.setUserAsLoggedIn(user);
        }
        
        /**
        * Authenticate user email and password
        *
        * @param {object} formData - user login info
        * @param {function} callback - handle the response
        */
        function authenticateUser(formData, callback) {
            var userData = userRepo.findByEmail(formData.email);
            var user = new User(userData.id, userData);
            
            if (user.data) {
                if (user.correctPassword(formData.password)) {
                    logIn(user);
                    callback(null, user);
                } else {
                    callback("Wrong Password. Please try again!", null);
                }
            } else {
                callback("User does not exist.", null);
            }                    
        }
        /**
         * This callback sends the error message as response if there is an error, else sends user data.
         * 
         * @callback authenticateUser callback
         * 
         * @param {string} errorMessage
         * @param {object} user data 
         * 
         */
        
        
        return {
            register: register,
            authenticateUser: authenticateUser,
            user: user,
            logIn: logIn,
            logOut: logOut
        }
    });
    
}());