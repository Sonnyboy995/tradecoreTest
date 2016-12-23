(function(){
    // TODO: COMEBACK HERE!
    "use strict";
    
    var app = angular.module("tradeCoreApp");
    
    app.factory("resolveRoutes", function(auth, $routeParams, $q, $location, middlewareStatus) {
        
        function secureUserPage(id) {
            var loggedInUser = auth.user();   
            
            if (!loggedInUser) {                                               
                return {
                    allowed: false,
                    path: "/login"
                };
            } else if (id !== loggedInUser.id && !loggedInUser.data.admin) {                 
                return {
                    allowed: false,
                    path: "/user/" + loggedInUser.id
                }                
            } else {                
                return {
                    allowed: true
                }
            }
        }
        
        function secureAdminPage() {
            var loggedInUser = auth.user();
                
            if (!loggedInUser) {
                return {
                    allowed: false,
                    path: "/login"
                };
            } else if (!loggedInUser.isAdmin()){                
                return {
                    allowed: false,
                    path: "/user/" + loggedInUser.id
                }               
            } else {
                return {
                    allowed: true
                }
            }
        }
        
        function loginRedirect() {
            var loggedInUser = auth.user();
                       
            if (loggedInUser && loggedInUser.isAdmin()) {
                return {
                    allowed: false,
                    path: "/admin"
                }
            } else if (loggedInUser) {
                return {
                    allowed: false,
                    path: "/user/" + loggedInUser.id 
                }
            } else {
                return {
                    allowed: true
                }
            }
        }
        
        return {
            loginRedirect: loginRedirect,
            secureUserPage: secureUserPage,
            secureAdminPage: secureAdminPage
        }
    });
    
}());