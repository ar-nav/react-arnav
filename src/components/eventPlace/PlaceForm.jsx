import React, { Component } from 'react';
import Button from 'material-ui/Button';
import {withStyles} from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';


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
      eventId: '1'
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = () => {
    alert(JSON.stringify(this.state, null, 2))
  }

  render() {
    const {classes} = this.props
    return (
      <div className={classes.root}>
        <Typography variant="title" gutterBottom>
          Register Place to this Event
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
    );
  }
}

export default withStyles(styles)(PlaceForm);
