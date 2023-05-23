const {NotificationTicket} = require ('../models/index')
const {Op} = require('sequelize')

class TicketRepository {

    async getAll(){

        try {
            const tickets =await NotificationTicket.findAll();
            return tickets;
        } 
        catch (error) {
            console.log("Something went wrong in the notification ticket repo layer");
            throw error;
        }
    }

    async create(data) {
        try {
            const ticket =  await NotificationTicket.create(data);
            return ticket;
        } 
        catch (error) {
            console.log("Something went wrong in the creation ticket repo layer");
            throw error;
        }
    } 

    async get (filter){
        try {
            const tickets = await NotificationTicket.findAll({
                where : {
                    status : filter.status,
                    notificationTime : {
                        [Op.lte] : new Date()
                    }
                }
            });
            return tickets;
        } 
        catch (error) {
            console.log("Something went wrong in the find particular ticket repo layer");
            throw error; 
        }
    }

    async update (ticketId, data){
        try {
            const ticket  = await NotificationTicket.findByPk(ticketId);
            if(data.status){
                ticket.status = data.status 
            }
            await ticket.save();
            return ticket;
        } 
        catch (error) {
            console.log("Something went wrong in the updating particular ticket repo layer");
            throw error; 
        }
    }
}

module.exports = TicketRepository;