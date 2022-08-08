const Router = require('express');
const router = new Router();
const eventsControllers = require('../controllers/eventsControllers');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/newEvent', authMiddleware, eventsControllers.newEvent);
router.post('/makeInvite', authMiddleware, eventsControllers.makeInvite);
router.get('/allEvent', authMiddleware, eventsControllers.allEvents);
router.get('/myEvents', authMiddleware, eventsControllers.myEvents);
router.get('/oneEvent', authMiddleware, eventsControllers.idEvent);
router.patch('/changeEvent', authMiddleware, eventsControllers.updateEvent);
router.patch('/accept', authMiddleware, eventsControllers.isAccepted);
router.delete('/deleteEvent', authMiddleware, eventsControllers.deleteEvent);



module.exports = router;