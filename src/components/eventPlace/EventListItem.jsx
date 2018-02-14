import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import {withRouter} from 'react-router-dom'
import { graphql } from 'react-apollo';

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
            {parentRoute === 'manager' ? 'Register your place here': 'View Places'}
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

SimpleMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(withRouter(SimpleMediaCard));