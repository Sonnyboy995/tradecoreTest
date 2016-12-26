(function (){
    
    "use strict";
    
    var app = angular.module("tradeCoreApp");
    
    app.controller("AuthController", ["$scope", "$location","auth", "localStorageProvider", "md5", function($scope, $location, auth, localStorageProvider, md5) {
        
        var queryString = $location.search();
        
        $scope.errorMessage = null;
        $scope.successMessage = queryString.register ? "You are registered successfully. You can sign in." : null;
        
        /* Collect user registration info */
        $scope.registrationInfo = {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        };
        
        /* Collect user login info */
        $scope.loginInfo = {
            email: "",
            password: ""
        };
        
        /**
        * Takes informations that user typed in login form and process them
        *
        * @param {object} formData - values form login form
        */
        $scope.login = function(formData) {
            auth.authenticateUser(formData, function(errMsg, user) {                
                if (errMsg) {
                    $scope.errorMessage = errMsg;                    
                } else {                    
                    $scope.errorMessage = null;
                    if (user.isAdmin()) {                        
                        $location.path("/admin");
                    } else {                        
                        $location.path("/user/" + user.id);
                    }
                }
            });
        }
        
        /**
        * Takes informations that user typed in registration form and process them
        *
        * @param {object} registrationInfo - values from registration form
        */
        $scope.signUp = function(registrationInfo) {             
             auth.register(registrationInfo, function(err) {
                 if (err) {
                     $scope.errorMessage = err;
                 } else {
                     $scope.errorMessage = null;
                     $scope.successMessage = "You are registered successfuly!";
                     $location.path("/login").search("register", "true");
                 }
             });                  
        };
    }]);
    
}());