import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AddIcon from 'material-ui-icons/Add';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

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
          <Route path={'/manager/addplace/:eventId'} component={PlaceForm}/>
          <Route path={'/manager/addevent'} component={EventForm}/>
          <Route path="/manager/places" render={()=>(
            <div>
              <PlaceList/>
              <Button variant="fab" color="secondary" aria-label="Add Place" className={classes.fab}>
                <AddIcon/>
              </Button>
            </div>
          )} />
          <Route path="/manager" render={()=>(
            <div>
              <EventList goTo={'manager'}/>
              <Button variant="fab" color="primary" aria-label="Add Event" className={classes.fab}>
                <AddIcon/>
              </Button>
            </div>
          )} />
        </Switch>
      </Router>
    );
  }
}

export default withStyles(styles)(EventPlaceRoute);