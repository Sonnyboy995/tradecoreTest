(function (){
    
    "use strict";
    
    var app = angular.module("tradeCoreApp");
    
    app.controller("AuthController", ["$scope", "$location","auth", "localStorageProvider", "md5", function($scope, $location, auth, localStorageProvider, md5) {
        
        $scope.errorMessage = null;
        $scope.successMessage = null;
        
        // COLLECT REGISTRATION INFORMATIONS
        $scope.registrationInfo = {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        };
        
        // COLLECT LOGIN INFORMATIONS
        $scope.loginInfo = {
            email: "",
            password: ""
        };
        
        
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
        
        
        $scope.signUp = function(registrationInfo) {             
             auth.register(registrationInfo, function(err) {
                 if (err) {
                     $scope.errorMessage = err;
                 } else {
                     $scope.errorMessage = null;
                     $scope.successMessage = "You are registered successfuly!";
                     $location.path("/login");
                 }
             });                  
        };
    }]);
    
}());