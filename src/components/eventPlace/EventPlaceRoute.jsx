import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AddIcon from 'material-ui-icons/Add';
import Button from 'material-ui/Button';
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
    const {classes} = this.props
    return (
      <Router>
        <Switch>

          <Route path={'/destination/places/:eventId'} render={()=> (
            <PlaceList/>
          )}/>
          <Route path={'/destination'} render={()=>(
            <EventList goTo={'destination'} />
          )}/>

          <Route path="/manager/addevent" render={()=> <EventForm/>}/>
          <Route path={'/manager/addplace/:eventId'} component={PlaceForm}/>

          <Route path="/manager/places" render={()=> <PlaceList goTo={'manager'}/>} />
          <Route path="/manager" render={()=> <EventList goTo={'manager'}/>} />
        </Switch>
      </Router>
    );
  }
}

export default withStyles(styles)(withRouter(EventPlaceRoute));