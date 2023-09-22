import React from "react";
import Workout from "../Workout folder/Workout";
import {Outlet} from 'react-router-dom'
import './home.css'
import WorkoutInput from "../Workout folder/input Workout/workoutInput";

const Home = () => {
  return (
    <div className="Home-container container">
      <Outlet></Outlet>
    </div>
  );
};

export default Home;
