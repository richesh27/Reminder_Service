const sender = require('../config/emailConfig');
const {TicketRepository} = require('../repository/index');

const repo = new TicketRepository();

const sendBasicEmail = async (mailFrom, mailTo, mailSubject, mailBody)=>{

    try {
        const response = await sender.sendMail({
            from : mailFrom,
            to : mailTo,
            subject : mailSubject,
            text: mailBody
        })
        console.log(response)
    } 
    catch (error) {
        console.log(error)    
    }  
};

const fetchPendingEmail = async (timeStamp)=>{
    try {
        const response = await repo.get({status: "PENDING"});
        return response;      
    } 
    catch (error) {
        console.log("SOmething went wrong in pendingEmail service layer")
        throw error;
    }
}

const updateTicket = async (ticketId, data)=>{
    try {
        const response  = await repo.update(ticketId, data);
        return response;
    } 
    catch (error) {
        console.log("SOmething went wrong in UpdatingEmail service layer")
        throw error;
    }
}

const createNotification = async (data)=>{
    try {
        const response = await repo.create(data);
        return response;
    } 
    catch (error) {
        console.log("SOmething went wrong in CreateNotification service layer")
        throw error;
    }
}

const subscribeEvents = async (payload ) => {
    let service = payload.service;
    let data = payload.data;
    switch (service){
        case 'CREATE_TICKET':
            await createNotification(data);
            break;
        case 'SEND_BASIC_MAIL' :
            await sendBasicEmail(data);
            break;
        default :
            console.log("No valid events recieved");
            break;
    }
}

module.exports = {
    sendBasicEmail,
    fetchPendingEmail,
    createNotification,
    updateTicket,
    subscribeEvents
}

/**
 * SMTP -> a@b.com
 * reciever -> c@d.com
 * 
 * 
 * from : support@kind.com  */