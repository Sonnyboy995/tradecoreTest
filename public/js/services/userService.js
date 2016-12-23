(function(){
    
    "use strict";
    
    var app = angular.module("tradeCoreApp");
    
    app.factory("User", function(userRepo, md5) {        
        
        function UserConstructor(id, data) {
            this.id = id;
            this.data = data || userRepo.getUserData(id);                
        }
        
       
        UserConstructor.prototype.correctPassword = function(password) {          
            return md5.createHash(password) === this.data.password;
        }
        
        
        UserConstructor.prototype.isAdmin = function() {
            if (this.data.admin) {
                return true;
            }
            
            return false;
        }
        
        return UserConstructor;
    });
}());