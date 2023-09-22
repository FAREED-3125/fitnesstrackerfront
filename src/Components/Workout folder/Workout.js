import React, { createContext, useContext, useEffect, useState } from "react";
import WorkoutList from "./WorkoutList";
import "./workout.css";
import WorkoutInput from "./input Workout/workoutInput";

const Workout = () => {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [reRender, setRender] = useState(false);
  const FetchData = async () => {
    try {
      const response = await fetch("/api/workouts");
      const data = await response.json();
      if (!response.ok) throw Error(data);
      setWorkouts(data);
    } catch (err) {
      setError(err);
    }
  };
  useEffect(() => {
    FetchData();
  }, []);

  useEffect(() => {
    FetchData();
  }, [reRender]);

  const deleteWorkout = async (id) => {
    try {
      const MethodDetails = {
        headers: {
          "Content-Type": "Application/json",
        },
        method: "DELETE",
      };
      const response = await fetch(`/api/Workouts/${id}`, MethodDetails);
      if (!response.ok) throw Error("Error sending to the database.");
      setSuccess("SuccessFully Deleted");
      setError(null);
      setRender((ps) => !ps);
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      setError(err.toString());
      setSuccess(null);
      setRender((ps) => !ps);
      setTimeout(() => {
        setError(null);
      }, 1000);
    }
  };
  return (
    <>
      <div className="workout-container">
        {error && <div className="err-msg">{error}</div>}
        {success && <div className="success-msg">{success}</div>}
        <WorkoutList workouts={workouts} deleteWorkout={deleteWorkout} />
      </div>
      <WorkoutInput setRender={setRender} />
    </>
  );
};

export default Workout;
