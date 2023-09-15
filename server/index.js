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
    const GymTracker = new GymTrackerModel({DayType:trainingType, Date:trainingDate });

    try {
        await GymTracker.save();
        res.send("inserted data");
    }catch(err){
        console.log(err);
    }
 
});
app.put("/update", async (req, res) => {
    const newTrainingType = req.body.newTrainingType;
    const id = req.body.id;
  
    try {
      const updatedTrainingType = await GymTrackerModel.findByIdAndUpdate(id, { DayType: newTrainingType });
  
      if (!updatedTrainingType) {
        return res.status(404).send("Training type not found");
      }
  
      res.send("Training type updated successfully");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error updating training type");
    }
  });

app.delete("/delete/:id", async (req, res)=>{
    const id = req.params.id;

    await GymTrackerModel.findByIdAndRemove(id).exec();
    res.send("deleted");

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


