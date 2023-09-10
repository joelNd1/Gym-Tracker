const express = require('express')
const mongoose = require('mongoose') 
const app = express()
const GymTrackerModel = require("./models/GymTracker.js");
const cors= require('cors')

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://Joel:xpsMTqETC3slyiAl@testing.vn7fidw.mongodb.net/GymTracker?retryWrites=true&w=majority',{
    useNewUrlParser: true,
});

app.post("/insert", async (req, res) => {

    const trainingType = req.body.trainingType
    const trainingDate = req.body.trainingDate
    const averageBPM = req.body.averageBPM

    const GymTracker = new GymTrackerModel({DayType:trainingType, Date:trainingDate, BPM: averageBPM });

    try {
        await GymTracker.save();
        res.send("inserted data");
    }catch(err){
        console.log(err);
    }
 
});

app.get("/read", async (req, res) => {

    const sessions = await GymTrackerModel.find();
       res.send(sessions);
});

app.listen(3001, ()=> {
    console.log("server is running perfectly on 3001...");
});

//  to start server type in terminal node "index.js"
//  to start client and frontend navigate to cliend folder and "npm start"


