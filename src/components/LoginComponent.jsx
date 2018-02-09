import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Card, { CardActions, CardContent } from 'material-ui/Card'
// import Avatar from 'material-ui/Avatar'
// import IconButton from 'material-ui/IconButton'

import { FacebookBox, GooglePlusBox, TwitterBox, GithubBox } from 'mdi-material-ui'

import { withRouter } from 'react-router-dom'
import firebase from 'firebase'

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  paper: {
    display: 'flex',
    justifyContent: 'center',
    padding: 20,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  button: {
    flex: 1,
  },
})

let config = {
  apiKey: 'AIzaSyBfhHdyNVEK_Nb2MxU6c9skmj-Odgs6gyI',
  authDomain: 'example-189109.firebaseapp.com',
}
firebase.initializeApp(config)

let googleProvider = new firebase.auth.GoogleAuthProvider()
let facebookProvider = new firebase.auth.FacebookAuthProvider()
let twitterProvider = new firebase.auth.TwitterAuthProvider()
let githubProvider = new firebase.auth.GithubAuthProvider()

class LoginComponent extends Component {
  handleClick(provider) {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = result.credential.accessToken;
        // The signed-in user info.
        // var user = result.user;
        this.props.history.push('/destination')
        // ...
      })
      .catch(function(error) {
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // The email of the user's account used.
        // var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        console.log(error)
        // ...
      })
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title}>Logo</Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
        <div className={classes.paper}>
          <div className={classes.paper}>
            <Paper className={classes.paper}>
              <Grid container wrap="nowrap">
                <Grid item xs>
                  <Button
                    variant="fab"
                    color="primary"
                    aria-label="add"
                    className={classes.button}
                    onClick={() => { this.handleClick(facebookProvider)}}
                  >
                    <FacebookBox />
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </div>
          
          <div className={classes.paper}>
            <Paper className={classes.paper}>
              <Grid container wrap="nowrap">
                <Grid item xs>
                  <Button
                    variant="fab"
                    color="secondary"
                    aria-label="add"
                    className={classes.button}
                    onClick={() => {this.handleClick(googleProvider)}}
                  >
                    <GooglePlusBox />
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </div>

          <div className={classes.paper}>
            <Paper className={classes.paper}>
              <Grid container wrap="nowrap">
                <Grid item xs>
                  <Button
                    variant="fab"
                    color="primary"
                    aria-label="add"
                    className={classes.button}
                    onClick={() => { this.handleClick(twitterProvider)}}
                  >
                    <TwitterBox />
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </div>

          <div className={classes.paper}>
            <Paper className={classes.paper}>
              <Grid container wrap="nowrap">
                <Grid item xs>
                  <Button
                    variant="fab"
                    color="default"
                    aria-label="add"
                    className={classes.button}
                    onClick={() => { this.handleClick(githubProvider)}}
                  >
                    <GithubBox />
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </div>
        </div>
      </div>
    )
  }
}

LoginComponent.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  ...state,
})

const LoginWithRouter = withRouter(LoginComponent)
const LoginComponentWithStyle = withStyles(styles)(LoginWithRouter)

export default connect(mapStateToProps, null)(LoginComponentWithStyle)
