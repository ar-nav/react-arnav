import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';

import EventListItem from './EventListItem'

const styles = theme => ({
  root: {
    width: '100%',
  },
});

class EventList extends Component {
 
  render() {
    const {classes} = this.props
    const events = [{id: 1, name: 'GIASS Expo'},{id: 2,name:'Weaboo Conventionxdd'}, {id:3,name: 'Hello World'}]
    return (
      <div className={classes.root}>
      <List component="nav">
        {events.map((event, i) => <EventListItem key={i} {...event} goTo={this.props.goTo}/>)}
      </List>
    </div>
    );
  }
}

export default withStyles(styles)(EventList);