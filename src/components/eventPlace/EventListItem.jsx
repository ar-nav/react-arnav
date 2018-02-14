import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';

import Typography from 'material-ui/Typography';
import {withRouter} from 'react-router-dom'
import { graphql } from 'react-apollo';
import gql from "graphql-tag";

const styles = {
  card: {
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
    paddingBottom:10
  },
  media: {
    height: 150,
  },
  deleteButton: {

  }
};

function SimpleMediaCard(props) {
  function handleClick () {
    console.log('yolo', props.parentRoute, props)
    if(props.parentRoute === 'manager'){
      // props.history.push(`manager/addplace/${props.id}`)
      console.log('----------',props)
      props.history.push({
        pathname:`/eventmanager/${props.ID}/places`,
        state:{
          eventName: props.name
        }
      })
    }else{
      props.history.push({pathname:`/${props.ID}/places`,
      state:{
        eventName: props.name
      }
    })
    }
  }

  function handleDelete(){
    const getEventsQuery = gql`
        query getEventsQuery{
            getEvents {
                ID
                name
            }
        }
    `;

    props.mutate({
      variables: {ID: props.ID},
      update: (proxy, { data }) => {
        // Read the data from our cache for this query.
        // const data = proxy.readQuery({ query: getEventsQuery });

        // data.places.push(createTodo);
        console.log(data, 'wolo')
        // Write our data back to the cache.
        // proxy.writeQuery({ query: getEventsQuery, data });
      },
    })
      .then(({data}) => {
        console.log('event Deleted', data)
        props.history.push({
          pathname: `/manager`,
        })
      })
      .catch((error) => {
        console.log('there was an error sending the query', error);
      });
  }

  const { classes, parentRoute } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="headline" component="h2">
            {props.name}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={handleClick} variant={'raised'} fullWidth size="large" color="primary">
            {parentRoute === 'manager' ? 'Add New Place': 'View Places'}
          </Button>
          {parentRoute === 'manager' && (
            <IconButton onClick={handleDelete} color="secondary" className={classes.deleteButton} aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          )}
        </CardActions>
      </Card>
    </div>
  );
}

const query = gql`
  mutation deleteEvent($ID: String!){
      deleteEvent(ID: $ID){
          ID,
      }
  }
`

SimpleMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const WithGraphQl = graphql(query,{
  options: {
    fetchPolicy: 'no-cache'
  }
})(SimpleMediaCard)

export default withStyles(styles)(withRouter(WithGraphQl));