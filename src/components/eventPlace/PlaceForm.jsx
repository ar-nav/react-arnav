import React, { Component } from 'react';
import Button from 'material-ui/Button';
import {withStyles} from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {withRouter} from 'react-router-dom'

import MainAppBar from '../common/MainAppBar'


const styles = theme => ({
  root: {
    padding: theme.spacing.unit
  },
  textField: {

  },
  button: {
    marginTop: theme.spacing.unit * 2,
  },
})

class PlaceForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      latitude: '',
      longitude: '',
      eventId: this.props.match.params.eventId
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };


  render() {
    console.log(this.props  )
    const {classes, match} = this.props
    return (
      <div>
        <MainAppBar title='Add new Place'/>
        <div className={classes.root}>
          <Typography variant="title" gutterBottom>
            Register Place to {match.params.event.split('-')[0]}
          </Typography>
          <TextField
            fullWidth
            label="Place name"
            placeholder="For example: My Great Tenant"
            className={classes.textField}
            onChange={this.handleChange('name')}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Latitude"
            placeholder="Latitude"
            className={classes.textField}
            onChange={this.handleChange('latitude')}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Longitude"
            placeholder="Longitude"
            className={classes.textField}
            onChange={this.handleChange('longitude')}
            margin="normal"
          />
          <Button onClick={this.handleSubmit} color={'primary'} fullWidth
                  variant="raised" className={classes.button}>
            Submit
          </Button>
        </div>
      </div>
    )
  }
  handleSubmit = () => {
    const {name, latitude, longitude, eventId} = this.state
    console.log(this.state)
    this.props.mutate({
      variables: { name, latitude, longitude, eventId}
    })
      .then(({ data }) => {
        console.log('jadi', data)
        this.props.history.push('/manager/places')
      })
      .catch((error) => {
        console.log('there was an error sending the query', error);
      });
  }

}


const createPlacea = gql`
    mutation createPlace(
        $name: String!,
        $latitude: Int!,
        $longitude: Int!,
        $eventId: String!, 
    ) {
        createPlace(input: {
            name: $name,
            latitude: $latitude,
            longitude: $longitude,
            eventId: $eventId
            
        }){
           ID
           name 
        }
    }
`;


const withGraphQL = graphql(createPlacea)(PlaceForm)

export default withStyles(styles)(withRouter(withGraphQL));
