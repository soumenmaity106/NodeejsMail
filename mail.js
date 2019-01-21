const express = require('express');
const port = process.env.PORT || 3000;
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

const option = {
    auth:{
        api_user: '',
        api_key:''
    }
}

const mailer = nodemailer.createTransport(sgTransport(option));

const email = {
    to:['soumenmaity106@gmail.com','soumen.ncrt@gmail.com'],
    from: 'soumen.ncrt@gmail.com',
    subject:'Test Mail',
    text:'Awesome sauce',
    html: '<b>Awesome sauce</b>'
}

mailer.sendMail(email,(err,res)=>{
    if(err){
        console.log(err)
    }else{
        console.log(res)
    }
})
const app = express()
app.listen(port,()=>{
    console.log(`Server is raning port ${port}`)
})
