(function() {
    
    "use strict";
    
    var app = angular.module("tradeCoreApp");
    
    app.factory("auth", function(localStorageProvider, adminProvider, $q, $location, User, userRepo) {
        
        function user() {
            if (isUserLoggedIn()) {
                return new User(localStorage.getItem("userId"));
            } 
            
            return false;
        }
        
        function register(formData, callback) {
            var user = userRepo.findByEmail(formData.email);
            
            if (user) {                
                  callback("User with email " + formData.email + " already exist!");
            } else {
                userRepo.create(formData);
                callback(null);
            }
        }  
        
        function isUserLoggedIn() {
            return null !== localStorage.getItem("userId");
        }
        
        function logOut() {
            localStorage.removeItem("userId");
        }
        
        function logIn(user) {
            localStorageProvider.setUserAsLoggedIn(user);
        }
        
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
        
        
        return {
            register: register,
            authenticateUser: authenticateUser,
            user: user,
            logIn: logIn,
            logOut: logOut
        }
    });
    
}());