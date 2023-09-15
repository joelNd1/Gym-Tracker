const mongoose = require('mongoose')
const GymTrackerschema = new mongoose.Schema({
DayType: {
    type: String,
    require: true,
},
Date: {
    type: Date,
    require: true,
}
});

const GymTracker = mongoose.model("GymSession",GymTrackerschema)
module.exports = GymTracker
