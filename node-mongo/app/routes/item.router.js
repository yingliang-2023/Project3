const bcrypt=require('bcryptjs');


module.exports = function(app) {
    var items = require('../controllers/item.controller.js');
    var users=  require('../controllers/user.controller.js');


    app.post('/api/item', items.createItem);
    app.get('/api/item/:id', items.getItem);
    app.get('/api/items', items.items);
    app.put('/api/item', items.updateItem);
    app.delete('/api/item/:id', items.deleteItem);

    app.post('/api/user', users.createUser);

    

    app.post('/api/login-user',users.authenticate);
    
    app.post("/userData", users.getUserData);








};

