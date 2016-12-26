(function() {
    
    "use strict";
    
    var app = angular.module("tradeCoreApp", ["ngRoute", "ngMd5"]);
    
    app.config(["$routeProvider", "$provide", "$locationProvider", function($routeProvider, $provide,$locationProvider, userRepo) {
        
        $routeProvider
            .when("/login", {
                controller: "AuthController",
                templateUrl: "views/login.html",
                resolve: {                    
                    "redirect": function(resolveRoutes, $q) {                        
                        return resolveRoutes.loginRedirect();
                    }
                }
            })
            .when("/register", {
                controller: "AuthController",
                templateUrl: "views/register.html"
            })
            .when("/admin", {
                controller: "UserController",
                templateUrl: "views/admin.html"
            })
            .when("/user/:id", {
                controller: "UserController",
                templateUrl: "views/userProfile.html"
            })
            .when("/user/:id/edit",{
                controller: "UserController",
                templateUrl: "views/editPage.html"
            })
            .otherwise({
                redirectTo: "/login"
            });
        
        $provide.provider("adminProvider", function() {
            
            this.$get = function(userRepo) {
                
                var admin = {
                        firstName: "Tradecore",
                        lastName: "Tradecore",
                        email: "trade@tradecore.com",
                        password: "tradecore",
                        admin: true
                    }
                
                if (!userRepo.findByEmail(admin.email)) {
                    userRepo.create(admin);        
                }                                    
                
            }
            
        });
    
        $locationProvider.html5Mode(true);
    }]);    
    
    
    app.run(function($rootScope, $location, auth, resolveRoutes) {
        $rootScope.$on("$routeChangeStart", function(event, next, current) {  
            
            if (next.$$route) {
                var originalPath = next.$$route.originalPath;
            
                switch (originalPath) {
                    case "/login":
                        var result = resolveRoutes.loginRedirect();
                        if (!result.allowed) {                    
                            $location.path(result.path);
                        }
                        break;
                    case "/user/:id":
                        var result = resolveRoutes.secureUserPage(next.params.id);
                        if (!result.allowed) {                    
                            $location.path(result.path);
                        }
                        break;
                    case "/user/:id/edit":                    
                        var result = resolveRoutes.secureUserPage(next.params.id);

                        if (!result.allowed) {                    
                            $location.path(result.path);
                        }
                        break;
                    case "/admin":
                        var result = resolveRoutes.secureAdminPage();
                        if (!result.allowed) {                    
                            $location.path(result.path);
                        }
                        break;
                }
            }
        
        });
    });
}());