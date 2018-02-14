import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { withStyles } from 'material-ui/styles';
import {withRouter} from 'react-router-dom'

import EventList from './EventList'
import PlaceList from './PlaceList'
import EventForm from './EventForm'
import PlaceForm from './PlaceForm'

const styles = theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

class EventPlaceRoute extends Component {
  render() {
    let parentRoute = 'destination'
    if (this.props.history.location.pathname !== '/destination/events'){
      parentRoute = 'manager'
    }
    return (
      
      <EventList parentRoute={parentRoute} />
      // <Router>
      //   <Switch>

      //     <Route path={'/destination/places/:eventId'} render={()=> (
      //       <PlaceList/>
      //     )}/>
      //     <Route path={'/destination'} render={()=>(
      //       <EventList goTo={'destination'} />
      //     )}/>

      //     <Route path="/manager/addevent" render={()=> <EventForm/>}/>
      //     <Route path={'/manager/addplace/:eventId'} component={PlaceForm}/>

      //     <Route path="/manager/places" render={()=> <PlaceList goTo={'manager'}/>} />
      //     <Route path="/manager" render={()=> <EventList goTo={'manager'}/>} />
      //   </Switch>
      // </Router>
    );
  }
}

export default withStyles(styles)(withRouter(EventPlaceRoute));