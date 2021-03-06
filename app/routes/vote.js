var controller = require('../controllers/vote');
// var authMiddleware = require('../controllers/auth');

module.exports = function (express) {
    var router = express.Router();

    ////////////////////
    router.get('/', controller.getList);
    router.post('/', controller.add);
    router.get('/findByIdLoan/:idLoan', controller.getVoteByIdLoanFa);

    router.route('/:id')

        .get(controller.search)

        .put(controller.update)

        .delete(controller.delete);

    // .delete(authMiddleware.verify, controller.delete);

    return router;
};