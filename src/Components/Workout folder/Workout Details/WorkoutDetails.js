import React, { useCallback, useEffect, useMemo, useState } from "react";
import WorkoutInput from "../input Workout/workoutInput";
import "./WorkoutDetails.css";
import { Navigate, redirect, useParams } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
export const  Fetch_url = "https://fitnesstracker-h8nl.onrender.com";
const WorkoutDetails = () => {
  const [Workout, setWorkout] = useState({});
  const [err, seterr] = useState(null);
  const [success, setSuccess] = useState(null);
  const { id } = useParams();
  const [UpdateRender, setUpdateRender] = useState(false);
  const isUpdate = true;
  const singleWorkout = async () => {
    try {
      const response = await fetch(`${Fetch_url}/api/workouts/${id}`);
      const data = await response.json();  
      console.log(data)
       if (!response.ok) throw Error(data);
      const work = data[0];
      setWorkout(work)
    } catch (err) {
      seterr(err);
    }
  };
  useEffect(() => {
    singleWorkout();
  }, []);
  useEffect(() => {
    singleWorkout();
  }, [UpdateRender]);
  
  const deleteWorkout = async (id) => {
    try {
      const MethodDetails = {
        headers: {
          "Content-Type": "Application/json",
        },
        method: "DELETE",
      };
      const response = await fetch(`${Fetch_url}/api/Workouts/${id}`, MethodDetails);
      if (!response.ok) throw Error("Error sending to the database.");
      setSuccess("SuccessFully Deleted");
      seterr(null);
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      seterr(err.toString());
      setSuccess(null);
      setTimeout(() => {
        seterr(null);
      }, 3000);
    }
  };

  const redirectFunc = () => {
    return <Navigate to="/" replace />;
  };

  return (
    <>
      <div className="workout-details-container">
        <div className="workout-details-section">
          {err && <div className="err-msg detail-err">{err}</div>}
          {success && (
            <div className="success-msg detail-success">{redirectFunc()}</div>
          )}
          <h3>Title: {Workout.title}</h3>
          <div className="work-props">
            <p>Reps: {Workout.reps}</p>
            <p>sets: {Workout.set}</p>
            <p>Calorie Burned: {Workout.BurnCalorie}</p>
          </div>
          <div className="para">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
              deleniti neque dolores atque aspernatur eius?
            </p>
          </div>
          <div className="created-update-info">
            <p className="created-info">Created at: {Workout.createdAt}</p>
            <p className="updated-info">Updated at: {Workout.updatedAt}</p>
          </div>
        </div>
        <div className="work-details-btn">
          <button
            className="btn-circle"
            onClick={() => deleteWorkout(Workout._id)}
          >
            {<FaTrash />}
          </button>
        </div>
      </div>
      <WorkoutInput
        isUpdate={isUpdate}
        id={id}
        setUpdateRender={setUpdateRender}
      />
    </>
  );
};

export default WorkoutDetails;
