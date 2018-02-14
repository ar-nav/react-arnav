import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import {withStyles} from 'material-ui/styles';
import List from 'material-ui/List';
import AddIcon from 'material-ui-icons/Add';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import CemberutIcon from 'material-ui-icons/SentimentNeutral'
import PlaceListItem from './PlaceListItem'
import gql from "graphql-tag";
import {graphql} from "react-apollo/index";
import MainAppBar from '../common/MainAppBar'

import CircularLoader from '../common/LoaderCircular'

const styles = theme => ({
  root: {
    // width: '100%',
    paddingTop: 20,

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
    let titleName = parentRoute ==='destination' ?
    location.state.eventName: 
      `Manage Event: ${location.state.eventName}`
    return (
      <div className={classes.root}>
        <MainAppBar title={titleName}/>
        {data.loading ? (
          <div style={{marginTop: '56px'}}>
            <CircularLoader/>
          </div>
        ) : (

          <div style={{marginTop: '56px', minHeight: 50}}>

            <List component={'nav'}>
              {data.getAllPlaces.filter(place => place.event && place.event.ID===match.params.eventId).length === 0 ? (
                <div style={{textAlign: 'center', marginTop: 30}}>
                  <CemberutIcon/>
                  <Typography  gutterBottom>
                    No place registered to this event
                  </Typography>
                  <Typography  gutterBottom>
                    {parentRoute === 'manager' ?
                      'You can add store or tenant to this event' :
                      'You can comeback later'
                    }
                  </Typography>
                </div>

              ): ''}
              {data.getAllPlaces.filter(place => place.event && place.event.ID ===match.params.eventId).map((place, i) => <PlaceListItem key={place.ID} {...place} parentRoute={parentRoute}/>)
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
        )}
      </div>
    )

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
    fetchPolicy: 'cache-and-network'
  }
})(PlaceList)

export default withStyles(styles)(withRouter(WithGraphQl));
