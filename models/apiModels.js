'use strict';
const mongoose = require('mongoose');

const activityApiSchema = new mongoose.Schema({
  // not sure of the pieces needed
  // may need nested schemas
  name: {type: String, required: true, unique: true},
  data: {date: {type: Date, default: Date.now},
        infoString: String,
        infoObject: Object,
        infoArray: [String]
        }
})

const ActivityApi = mongoose.model('ActivityApi', activityApiSchema);

module.exports = ActivityApi;
