import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import {withRouter} from 'react-router-dom'

const styles = {
  card: {
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  },
  media: {
    height: 150,
  },
};

function SimpleMediaCard(props) {
  function handleClick () {
    if(props.goTo === 'manager'){
      // props.history.push(`manager/addplace/${props.id}`)
      props.history.push(`manager/places/${props.id}`)
    }else{
      props.history.push(`destination/places/${props.id}`)
    }
  }
  const { classes, goTo } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={`https://placeimg.com/150/150/any?random=${Math.random()}`}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography variant="headline" component="h2">
            {props.name}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={handleClick} variant={'raised'} fullWidth size="small" color="primary">
            {goTo === 'manager' ? 'Register your place here': 'View Places'}
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