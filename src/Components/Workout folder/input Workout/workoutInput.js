import React, { useContext, useEffect, useState } from "react";
import "./inputworkout.css";

const WorkoutInput = ({ isUpdate, setRender, id,setUpdateRender }) => {
  const [title, settitle] = useState("");
  const [reps, setreps] = useState("");
  const [set, setsets] = useState("");
  const [BurnCalorie, setBurnCalorie] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  useEffect(() => {}, [success]);
  const addWorkout = async () => {
    try {
      const body = {
        title,
        reps,
        set,
        BurnCalorie,
      };
      const MethodDetails = {
        headers: {
          "Content-Type": "Application/json",
        },
        method: "POST",
        body: JSON.stringify(body),
      };
      const response = await fetch("/api/Workouts", MethodDetails);
      const data = await response.json();
      if (!response.ok) throw Error(data);
      console.log(data);
      setSuccess("Successfully added.");
      setError("");
      ResetFunc();
      setRender((ps) => !ps);
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      setError(err.toString());
      setSuccess("");
      setTimeout(() => {
        setError(null);
      }, 10000);
    }
  };
  const ResetFunc =() =>{
    setBurnCalorie("");
    setreps("");
    setsets("");
    settitle("");
  }
  const UpdateWorkout = async () => {
    const body = {};
    if (title || reps || set || BurnCalorie) {
      if (title) {
        body.title = title;
      }
      if (reps) {
        body.reps = reps;
      }
      if (set) {
        body.set = set;
      }
      if (BurnCalorie) {
        body.BurnCalorie = BurnCalorie;
      }

      try {
        const MethodDetails = {
          headers: {
            "Content-Type": "Application/json",
          },
          method: "PATCH",
          body: JSON.stringify(body),
        };
        const response = await fetch(`api/Workouts/${id}`, MethodDetails);
        const data = await response.json();
        setSuccess("Updated Successfully");
        setError(null);
        setUpdateRender(ps => !ps);
        ResetFunc();
        setTimeout(() => {
          setSuccess(null)
        }, 1000);
      } catch (err) {
        setError("Updated Failed");
        setSuccess(null);
        setTimeout(() => {
          setError(null)
        }, 1000);
      }
    } else {
      setError("Enter any Field");
    }
  };

  return (
    <div className="Input-container">
      {error ? <div className="err-msg">{error}</div> : null}
      {success ? <div className="success-msg">{success}</div> : null}
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={title}
          onChange={(e) => settitle(e.target.value)}
          placeholder={isUpdate ? "update Workout.." : "Add Workout.."}
        />
        <input
          type="number"
          value={reps}
          onChange={(e) => setreps(e.target.value)}
          placeholder={isUpdate ? "update reps..." : "Add reps"}
        />
        <input
          type="number"
          value={set}
          onChange={(e) => setsets(e.target.value)}
          placeholder={isUpdate ? "update sets..." : "Add sets"}
        />
        <input
          type="number"
          value={BurnCalorie}
          placeholder={isUpdate ? "update calorie..." : "Add calorie"}
          onChange={(e) => setBurnCalorie(e.target.value)}
        />

        <div className="form-button">
          {isUpdate ? (
            <button className="input-btn btn" onClick={() => UpdateWorkout()}>
              Update Workout
            </button>
          ) : (
            <button className="input-btn btn" onClick={() => addWorkout()}>
              Add Workout
            </button>
          )}
        </div>
      </form>
      
    </div>
  );
};

export default WorkoutInput;
