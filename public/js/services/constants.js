(function(){
        
    "use strict";
    
    var app = angular.module("tradeCoreApp");
    
    app.constant("middlewareStatus", {
        NOT_AUTHENTICATED: 101,
        NOT_ADMIN: 102,
        NOT_ALLOWED: 103
    });
    
}());