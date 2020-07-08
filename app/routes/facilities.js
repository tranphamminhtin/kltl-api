var controller = require('../controllers/facilities');
// var authMiddleware = require('../controllers/auth');
var upload = require('../../multer');

module.exports = function (express) {
    var router = express.Router();

    ////////////////////
    router.get('/', controller.getList);
    router.post('/', upload.single('image'), controller.add);

    router.get('/by-room', controller.getByRoom);
    router.get('/by-manager', controller.getByManager);

    router.route('/:id')

        .get(controller.search)

        .put(controller.update)

        .delete(controller.delete);

        // .delete(authMiddleware.verify, controller.delete);

    return router;
};