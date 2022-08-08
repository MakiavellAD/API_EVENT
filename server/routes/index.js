const Router = require('express');
const router = new Router();
const userRoutes = require('./userRoutes');
const eventsRoutes = require('./eventsRoutes');
const invitationsRoutes = require('./invitationsRoutes');



router.use('/user', userRoutes);
router.use('/event', eventsRoutes);
router.use('/invitations', invitationsRoutes);

module.exports = router;

