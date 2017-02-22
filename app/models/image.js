(function() {
  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost:27017/auto_tagging');

  var mongoSchema = mongoose.Schema;
  var imageSchema = {
    'name': String,
    'url': String,
  };
  module.exports = mongoose.model('image', imageSchema);
}());