import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {withStyles} from 'material-ui/styles';
import List from 'material-ui/List';
import AddIcon from 'material-ui-icons/Add';
import Button from 'material-ui/Button';
import EventListItem from './EventListItem'

const styles = theme => ({
  root: {
    width: '100%',
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

class EventList extends Component {

  render() {
    const {classes, goTo} = this.props
    const events = [{id: 1, name: 'GIASS Expo'}, {
      id: 2,
      name: 'Weaboo Conventionxdd'
    }, {id: 3, name: 'Hello World'}]
    return (
      <div className={classes.root}>
        <List component="nav">
          {events.map((event, i) => <EventListItem key={i} {...event}
                                                   goTo={this.props.goTo}/>)}
        </List>
        {goTo === 'manager' && (
          <Button onClick={() => {
            this.props.history.push('/manager/addevent')
          }} variant="fab" color="primary" aria-label="Add Event"
                  className={classes.fab}>
            <AddIcon/>
          </Button>
        )}

      </div>
    );
  }
}

export default withStyles(styles)(withRouter(EventList));