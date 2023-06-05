const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
require('./models/inventory.model.js');

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

mongoose.connection
.on('open',()=>{
    console.log('open connection');
})
.on('error',()=>{
    console.log('connection error');
});


require('./routes/inventory.router.js')(app);

const server= app.listen(8080, function(){
    const host = server.address().address
    const port =server.address().port

    console.log('server listening at http://%s:%s', host, port)
})