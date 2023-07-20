import React from "react";
import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/Home";
import Demo from "./components/Demo";


function App() {
  return (
    <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/plugins" component={Demo} />
    </Switch>
  );
}

export default App;
