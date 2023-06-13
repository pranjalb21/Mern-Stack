import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { NavBar } from "./components/NavBar";
import { ExercisesList } from "./components/ExercisesList";
import { EditExercise } from "./components/EditExercise";
import { CreateExercise } from "./components/CreateExercise";
import { CreateUser } from "./components/CreateUser";

function App() {
  return (
    <Router>
      <div className="container">
        <NavBar />
        <br />
        <Routes>
          <Route path="/" exact Component={ExercisesList} />
          <Route path="/edit/:id" exact Component={EditExercise} />
          <Route path="/create" exact Component={CreateExercise} />
          <Route path="/user" exact Component={CreateUser} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
