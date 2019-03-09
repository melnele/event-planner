var express = require('express'),
    jwt = require('jsonwebtoken'),
    router = express.Router();

controller = require('../controller');

var isAuthenticated = function (req, res, next) {
    // Check that the request has the JWT in the authorization header
    var token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({
            error: null,
            msg: 'You have to login first before you can access your lists.',
            data: null
        });
    }
    // Verify that the JWT is created using our server secret and that it hasn't expired yet
    jwt.verify(token, req.app.get('secret'), function (err, decodedToken) {
        if (err) {
            return res.status(401).json({
                error: err,
                msg: 'Login timed out, please login again.',
                data: null
            });
        }
        req.decodedToken = decodedToken;
        next();
    });
};

// router.post('/admin/signup', controller.signup);
router.post('/login', controller.login);
router.post('/events/add', isAuthenticated, controller.add);
router.get('/events/getall', isAuthenticated, controller.getall);
router.patch('/events/update', isAuthenticated, controller.update);
router.post('/events/delete', isAuthenticated, controller.delete);

module.exports = router;