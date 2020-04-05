var controller = require('../controllers/user');
// var authMiddleware = require('../controllers/auth');

module.exports = function (express) {
    var router = express.Router();

    ////////////////////
    router.get('/', controller.getList);
    router.post('/', controller.add);

    router.put('/change-password/:email', controller.changePassword);
    router.route('/:email')

        .get(controller.search)

        .put(controller.updateInformation)

        .delete(controller.delete);

        // .delete(authMiddleware.verify, controller.delete);

    return router;
};