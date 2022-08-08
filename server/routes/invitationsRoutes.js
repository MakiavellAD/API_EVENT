const Router = require('express');
const router = new Router();
const invintationControllers = require('../controllers/invintationControllers');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/makeInvite', authMiddleware, invintationControllers.makeInvite);


module.exports = router;