const Registration = require('../models/registration.model');
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

const option = {
    auth:{
        api_user: '',
        api_key:''
    }
}

const mailer = nodemailer.createTransport(sgTransport(option));
//Post a Registration
exports.create = (req,res) =>{
    //Create a Registration 
    var d = new Date();
    var n = d.getTime();
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    const registration = new Registration({
        coursename:req.body.coursename,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        confirmationid:n       
    })
    const email = {
        to:req.body.email,
        from: 'soumen.ncrt@gmail.com',
        subject:'Welcome Mail',
        // text:`Welcome Chatbot Your confir metion id ${n}`,
        html: `<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
        <div id="mailsub" class="notification" align="center">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="min-width: 320px;">
                <tr>
                    <td align="center" bgcolor="#eff3f8">
                        <!--[if gte mso 10]>
        <table width="680" border="0" cellspacing="0" cellpadding="0">
        <tr><td>
        <![endif]-->
                        <table border="0" cellspacing="0" cellpadding="0" class="table_width_100" width="100%" style="max-width: 680px; min-width: 300px;">
                            <tr>
                                <td>
                                    <!-- padding -->
                                    <div style="height: 80px; line-height: 80px; font-size: 10px;"> </div>
                                </td>
                            </tr>
                            <!--header -->
                            <tr>
                                <td align="center" bgcolor="#ffffff">
                                    <!-- padding -->
                                    <div style="height: 30px; line-height: 30px; font-size: 10px;"> </div>
                                    <table width="90%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td align="left">
                                                <!-- 
        
                        Item -->
                                                <div class="mob_center_bl" style="float: left; display: inline-block; width: 115px;">
                                                    <table class="mob_center" width="115" border="0" cellspacing="0"
                                                        cellpadding="0" align="left" style="border-collapse: collapse;">
        
                                                    </table>
                                                </div><!-- Item END-->
                                                <!--[if gte mso 10]>
                            </td>
                            <td align="right">
                        <![endif]-->
                                                <!-- 
        
                        Item -->
                                                <div class="mob_center_bl" style="float: right; display: inline-block; width: 88px;">
                                                    <table width="88" border="0" cellspacing="0" cellpadding="0" align="right"
                                                        style="border-collapse: collapse;">
                                                        <tr>
                                                            <td align="right" valign="middle">
                                                                <!-- padding -->
                                                                <div style="height: 20px; line-height: 20px; font-size: 10px;"> </div>
                                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
        
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div><!-- Item END-->
                                            </td>
                                        </tr>
                                    </table>
                                    <!-- padding -->
                                    <div style="height: 50px; line-height: 50px; font-size: 10px;"> </div>
                                </td>
                            </tr>
                            <!--header END-->
                            <!--content 1 -->
                            <tr>
                                <td align="center" bgcolor="#fbfcfd">
                                    <table width="90%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td align="center">
                                                <!-- padding -->
                                                <div style="height: 60px; line-height: 60px; font-size: 10px;"> </div>
                                                <div style="line-height: 44px;">
                                                    <font face="Arial, Helvetica, sans-serif" size="5" color="#57697e" style="font-size: 34px;">
                                                        <span style="font-family: Arial, Helvetica, sans-serif; font-size: 34px; color: #57697e;">
                                                            Welcome ${firstname} ${lastname}
                                                        </span></font>
                                                </div>
                                                <!-- padding -->
                                                <div style="height: 40px; line-height: 40px; font-size: 10px;"> </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center">
                                                <div style="line-height: 24px;">
                                                    <font face="Arial, Helvetica, sans-serif" size="4" color="#57697e" style="font-size: 15px;">
                                                        <span style="font-family: Arial, Helvetica, sans-serif; font-size: 15px; color: #57697e;">
                                                            Your Registration Confirmetion id is ${n}
                                                        </span></font>
                                                </div>
                                                <!-- padding -->
                                                <div style="height: 40px; line-height: 40px; font-size: 10px;"> </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center">
                                                <div style="line-height: 24px;">
                                                    <a href="#" target="_blank" style="color: #596167; font-family: Arial, Helvetica, sans-serif; font-size: 13px;">
                                                    </a>
                                                </div>
                                                <!-- padding -->
                                                <div style="height: 60px; line-height: 60px; font-size: 10px;"> </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
        
                            <tr>
                                <td>
                                    <!-- padding -->
                                    <div style="height: 80px; line-height: 80px; font-size: 10px;"> </div>
                                </td>
                            </tr>
                        </table>
        
        
                    </td>
                </tr>
            </table>
        
        </div>`
    }
    //Save Registration in Mogodb
    registration.save()
    .then(data=>{
        res.send(data)
    })
    .then(        
        mailer.sendMail(email,(err,res)=>{
            if(err){
                console.log(err)
            }else{
                console.log(res)
            }
        })
    )
    .catch(err=>{
        res.status(500).send({
            message:err.message
        })
    })
}

// FETCH all Registration
exports.findAll = (req,res)=>{
    Registration.find()
    .then(registrations => {
        if(registrations.length  <= 0){
            return  res.status(404).send({
                message:"Registrations Dtabase Empty "
            })
        }
        res.send({
            count: registrations.length,
            Registrations:registrations
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
}

// FIND a Registration
exports.findOne = (req, res) => {
    Registration.findById(req.params.registrationId)
    .then(registration => {
        if(!registration) {
            return res.status(404).send({
                message: "Registration not found with id " + req.params.registrationId
            });            
        }
        res.send(registration);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Registration not found with id " + req.params.registrationId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Registration with id " + req.params.registrationId
        });
    });
};