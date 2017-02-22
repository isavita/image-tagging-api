(function() {
  var express = require('express');
  var app = express();
  var bodyParser = require('body-parser');
  var router = express.Router();
  var mongoOp = require('./models/image');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  router.get('/', function(req, res) {
    res.json({ error: false, message: 'Hello world!' });

  });

  router.route('/images')
    .get(function(req, res) {
      var response = {};
      mongoOp.find({}, function(err, data) {
        if (err) {
          response = { error: true, message: 'Error fetching data' };
        } else {
          response = { error: false, message: data };
        }
        res.json(response);
      })
    })
    .post(function(req, res) {
      var db = new mongoOp();
      var response = {};

      db.name = req.body.name;
      db.url = req.body.url;

      db.save(function(err) {
        if (err) {
          response = { error: true, message: 'Error adding data' };
        } else {
          response = { error: false, message: 'Data added' };
        }
        res.json(response);
      });
    });

  router.route("/images/:id")
    .get(function(req, res) {
      var response = {};
      mongoOp.findById(req.params.id, function(err, data) {
        if (err) {
          response = { error: true, message: 'Error the image cannot be fetched' };
        } else {
          response = { error: false, message: data };
        }
        res.json(response);
      });
    })
    .put(function(req, res) {
      var response = {};
      mongoOp.findById(req.params.id, function(err, data) {
        if (err) {
          response = { error: true, message: 'Error fetching data' };
        } else {
          if (req.body.name !== undefined) {
            data.name = req.body.name;
          };
          if (req.body.url !== undefined) {
            data.url = req.body.url;
          };
          data.save(function(err) {
            if (err) {
              response = { error: true, message: 'Error updating data' };
            } else {
              response = { error: false, message: 'Data is updated for ' + req.params.id };
            }            
          });          
        }
        res.json(response);
      })
    })
    .delete(function(req, res) {
      var response = {};
      mongoOp.findById(req.params.id, function(err, data) {
        if (err) {
          response = { error: true, message: 'Error fetching data' };
        } else {
          mongoOp.remove({ _id: req.params.id }, function(err) {
            if (err) {
              response = { error: true, message: 'Error deleting data' };
            } else {
              response = { error: false, message: 'Data with id ' + req.params.id + ' is deleted' };
            }
          });
        }
        res.json(response);
      });
    });

  app.use('/', router);

  app.listen(3000);
}());