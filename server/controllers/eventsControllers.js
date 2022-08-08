const {Event, User, Invitations} = require('../models/models');
const ApiError = require('../error /ApiError');
const jwt = require('jsonwebtoken');

class EventsControllers{
    

    async newEvent(req, res){
        console.log(req.user.id);
        const {title, date} = req.body;
        const createEvent = await Event.create({title, date, userId: req.user.id});
        return res.json(createEvent);

    }

    async allEvents(req, res){
        const getAllEvents = await Event.findAll();
        return res.json(getAllEvents); 
    }

    async idEvent(req, res){
        const {eventId} = req.query;
        const getEventsByUserId = await Event.findOne({where: {id: eventId}});
        return res.json(getEventsByUserId);
        
    }

    async updateEvent(req, res){
        const {title, date, userId} = req.body;
        const changeEvent = await Event.update({title, date}, {where: {userId}});
    }

    async deleteEvent(req, res){
        const {userId} = req.body;
        const deleteById = await Event.destroy({where: {userId}});
        return res.json(deleteById);
    }

    async makeInvite(req, res, next){
        const {eventId, userName, id} = req.body;
        const findUser = await User.findOne({where: {userName}});
        
        if(!findUser){
            return next(ApiError.internal("No user with this username"));
        }
            const createInvite = Invitations.create({eventId, userId: id});
            return res.json(createInvite);
    }

    async myEvents(req,res){
        const showMyEvents = await Invitations.findAll({where: {userId: req.user.id}});
        return res.json(showMyEvents);
    }

    async isAccepted(req, res){
        const {answer, eventsId} = req.body;
        if(answer == 'accept'){
            const accept = Invitations.update({isAccepted: true}, {where:{userId: req.user.id, eventId: eventsId}});
            return res.json(accept);
        }

        if(answer == 'cancel'){
            const accept = Invitations.update({isAccepted: false}, {where:{userId: req.user.id, eventId: eventsId}});
            return res.json(accept);
        } 
    }


}


module.exports = new EventsControllers();