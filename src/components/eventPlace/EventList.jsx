import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {withStyles} from 'material-ui/styles';
import List from 'material-ui/List';
import AddIcon from 'material-ui-icons/Add';
import Button from 'material-ui/Button';
import EventListItem from './EventListItem'
import gql from "graphql-tag";
import {graphql} from "react-apollo/index";

import LoaderCircular from '../common/LoaderCircular'

const styles = theme => ({
  root: {
    width: '100%',
    paddingTop: 10,
    marginBottom: 70
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

class EventList extends Component {
  render() {
    const {classes, parentRoute, data} = this.props
    return data.loading ? (<LoaderCircular/>) : (
      <div className={classes.root}>
        <List component="nav">
          {data.getEvents.map((event, i) => <EventListItem  key={event.ID} {...event}
                                                   parentRoute={parentRoute}/>)}
        </List>
        {parentRoute === 'manager' && (
          <Button onClick={() => {
            this.props.history.push('/addevent')
          }} variant="fab" color="primary" aria-label="Add Event"
                  className={classes.fab}>
            <AddIcon/>
          </Button>
        )}

      </div>
    );
  }
}

const query = gql`
    query getEventsQuery{
        getEvents {
            ID
            name
        }
    }
`;

const WithGraphQl = graphql(query, {
  options: {
    fetchPolicy: 'network-only'
  }
})(EventList)


export default withStyles(styles)(withRouter(WithGraphQl));