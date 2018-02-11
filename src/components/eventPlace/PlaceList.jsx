import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import {withStyles} from 'material-ui/styles';
import List from 'material-ui/List';
import AddIcon from 'material-ui-icons/Add';
import Button from 'material-ui/Button';

import PlaceListItem from './PlaceListItem'



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
    const {goTo, classes} = this.props

    const places = [{id: 1, name: 'Daihatsu'},{id: 2, name: 'Ferarri'}]
    return (
      <div>
        <List component={'nav'}>
          {places.map((place, i) => <PlaceListItem key={i} {...place}/>)}
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

export default withStyles(styles)(withRouter(PlaceList));
