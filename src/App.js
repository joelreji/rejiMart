import React from "react";
import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Demo from "./components/Demo";
import Trophy from "./components/Trophy";
import pos from "./components/pos";




function App() {
  return (
    <Switch>
    <Route exact path="/plugins" component={Demo} />
    <Route exact path="/trophy" component={Trophy} />
    <Route exact path="/pos" component={pos} />

    </Switch>
  );
}

export default App;
