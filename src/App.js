import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ExercisesList from "./components/exercisesList.component";
import EditExercise from "./components/editExcercise.component";
import CreateExercise from "./components/createExercise.component";
import CreateUser from "./components/createUser.component";
import Navbar from "./components/navbar.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Switch>
          <Route exact path="/" component={ExercisesList} />
          <Route path="/edit/:id" component={EditExercise} />
          <Route path="/create" component={CreateExercise} />
          <Route path="/user" component={CreateUser} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
