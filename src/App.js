import React from "react";
import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import pos from "./components/pos";




function App() {
  return (
    <Switch>

    <Route exact path="/pos" component={pos} />

    </Switch>
  );
}

export default App;
