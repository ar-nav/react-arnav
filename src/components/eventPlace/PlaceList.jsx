import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import {withStyles} from 'material-ui/styles';
import List from 'material-ui/List';
import AddIcon from 'material-ui-icons/Add';
import Button from 'material-ui/Button';

import PlaceListItem from './PlaceListItem'
import gql from "graphql-tag";
import {graphql} from "react-apollo/index";
import MainAppBar from '../common/MainAppBar'



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


class PlaceList extends Component {
  render() {
    const {parentRoute, classes, data, match, location} = this.props
    console.log('----------->>',location.state.eventName)
    let titleName = parentRoute==='destination' ? 
    location.state.eventName: 
      `manage event: ${location.state.eventName}`
    return data.loading ? (<div>Loading</div>) : (
      <div>
        <MainAppBar title={titleName}/>
        <List component={'nav'}>
          {data.getAllPlaces.filter(place => place.event.ID===match.params.eventId)
          .map((place, i) => <PlaceListItem key={place.ID} {...place} parentRoute={parentRoute}/>)
          }
        </List>
        {parentRoute === 'manager' && (
          <Button onClick={() => {
            this.props.history.push({
              pathname:`/addplace/${match.params.eventId}`,
              state:{
                eventName: location.state.eventName
              }
            })
          }} variant="fab" color="secondary" aria-label="Add Places"
                  className={classes.fab}>
            <AddIcon/>
          </Button>
        )}
      </div>

    );
  }
}

const query = gql`
    query getAllPlaces{
        getAllPlaces {
            ID
            name
            latitude
            longitude
            event{
              ID
            }
        }
    }
`;

const WithGraphQl = graphql(query, {
  options: {
    fetchPolicy: 'network-only'
  }
})(PlaceList)

export default withStyles(styles)(withRouter(WithGraphQl));
