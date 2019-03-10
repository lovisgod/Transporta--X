"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bookride = exports.login = exports.signup = void 0;

var _db = _interopRequireDefault(require("../utils/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var signup = function signup(req, res) {
  var user = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    category: req.body.category,
    coordinate: req.body.coordinate,
    phone_no: req.body.phone_no
  };

  _db.default.query("INSERT INTO \"transporta\"(\"username\", \"password\", \"email\", \"category\", \"location\", \"phone_no\")\n            VALUES($1,$2,$3,$4,$5,$6)", [user.username, user.password, user.email, user.category, user.coordinate, user.phone_no], function (err, result) {
    if (err) {
      console.log(err);
      return res.status(404).send('log not successful');
    } else {
      res.status(200).send(user);
    }
  });
};

exports.signup = signup;

var login = function login(req, res) {
  var userDetails = {
    username: req.body.username,
    password: req.body.password,
    coordinate: req.body.coordinate
  };

  _db.default.query('UPDATE "transporta" SET "location" = $1 WHERE "password" = $2', [userDetails.coordinate, userDetails.password], function (err) {
    if (err) {
      console.log(err);
      return res.status(404);
    } else {
      _db.default.query('SELECT * FROM "transporta" WHERE username = $1 AND password = $2', [userDetails.username, userDetails.password], function (err, result) {
        if (err) {
          console.log(err);
          var errorMessage = {
            message: 'login not successful'
          };
          return res.status(404).send(errorMessage);
        } else {
          console.log(result);
          res.status(200).send(result.rows[0]);
        }
      });
    }
  });
};

exports.login = login;

var bookride = function bookride(req, res) {
  var bookDetails = {
    ridefrom: req.body.ridefrom,
    rideto: req.body.rideto,
    timeofdep: req.body.timeofdep,
    noofpassenger: req.body.noofpassenger,
    ridestatus: req.body.ridestatus,
    customer: req.body.customer,
    driver: req.body.driver,
    distance: req.body.distance,
    cost: req.body.cost
  };

  _db.default.query("INSERT INTO \"rides\"(\"ridefrom\", \"rideto\", \"timeofdep\", \"noofpassenger\", \"status\", \"customer\",\"driver\", \"distance\", \"cost\")\n    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)", [bookDetails.ridefrom, bookDetails.rideto, bookDetails.timeofdep, bookDetails.noofpassenger, bookDetails.ridestatus, bookDetails.customer, bookDetails.driver, bookDetails.distance, bookDetails.cost], function (err, result) {
    if (err) {
      console.log(err);
      return res.status(404).send(err.message);
    } else {
      _db.default.query('SELECT location FROM "transporta" WHERE category = $1', ['driver'], function (err, result) {
        if (err) {
          console.log(err);
          var errorMessage = {
            message: 'No user found'
          };
          return res.status(404).send(errorMessage);
        } else {
          console.log(result);
          res.status(200).send(result.rows[0]);
        }
      });
    }
  });
};

exports.bookride = bookride;