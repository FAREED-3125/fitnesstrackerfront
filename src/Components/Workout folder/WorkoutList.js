import React from "react";
import{ Link} from 'react-router-dom'
import './workout.css'

const WorkoutList = ({workouts, deleteWorkout}) => {
  return <>{
    workouts.map((works , index) => (
        <div key={index} className="Workout">
            <div className="workout-headings">
            <h3><Link to={`${works._id}`}>Title: {works.title}</Link></h3>
            <div className="work-details">
                <p>Reps: {works.reps}</p>
                <p>sets: {works.set}</p>
            </div>
            <p className="created-info">Created at: {works.createdAt}</p>
</div>
<div className="workout-button">
    <button className='btn' onClick={() => deleteWorkout(works._id)}>Delete</button>
</div>
        
        </div>
    ))
  }</>;
};

export default WorkoutList;
