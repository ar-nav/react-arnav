import React, {Component} from 'react';
import Button from 'material-ui/Button';
import {withStyles} from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import MapWithSearchBox from '../destination/MapWithSearchBox'
import MainAppBar from '../common/MainAppBar'
import {setPlacesLocation} from "../../store/action";


const styles = theme => ({
  root: {
    padding: theme.spacing.unit,
    marginTop: '30px'
  },
  textField: {},
  button: {
    marginTop: theme.spacing.unit * 2,
  },
  wrapTop: {
    marginTop: 56
  }
})

class PlaceForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      latitude: '',
      longitude: '',
      eventId: this.props.match.params.eventId,
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  componentWillReceiveProps(nextProps) {

    console.log('formPlaceLocation', nextProps.formPlaceLocation)
    this.setState({
      name: nextProps.formPlaceLocation.name,
      latitude: nextProps.formPlaceLocation.latitude,
      longitude: nextProps.formPlaceLocation.longitude
    })
  }

  render() {
    console.log(this.state.latitude, this.state.longitude)
    const {classes, match, location} = this.props
    return (
      <div className={classes.wrapTop}>
        <MainAppBar title='Add new Place'/>
        <div style={{height: '50vh'}}>
          <MapWithSearchBox isManager={true}/>
        </div>
        <div className={classes.root}>
          <Typography variant="title" gutterBottom>
            Register your place to {location.state.eventName}
          </Typography>
          <TextField
            value={this.state.name}
            fullWidth
            label="Place name"
            placeholder="For example: My Great Tenant"
            className={classes.textField}
            onChange={this.handleChange('name')}
            margin="normal"
          />


          <TextField
            value={this.state.latitude}
            fullWidth
            label="Latitude"
            placeholder="Latitude"
            className={classes.textField}
            onChange={this.handleChange('latitude')}
            margin="normal"
          />
          <TextField
            value={this.state.longitude}
            fullWidth
            label="Longitude"
            placeholder="Longitude"
            className={classes.textField}
            onChange={this.handleChange('longitude')}
            margin="normal"
          />

          <Button size={'large'} onClick={this.handleSubmit} color={'primary'}
                  fullWidth
                  variant="raised" className={classes.button}>
            Register Place
          </Button>
        </div>
      </div>
    )
  }

  handleSubmit = () => {
    const {name, latitude, longitude, eventId} = this.state

    this.props.mutate({
      variables: {name, latitude, longitude, eventId}
    })
      .then(({data}) => {
        console.log('jadi', data)
        this.props.history.push({
          pathname: `/eventmanager/${eventId}/places`,
          state: {
            eventName: this.props.location.state.eventName
          }
        })
      })
      .catch((error) => {
        console.log('there was an error sending the query', error);
      });
  }

}


const query = gql`
    mutation createPlace(
    $name: String!,
    $latitude: String!,
    $longitude: String!,
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


const mapStateToProps = state => ({
  formPlaceLocation: state.formPlaceLocation
})


const withGraphQL = graphql(query)(PlaceForm)
const withConnect = connect(mapStateToProps, null)(withGraphQL)
export default withStyles(styles)(withRouter(withConnect));
