(function(){
    
    "use strict";
    
    var app = angular.module("tradeCoreApp");
    
    app.factory("localStorageProvider", function($filter) {
        
        /* Get all users from localStorage (if no users was found set users variable to empty array) */
        var users = JSON.parse(localStorage.getItem("usersCollection")) || [];
        
        /**
        * Generate unique ID
        */
        function generateID() {            
            if (!users.length) {
                /* if users array is empty set the first id to 1 */
                return 1;
            } else {
                /* get the last user id and increment it by 1 */
                return users[users.length - 1].id + 1;
            }
        }
        
        /**
        * Loop trough users array and check if there is a user with provided email
        *
        * @param {string} email - value form email input
        *
        * @return {boolean} true if user with the same email was found, else returns false
        */
        function checkIfUserExist(email) {
            if (users) {
                for (var i = 0; i < users.length; i++) {
                    if (users[i].email === email && users[i].admin === false) {
                        return true;
                    }
                }
                                
                return false;
            } else {                
                return false;
            }
        }
        
        /**
        * Store user data in localStorage
        *
        * @param {object} data - user info provided in registration form
        */
        function insertUser(data) { 
            /* Set default values */
            data.admin = data.admin || false;
            data.registrationDate = $filter('date')(new Date(),'yyyy-MM-dd');
            data.lastUpdate = $filter('date')(new Date(),'yyyy-MM-dd');
            data.id = generateID();
            
            users.push(data);
            localStorage.setItem("usersCollection", JSON.stringify(users));
        }
        
        /**
        * Loop trough users array and compare passwords with user password provided as function param
        *
        * @param {object} user - user data
        */
        function checkPassword(user) {
            for (var i = 0; i < users.length; i++) {
                if (users[i].email === user.email) {
                    return users[i].password === user.password;
                }
            }
        }
        
        /**
        * Set the id of curently logged in user in localStorage
        *
        * @param {object} user - user data
        */
        function setUserAsLoggedIn(user) {            
            localStorage.setItem("userId", user.id);
        }
        
        /**
        * Loop trough users array and collect all users with admin status
        *
        * @return {array} array that contains all users with admin status 
        */
        function getAllAdmins() {
            var admins = [];
            
            users.forEach(function(user) {
                if (user.admin) {
                    admins.push(user);
                }
            });
            
            return admins;
        }
        
        /**
        * Find user with provided email and get his id
        *
        * @param {string} email - user email
        *
        * @return {number} id - user id
        */
        function getUserId(email) {
            for (var i = 0; i < users.length; i++) {
                if (users[i].email === email) {
                    return users[i].id;
                }
            }
        }
        
        /**
        * Find user with provided id and return his data
        *
        * @param {number} id - user id
        *
        * @return {object} User data. Return null if no user was found
        */
        function getUserData(id) {                  
            for (var i = 0; i < users.length; i++) {                
                if (users[i].id == id) {
                    return users[i];
                }
            }
            
            return null;
        }
        
        /**
        * Find user by id and update his informations
        * 
        * @param {object} user - new user informations
        */
        function updateUserInfo(user) {

            user.lastUpdate = $filter('date')(new Date(),'yyyy-MM-dd');
            for (var i = 0; i < users.length; i++) {
                if (users[i].id == user.id) {
                    users.splice(i,1,user);
                    localStorage.setItem("usersCollection", JSON.stringify(users));
                }
            }
        }
        
        function getAllUsers() {
            return users;
        }
        
        
        return {
            checkIfUserExist: checkIfUserExist,
            insertUser: insertUser,
            checkPassword: checkPassword,
            setUserAsLoggedIn: setUserAsLoggedIn,
            getAllAdmins: getAllAdmins,
            getUserId: getUserId,
            updateUserInfo: updateUserInfo,
            getAllUsers: getAllUsers,
            getUserData: getUserData
        }
    });
    
}());