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
  console.log(req.body);
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
  // data: [{id: Number,
  //       date: {type: Date, default: Date.now},
  //       infoString: String,
  //       infoNumber: Number
  //     }]
   Activity.updateOne({_id: req.params.activityId},
      {$push: {data: req.body}},

      // if(activity.data.length===undefined){
      //   req.body.data.id = 0;
      // }else{
      //   req.body.data.id = activity.data.length;
      // }
      // --won't work if an entry gets deleted
      function(err, activity) {
     if (err)
       res.send(err);

     res.json(activity);
   });
 };

 exports.remove_data = function(req, res) {
  //  DELETE	/stats/{id}	Remove tracked data for a day.
  console.log(req.params.dataId);
   Activity.updateOne({_id: req.params.activityId},
     {$pull: {data: req.params.dataId}},
      function(err, data) {
      if (err)
        res.send(err);
      res.json({ message: 'Data successfully deleted' });
    });
  };
