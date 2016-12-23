(function(){
    
    "use strict";
    
    var app = angular.module("tradeCoreApp");
    
    app.controller("UserController", ["$scope", "$location", "$routeParams","localStorageProvider", "User", "auth", "userRepo", "md5", function($scope, $location, $routeParams,localStorageProvider, User, auth, userRepo, md5) {
        
        $scope.logOut = function() {
            auth.logOut();            
            $location.path("/login");
        }
        
        $scope.currentUser = auth.user();
        
        var userId = $routeParams.id; 
        
        $scope.user = new User(userId);
        
        $scope.link1;
        $scope.link2;
            
        $scope.userIsAdmin = $scope.currentUser.isAdmin();
        
        // CHANGE MENU TEXT BASED ON USER STATUS
        if ($scope.userIsAdmin) {
            $scope.link1 = "User profile";
            $scope.link2 = "Edit user"
        } else {
            $scope.link1 = "My Profile";
            $scope.link2 = "Edit"
        }
        
        $scope.redirectToProfile = function() {
            $location.path("/user/" + $scope.user.id);
        };
        
        $scope.redirectToEditPage = function() {
            $location.path("/user/" + $scope.user.id + "/edit");
        }
        
        $scope.allUsers = localStorageProvider.getAllUsers();
        
        $scope.showProfile = function(id) {
            $location.path("/user/" + id);
        }  
        
        $scope.edit = function(user) {
            var newPassword = $("#password").val();
            
            if (newPassword) {
                user.data.password = md5.createHash(newPassword);
            }
            
            userRepo.update(user);
            
            $location.path("/user/" + $scope.user.id);
            $("#confirmModal").modal("toggle");
        }
        
        $scope.changeUserPremission = function(user) {
            if ($scope.currentUser.isAdmin()) {                
                user.data.admin = !user.data.admin;
            } else {
                return false; 
            }
        }
    }]);
    
}());