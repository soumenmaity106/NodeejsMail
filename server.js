const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000 ;
const app = express()
app.use(bodyParser.json());
//Configaretion database
const dbconnect = require('./app/config/mongodb.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise

//Connection Database
mongoose.connect(dbconnect.url)
.then(()=>{
    console.log("Success fully connect Mongodb");
})
.catch(err=>{
    console.log('Could not connect mongodn');
    process.exit()
})

//Route
require('./app/routes/registration.routes')(app);

app.listen(port,()=>{
    console.log(`Port is raning ${port}`)
})
