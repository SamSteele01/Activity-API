'use strict';
module.exports = function(app) {
  const apiController = require('../controllers/apiController');

  //routes
  app.route('/api/activities')
    .get(apiController.list_all_activities)
    .post(apiController.create_new_activity)

  app.route('/api/activities/:activityId')
    .get(apiController.show_an_activity)
    .put(apiController.update_an_activity)
    .delete(apiController.delete_an_activity)

  app.route('/api/activities/:activityId/stats')
    .post(apiController.add_data)

  app.route('/api/activities/:activityId/stats/:dataId')
    .delete(apiController.remove_data)
};
