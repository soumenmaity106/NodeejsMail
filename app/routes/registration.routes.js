module.exports = function (app) {
    var registration = require('../controllers/registration.controllers');
   
    //Create a New Registration
    app.post('/api/registrations', registration.create)

    //Retrieve all Registeation
    app.get('/api/registrations', registration.findAll)

    // Retrieve a single Registeation by Id
    app.get('/api/registrations/:registrationId', registration.findOne);
}