const express = require('express');
const bodyParser = require('body-parser')
const {PORT} = require('./config/server-config')
const router = express.Router();

const TicketController = require('./controllers/ticket-controller');
// const {sendBasicEmail} = require('./services/email-service');

const jobs = require('./utils/jobs')

const SetupAndStartServer = async ()=>{
    
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.post('/api/v1/tickets', TicketController.create); 

    app.listen(PORT,()=>{

        console.log(`Server Starts running at PORT ${PORT}`);

        // sendBasicEmail(
        //     'support@admin.com',
        //     'richesh.27kunwar@gmail.com',
        //     'This is an testing email',
        //     'Hey whats up !, Hope you are fine'
        // )


        // jobs(); 
    })
    
}

SetupAndStartServer();