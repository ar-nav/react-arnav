import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import {withStyles} from 'material-ui/styles';
import List from 'material-ui/List';
import AddIcon from 'material-ui-icons/Add';
import Button from 'material-ui/Button';

import PlaceListItem from './PlaceListItem'
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


class PlaceList extends Component {
  render() {
    const {goTo, classes, data} = this.props
    console.log(data)
    return data.loading ? (<div>Loading</div>) : (
      <div>
        <List component={'nav'}>
          {data.getAllPlaces.map((place, i) => <PlaceListItem key={place.ID} {...place}/>)}
        </List>
        {goTo === 'manager' && (
          <Button onClick={() => {
            this.props.history.push('/manager/addplace/1')
          }} variant="fab" color="secondary" aria-label="Add Places"
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
        getAllPlaces {
            ID
            name
        }
    }
`;

export default withStyles(styles)(withRouter(graphql(WithGraphQL)(PlaceList)));
