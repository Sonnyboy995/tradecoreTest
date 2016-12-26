(function(){
    
    "use strict";
    
    var app = angular.module("tradeCoreApp");
    
    app.controller("UserController", ["$scope", "$location", "$routeParams","localStorageProvider", "User", "auth", "userRepo", "md5", function($scope, $location, $routeParams,localStorageProvider, User, auth, userRepo, md5) {
        
        /**
        * Remove logged in user from localStorage and redirect user to the login page
        */
        $scope.logOut = function() {
            auth.logOut();            
            $location.path("/login").search("");
        }
        
        $scope.currentUser = auth.user();
        
        var userId = $routeParams.id; 
        
        $scope.user = new User(userId);
        
        $scope.link1;
        $scope.link2;
            
        $scope.userIsAdmin = $scope.currentUser.isAdmin();
        
        /* Dinamicaly change navbar links text, based on user status (admin or regular user) */
        if ($scope.userIsAdmin) {
            $scope.link1 = "User profile";
            $scope.link2 = "Edit user"
        } else {
            $scope.link1 = "My Profile";
            $scope.link2 = "Edit"
        }
        
        /**
        * Redirect user to profile page when "profile" link is clicked
        */
        $scope.redirectToProfile = function() {
            $location.path("/user/" + $scope.user.id);
        };
        
        /**
        * Redirect user to edit page when "edit" link is clicked
        */
        $scope.redirectToEditPage = function() {
            $location.path("/user/" + $scope.user.id + "/edit");
        }
        
        $scope.allUsers = localStorageProvider.getAllUsers();
        
        /**
        * Redirect admin to the user profile page
        * 
        * @param {number} id - ID of user
        */
        $scope.showProfile = function(id) {
            $location.path("/user/" + id);
        }  
        
        /**
        * Edit user informations
        *
        * @param {object} User - object with user current informations
        */
        $scope.edit = function(user) {
            /* Take the value from password field */
            var newPassword = $("#password").val();
            
            /* If user set new password change the current password in user object */
            if (newPassword) {
                user.data.password = md5.createHash(newPassword);
            }
            
            userRepo.update(user);
            
            $location.path("/user/" + $scope.user.id);
            $("#confirmModal").modal("toggle");
        }
        
        /*
        * Gives the abbility to admin to change user status to admin, or regular user
        *
        * @param {object} user - User whose status is changed
        *
        * @return {boolean} false if user who try to change the status is not an admin
        */
        $scope.changeUserPremission = function(user) {
            if ($scope.currentUser.isAdmin()) {                
                user.data.admin = !user.data.admin;
            } else {
                return false; 
            }
        }
    }]);
    
}());