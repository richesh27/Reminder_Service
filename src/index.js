const express = require('express');
const bodyParser = require('body-parser')
const {PORT} = require('./config/server-config')
const router = express.Router();

const {sendBasicEmail} = require('./services/email-service');

const SetupAndStartServer = async ()=>{
    
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.listen(PORT,()=>{

        console.log(`Server Starts running at PORT ${PORT}`);

        // sendBasicEmail(
        //     'support@admin.com',
        //     'richesh.27kunwar@gmail.com',
        //     'This is an testing email',
        //     'Hey whats up !, Hope you are fine'
        // )
    })
}

SetupAndStartServer();