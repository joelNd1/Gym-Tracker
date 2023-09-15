import { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';


function App() {
  const [trainingList, setTrainingList] =useState('')
  const [trainingType, setTrainingType] =useState('')
  const [trainingDate, setTrainingDate] =useState('00/00/0000')
  const [viewData, setViewData] =useState(false)
  const [newTrainingType, setNewTrainingType] =useState('')


  useEffect(()=> {
 Axios.get('http://localhost:3001/read').then((Response)=> {
 console.log(Response) 
 setTrainingList(Response.data);
 });
  }, []);

  const AddSession =() => {
    Axios.post('http://localhost:3001/insert', {
      trainingType: trainingType,
      trainingDate: trainingDate,
    } )
  }

      const ToggleState =() => {
        setViewData(!viewData); 
       // console.log(viewData)
  } 
  const UpdateSessiontype =(id) => {
    Axios.put('http://localhost:3001/update', {
    id: id,
     newTrainingType: newTrainingType
  } );
};
  
const DeleteSession = (id) => {
  Axios.delete(`http://localhost:3001/delete/${id}`)
    .then(() => {
      window.location.reload(); // Refresh the page
    })
    .catch((error) => {
      console.error("Error deleting session:", error);
    });
};

  

  
  return (
    <div className="App">     
                             
      <h1>crud 1 with mern</h1> 

      <div className="form-container">
                <label>what were you training:</label>
      <input type="text" onChange={(event)=> {setTrainingType(event.target.value)}}/>

      <label>what is the date:</label>
      <input type= "date" onChange={(event)=> {setTrainingDate(event.target.value)}}/>

      <button onClick={AddSession}>Add Session</button>

      <br></br>
      <br></br>


      <button onClick={ToggleState}>Toggle View</button>
  </div>

     

      {viewData && (
        <div 
        className="training-list-container"
        >
          <h1>Training Record</h1>

          {trainingList.map((val, key) => (
            <div
             className="training-list-item" 
             key={key}
             >
              <h1>{val.DayType}</h1>

              <input 
              type='text' 
              placeholder='updated version ...' 
              onChange={(event)=> {setNewTrainingType(event.target.value)}}
              />
              <button onClick={()=> UpdateSessiontype(val._id)}>update</button>
              <h1>{val.Date}</h1>

              <button onClick={()=> DeleteSession(val._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
