(function(){
    
    "use strict";
    
    var app = angular.module("tradeCoreApp");
    
    app.controller("AdminController", ["$scope", "$location", "localStorageProvider", function($scope, $location, localStorageProvider) {
        
        $scope.logOut = function() {
            localStorageProvider.logOut();
            $location.path("/login");
        };
        
        $scope.allUsers = localStorageProvider.getAllUsers();
        
        $scope.showProfile = function(id) {
            $location.path("/user/" + id);
        }        
        
    }]);
    
}());