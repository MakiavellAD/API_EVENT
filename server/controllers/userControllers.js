const ApiError = require('../error /ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User, Event, Invitations} = require('../models/models');

const generateJwt = (id, username, email) =>{
    return jwt.sign({id, username, email}, process.env.SECRET_KEY, {expiresIn: '24h'});

};

class UserControllers{
    async registration(req, res){
        const {userName, email, password} = req.body;
        if(!userName || !email || !password){
            return next(ApiError.badRequest("Wrong usernamae,email or password"));
        }

        const candidate_username = await User.findOne({where: {userName}});
        const candidate_email = await User.findOne({where: {email}});

        if(candidate_username){
            return next(ApiError.badRequest("this username arlready exist"));
        }

        if(candidate_email){
            return next(ApiError.badRequest("this email arlready exist"));
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({userName, email, password: hashPassword});
        const token = generateJwt(user.id, user.userName, user.email);
        return res.json({token});
    }

    async login(req, res, next){

        const{userName, email, password} = req.body;
        const user_name = await User.findOne({where: {userName}});
        const user_email = await User.findOne({where: {email}});

        if(!user_name){
            return next(ApiError.internal("No user with this username"));
        }

        if(!user_email){
            return next(ApiError.internal("No user with this email"));
        }

        let comparePassword = bcrypt.compareSync(password, user_email.password);
        if(!comparePassword){
            return next(ApiError.internal("wrong password"));
        }

        const token = generateJwt(user_email.id, user_email.userName, user_email.email);
        return res.json({token});

        
    }

    async check(req, res, next){
        const token = generateJwt(req.user.id, req.user.userName, req.user.email);
        return res.json({token});

    }
}


module.exports = new UserControllers();