import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import MainDrawer from './components/common/MainDrawer'
import NoMatchPage from "./components/pages/NoMatchPage";
import DestinationPage from "./components/pages/DestinationPage";
import FinishPage from "./components/pages/FinishPage";
import HomePage from "./components/pages/HomePage";
import SketchPage from "./components/pages/SketchPage";
import PlacesManagerPage from "./components/pages/PlacesManagerPage";

export default () => (
  <Router>
    <div>
      <MainDrawer />
      <div style={{overflowY:'scroll'}}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/destination" component={DestinationPage} />
          <Route path="/manager" component={PlacesManagerPage} />
          <Route path="/direction" component={SketchPage} />
          <Route path="/finish" component={FinishPage} />
          <Route component={NoMatchPage} />
        </Switch>
      </div>
    </div>
  </Router>
)