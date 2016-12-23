(function(){
    
    "use strict";
    
    var app = angular.module("tradeCoreApp");
    
    app.factory("localStorageProvider", function($filter) {
        
        // GET ALL REGISTERED USERS
        var users = JSON.parse(localStorage.getItem("users")) || [];
        
        // CREATE UNIQUE ID
        function generateID() {
            // IF THERE ARE NO USERS SET THE ID TO 1
            if (!users.length) {
                return 1;
            } else {
                // IF THERE ARE USERS UPDATE ID
                return users[users.length - 1].id + 1;
            }
        }
        
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
        
        function insertUser(data) { 
            // SET DEFAULT VALUES
            data.admin = data.admin || false;
            data.registrationDate = $filter('date')(new Date(),'yyyy-MM-dd');
            data.lastUpdate = $filter('date')(new Date(),'yyyy-MM-dd');
            data.id = generateID();
            
            users.push(data);
            localStorage.setItem("users", JSON.stringify(users));
        }
        
        
        function checkPassword(user) {
            for (var i = 0; i < users.length; i++) {
                if (users[i].email === user.email) {
                    return users[i].password === user.password;
                }
            }
        }
        
        function setUserAsLoggedIn(user) {            
            localStorage.setItem("userId", user.id);
        }
        
        function getAllAdmins() {
            var admins = [];
            
            users.forEach(function(user) {
                if (user.admin) {
                    admins.push(user);
                }
            });
            
            return admins;
        }
        
        function getUserId(email) {
            for (var i = 0; i < users.length; i++) {
                if (users[i].email === email) {
                    return users[i].id;
                }
            }
        }
        
        function getUserData(id) {                  
            for (var i = 0; i < users.length; i++) {                
                if (users[i].id == id) {
                    return users[i];
                }
            }
            
            return null;
        }
        
        function updateUserInfo(user) {

            user.lastUpdate = $filter('date')(new Date(),'yyyy-MM-dd');
            for (var i = 0; i < users.length; i++) {
                if (users[i].id == user.id) {
                    users.splice(i,1,user);
                    localStorage.setItem("users", JSON.stringify(users));
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