(function(){
    
    "use strict";
    
    var app = angular.module("tradeCoreApp");
    
    app.factory("resolveRoutes", function(auth, $routeParams, $q, $location) {
        
        /**
        * Restrict users access to user pages
        *
        * @param {number} id - ID of curently logged in user
        *
        * @return {object} 'allowed' property is set to false if user can't access the page, path propery is set to url value where to redirect the user. if user can access the page 'allowed' propery is set to true.
        *
        */
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
        
        /**
        * Restrict users access to admin page
        *
        * @return {object} 'allowed' property is set to false if user can't access the page, path propery is set to url value where to redirect the user. if user can access the page 'allowed' propery is set to true.
        *
        */
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
        
        /**
        * Redirect from login/registration page if user is already logged in
        *
        * @return {object} 'allowed' property is set to false if user can't access the page, path propery is set to url value where to redirect the user. if user can access the page 'allowed' propery is set to true.
        */
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