import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//import Components
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Workout from "./Components/Workout folder/Workout";
import WorkoutDetails from "./Components/Workout folder/Workout Details/WorkoutDetails";
import Notfound from "./Components/notFound/Notfound";
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}>
          
          <Route index element={<Workout />}></Route>
          <Route path=":id" element={<WorkoutDetails />}></Route>
        </Route>
        <Route path="*" element={<Notfound />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
