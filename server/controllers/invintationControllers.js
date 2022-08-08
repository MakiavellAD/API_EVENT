const db = require('../db');
const ApiError = require('../error /ApiError');
const {User, Event, Invitations} = require('../models/models');

class InvintationControllers{


    async makeInvite(req, res, next){
        const {eventId, userName, id} = req.body;
        const findUser = await User.findOne({where: {userName}});
        

        if(!findUser){
            return next(ApiError.internal("No user with this username"));
        }
            const createInvite = Invitations.create({eventId, userId: id});
            return res.json(createInvite);
    }
}

module.exports = new InvintationControllers();