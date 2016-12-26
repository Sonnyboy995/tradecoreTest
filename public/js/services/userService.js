(function(){
    
    "use strict";
    
    var app = angular.module("tradeCoreApp");
    
    app.factory("User", function(userRepo, md5) {        
        
        /** 
        * Create an instance of user Object
        *
        * @constructor
        * @this {User}
        * @param {number} id Users uniqe ID 
        * @param {object} data User data
        */
        function UserConstructor(id, data) {
            this.id = id;
            this.data = data || userRepo.getUserData(id);                
        }
        
        /**
        * Check if user provided correct password
        *
        * @param {string} Password from the input field
        * @return {boolean} True if user typed correct password, else return false
        */       
        UserConstructor.prototype.correctPassword = function(password) {          
            return md5.createHash(password) === this.data.password;
        }
        
        /**
        * Check if user is admin
        *
        * @return {boolean} True if user is admin, else return false 
        */
        UserConstructor.prototype.isAdmin = function() {
            if (this.data.admin) {
                return true;
            }
            
            return false;
        }
        
        return UserConstructor;
    });
}());