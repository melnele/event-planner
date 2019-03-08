var mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    Validations = require('../utils/Validations'),
    Encryption = require('../utils/Encryption'),
    User = mongoose.model('User'),
    Event = mongoose.model('Event');

module.exports.signup = function (req, res, next) {
    var valid = req.body.username && Validations.isString(req.body.username) && req.body.password && Validations.isString(req.body.password);
    if (!valid) {
        return res.status(422).json({
            err: null,
            msg: 'Not all required data is inserted or are in the wrong format.',
            data: null
        });
    } else {
        var password = req.body.password.trim();
        if (password.length < 6) {
            return res.status(422).json({
                err: null,
                msg: "Password has to be atleast 6 charachters.",
                data: null
            });
        } else {
            User.findOne({ username: req.body.username.trim().toLowerCase() }).exec(function (err, user) {
                if (err) {
                    return next(err);
                }
                else {
                    if (user) {
                        if (user.username == req.body.username.trim().toLowerCase()) {
                            return res.status(422).json({
                                err: null,
                                msg: 'Username taken.',
                                data: null
                            });
                        }
                    }
                    Encryption.hashPassword(req.body.password, function (err, hash) {
                        if (err) {
                            return next(err);
                        }
                        req.body.password = hash;
                        req.body.isAdmin = true;
                        User.create(req.body, function (err, newUser) {
                            if (err) {
                                return next(err);
                            }
                            res.status(201).json({
                                err: null,
                                msg: 'Registration successful.',
                                data: null
                            });
                        });
                    })
                }
            });
        }
    }
};

module.exports.login = function (req, res, next) {
    // Check that the body keys are in the expected format and the required fields are there
    var valid =
        req.body.username &&
        Validations.isString(req.body.username) &&
        req.body.password &&
        Validations.isString(req.body.password);

    if (!valid) {
        return res.status(422).json({
            err: null,
            msg:
                'username(String) and password(String) are required fields.',
            data: null
        });
    }

    // Find the user with this email from the database
    User.findOne({
        username: req.body.username.trim().toLowerCase()
    }).exec(function (err, user) {
        if (err) {
            return next(err);
        }
        // If user not found then he/she is not registered
        if (!user) {
            return res
                .status(404)
                .json({ err: null, msg: 'User not found.', data: null });
        }

        // If user found then check that the password he entered matches the encrypted hash in the database
        Encryption.comparePasswordToHash(req.body.password, user.password, function (
            err,
            passwordMatches
        ) {
            if (err) {
                return next(err);
            }
            // If password doesn't match then its incorrect
            if (!passwordMatches) {
                return res
                    .status(401)
                    .json({ err: null, msg: 'Password is incorrect.', data: null });
            }
            // Create a JWT and put in it the user object from the database
            var token = jwt.sign(
                {
                    // user.toObject transorms the document to a json object without the password as we can't leak sensitive info to the frontend
                    user: user.toObject()
                },
                req.app.get('secret'),
                {
                    expiresIn: '12h'
                }
            );
            // Send the JWT to the frontend
            res.status(200).json({ err: null, msg: 'Welcome', data: token });
        });
    });
};

module.exports.add = function (req, res, next) {
    var valid = req.body.title && Validations.isString(req.body.title);
    if (!valid) {
        return res.status(422).json({
            err: null,
            msg: 'title is a required field.',
            data: null
        });
    }

    User.findById(req.decodedToken.user._id).exec(function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user || !user.isAdmin) {
            return res
                .status(404)
                .json({ err: null, msg: 'User not an Admin.', data: null });
        }
        Event.create(req.body, function (err, newEvent) {
            if (err) {
                console.log(err);
                return next(err);
            }
            res.status(201).json({
                err: null,
                msg: 'Event created',
                data: newEvent.toObject()
            });
        });
    });
};

module.exports.getall = function (req, res, next) {
    Event.find().exec(function (err, events) {
        if (err) {
            return next(err);
        }
        if (!events) {
            return res
                .status(404)
                .json({ err: null, msg: 'Events not found.', data: null });
        }
        res.status(200).json({
            err: null,
            msg: 'Events retrieved successfully.',
            data: events
        });
    });
};

module.exports.update = function (req, res, next) {
    var valid = req.body._id && req.body.title && Validations.isString(req.body.title);
    if (!valid) {
        return res.status(422).json({
            err: null,
            msg: 'title is a required field.',
            data: null
        });
    }

    User.findById(req.decodedToken.user._id).exec(function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user || !user.isAdmin) {
            return res
                .status(404)
                .json({ err: null, msg: 'User not an Admin.', data: null });
        }
        Event.findByIdAndUpdate(req.body._id, req.body, { new: true }).exec(function (err, updatedEvent) {
            if (err) {
                console.log(err);
                return next(err);
            }
            if (!updatedEvent) {
                return res
                    .status(404)
                    .json({ err: null, msg: 'Event not found.', data: null });
            }
            res.status(201).json({
                err: null,
                msg: 'Event Updated',
                data: updatedEvent.toObject()
            });
        });
    });
};


module.exports.delete = function (req, res, next) {
    var valid = req.body._id;
    if (!valid) {
        return res.status(422).json({
            err: null,
            msg: '_id is a required field.',
            data: null
        });
    }

    User.findById(req.decodedToken.user._id).exec(function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user || !user.isAdmin) {
            return res
                .status(404)
                .json({ err: null, msg: 'User not an Admin.', data: null });
        }
        Event.findByIdAndDelete(req.body._id).exec(function (err, deletedEvent) {
            if (err) {
                console.log(err);
                return next(err);
            }
            res.status(201).json({
                err: null,
                msg: 'Event deleted',
                data: deletedEvent.toObject()
            });
        });
    });
};
