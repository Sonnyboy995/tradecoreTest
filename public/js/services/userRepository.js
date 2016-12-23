(function(){
    
    "use strict";
    
    var app = angular.module("tradeCoreApp");
    
    app.factory("userRepo", function(localStorageProvider, md5) {
        
        var db = localStorageProvider;
        
        function getAllUsers() {
            return db.getAllUsers();
        }
        
        function getUserData(id) {            
            return db.getUserData(id);
        }
        
        function findByEmail(email) {
            var users = getAllUsers();

            var user = users.filter(function(user) {
                return user.email === email;
            });

            if (user.length > 0) {                
                return user[0];
            }
            

            return false;
        }
        
        function create(data) {
            data.password = md5.createHash(data.password);
            db.insertUser(data);
        }
        
        function update(data) {            
            db.updateUserInfo(data.data);
        }
        
        return {
            getAllUsers: getAllUsers,
            findByEmail: findByEmail,
            getUserData: getUserData,
            create: create,
            update: update
        }
    });
}());