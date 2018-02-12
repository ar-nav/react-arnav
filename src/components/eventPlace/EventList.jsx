import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {withStyles} from 'material-ui/styles';
import List from 'material-ui/List';
import AddIcon from 'material-ui-icons/Add';
import Button from 'material-ui/Button';
import EventListItem from './EventListItem'
import gql from "graphql-tag";
import {graphql} from "react-apollo/index";

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
    const {classes, goTo, data} = this.props
    console.log('data:',data.getEvents)

    return data.loading ? (<div>Loading</div>) : (
      <div className={classes.root}>
        <List component="nav">
          {data.getEvents.map((event, i) => <EventListItem key={event.ID} {...event}
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

const WithGraphQL = gql`
    query hola{
        getEvents {
            ID
            name
        }
    }
`;


const ProfileWithData = graphql(WithGraphQL)(EventList);

export default withStyles(styles)(withRouter(ProfileWithData));