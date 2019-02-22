"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUser = exports.login = void 0;

var login = function login(req, res) {
  var user = {
    name: req.body.name,
    password: req.body.password
  };
  var location = '4.643593, 7.943500';
  var reply = {
    user: user,
    location: location
  };
  res.status(200).send(reply);
};

exports.login = login;

var getUser = function getUser(req, res) {
  jwt.verify(req.token, 'mysecretkey', function (err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'post created',
        my: model.userDetails
      });
    }
  });
};

exports.getUser = getUser;