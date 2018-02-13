import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import MainDrawer from './components/common/MainDrawer'
import NoMatchPage from "./components/pages/NoMatchPage";
import DestinationPage from "./components/pages/DestinationPage";
import FinishPage from "./components/pages/FinishPage";
import HomePage from "./components/pages/HomePage";
import DirectionPage from "./components/pages/DirectionPage";
import PlacesManagerPage from "./components/pages/PlacesManagerPage";
import EventForm from './components/eventPlace/EventForm'
import PlaceList from './components/eventPlace/PlaceList'
import PlaceForm from './components/eventPlace/PlaceForm'

export default () => (
  <Router>
    <div>
      <MainDrawer />
      <div style={{overflowY:'scroll'}}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/destination" component={DestinationPage}/>
          <Route 
            path="/:eventId/places" 
            render={()=> (<PlaceList parentRoute={'destination'}/>)}
          />
          <Route path="/manager" component={PlacesManagerPage} />
          <Route 
            path="/eventmanager/:eventId/places" 
            render={()=> (<PlaceList parentRoute={'manager'}/>)}
          />
          <Route path="/addevent" render={()=> <EventForm/>}/>
          <Route path={'/addplace/:eventId'} component={PlaceForm}/>
          <Route path="/direction" component={DirectionPage} />
          <Route path="/finish" component={FinishPage} />
          
          <Route component={NoMatchPage} />
        </Switch>
      </div>
    </div>
  </Router>
)