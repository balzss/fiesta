import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Host from "./Host";
import Party from "./Party";
import Join from "./Join";
import HomePage from "./HomePage";
const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/host" component={Host} />
      <Route exact path="/join" component={Join} />
      <Route exact path="/party" component={Host} />
      <Route exact path="/party/:host_id" component={Party} />
    </Switch>
  </BrowserRouter>
);
export default Router;
