import React, { Component } from 'react';
import {connect} from 'react-redux'
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';

import EventListItem from './EventListItem'

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class EventList extends Component {
 
  render() {
    const {classes} = this.props
    const events = [{name: 'GIASS Expo'},{name:'Weaboo MeetUP'}]
    return (
      <div className={classes.root}>
      <List component="nav">
        {events.map(event => <EventListItem {...event}/>)}
      </List>
    </div>
    );
  }
}

export default withStyles(styles)(EventList);