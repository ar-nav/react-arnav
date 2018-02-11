import React, {Component} from 'react';
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
  };

  handleSubmit = () => {
    alert(JSON.stringify(this.state, null, 2))
  }

  render() {
    const {classes} = this.props
    return (
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
    );
  }
}



export default withStyles(styles)(EventForm);