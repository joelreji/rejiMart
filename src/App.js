import React from "react";
import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/Home";
import Demo from "./components/Demo";
import Trophy from "./components/Trophy";



function App() {
  return (
    <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/plugins" component={Demo} />
    <Route exact path="/trophy" component={Trophy} />
    </Switch>
  );
}

export default App;
