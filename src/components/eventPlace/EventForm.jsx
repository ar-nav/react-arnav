import React, {Component} from 'react';
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


class EventForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      imageUrl: ''
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };i

  handleSubmit = () => {
    // alert(JSON.stringify(this.state, null, 2))
    this.props.mutate({
      variables: { eventName: this.state.name }
    })
      .then(({ data }) => {
        this.props.history.push('/manager/events')
      })
      .catch((error) => {
        console.log('there was an error sending the query', error);
    });
  }

  render() {
    const {classes} = this.props
    return (
      <div>
        <MainAppBar title='Add new Event'/>
        <div className={classes.root}>
          <Typography variant="title" gutterBottom>
            Create new event
          </Typography>
          <TextField
            fullWidth
            label="Event name"
            placeholder="For example: The Great Expo"
            className={classes.textField}
            margin="normal"
            onChange={this.handleChange('name')}
          />
          <TextField
            fullWidth
            label="Event image URL"
            placeholder="http://example.com/eventphoto.jpg"
            className={classes.textField}
            margin="normal"
            onChange={this.handleChange('imageUrl')}
          />
          <Button onClick={this.handleSubmit} color={'primary'} fullWidth
                  variant="raised" className={classes.button}>
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

const createEvent = gql`
  mutation createEvent($eventName: String!) {
    createEvent(input: {
        eventName: $eventName
    }) {
        ID,
        name
    }
  }
`;


const withGraphQL = graphql(createEvent)(EventForm)

export default withStyles(styles)(withRouter(withGraphQL));
