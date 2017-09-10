'use strict';

const mongoose = require('mongoose'),
 Activity = mongoose.model('ActivityApi');


exports.list_all_activities = function(req, res){
  // GET	/activities	Show a list of all activities I am tracking, and links to their individual pages
  Activity.find({}, function(err, activity){
    if (err)
    res.send(err);
    res.json(activity);
  });
};

exports.create_new_activity = function(req, res){
  // POST	/activities	Create a new activity for me to track.
  // req.body should take: name which is a required String
  // date is auto created
  var new_activity = new Activity(req.body);
  console.log(req.body);
  // req.body.dateCreated = date.toDateString();
  new_activity.save(function(err, activity) {
    if (err)
      res.send(err);
    res.json(activity);
  });
};

exports.show_an_activity = function(req, res) {
  // GET	/activities/{id}	Show information about one activity I am tracking, and give me the data I have recorded for that activity.
  Activity.findById(req.params.activityId, function(err, activity) {
    if (err)
      res.send(err);
    res.json(activity);
  });
};


exports.update_an_activity = function(req, res) {
  // PUT	/activities/{id}	Update one activity I am tracking, changing attributes such as name or type. Does not allow for changing tracked data.
  Activity.findOneAndUpdate({_id: req.params.activityId}, req.body, {new: true}, function(err, activity) {
    if (err)
      res.send(err);
    res.json(activity);
  });
};


exports.delete_an_activity = function(req, res) {
  // DELETE	/activities/{id}	Delete one activity I am tracking. This should remove tracked data for that activity as well.
  Activity.remove({
     _id: req.params.activityId
   }, function(err, activity) {
     if (err)
       res.send(err);
     res.json({ message: 'Activity successfully deleted' });
   });
 };

 exports.add_data = function(req, res) {
   //  POST	/activities/{id}/stats	Add tracked data for a day. The data sent with this should include the day tracked. You can also override the data for a day already recorded.
  //  data gets a date automatically. Data can be:
  //          infoString: String,
  //          infoObject: {key: value},
  //          infoArray: [String]
   Activity.findOneAndUpdate({_id: req.params.activityId}, req.body.data, {new: true}, function(err, activity) {
     if (err)
       res.send(err);
       activity.data
     res.json(activity.data);
   });
 };

 exports.remove_data = function(req, res) {
  //  DELETE	/stats/{id}	Remove tracked data for a day.
   Activity.remove({
      _id: req.params.activityId
    }, function(err, data) {
      if (err)
        res.send(err);
      res.json({ message: 'Data successfully deleted' });
    });
  };
