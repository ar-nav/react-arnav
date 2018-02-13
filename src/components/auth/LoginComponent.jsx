import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import firebase from 'firebase'
import {withStyles} from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import NavIcon from 'material-ui-icons/Navigation'
import Typography from 'material-ui/Typography';

import Button from 'material-ui/Button'
import {
  FacebookBox,
  GooglePlusBox,
  TwitterBox,
  GithubBox,
} from 'mdi-material-ui'

const styles = theme => ({
  root: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    width:'100%',
    height:'100%',
    overflow: 'hidden',
    background: 'url("./main-cover.jpg")'
  },
  mainHead: {
    display: 'flex',
    flexGrow: 2,
    // backgroundColor: 'yellow',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  navIcon: {
    color: '#00C853',
    backgroundColor: theme.palette.primary,
    fontSize: 200,
  },
  buttonsWrapper:{
    flexGrow: 1,
    display:'flex',
    // backgroundColor: 'green',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainLogo:{
    // width: '70%',

    height:'40px'
  },
  paper: {
    display: 'flex',
    justifyContent: 'center',
    padding: 8,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  button: {

    width: '300px',
    height: '50px',
    marginTop: theme.spacing.unit * 1.5
  },
  text: {
    // margin: 10,
    padding: 10,
    fontSize: 20,
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
        this.props.history.push('/destination/location')
        // ...
      })
      .catch(function (error) {
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
    const {classes} = this.props
    return (
      <div className={classes.root}>
        <div className={classes.mainHead}>
          <NavIcon className={classes.navIcon} fontSize/>
          <img className={classes.mainLogo} src="main-logo.png"/>
        </div>
        <div className={classes.buttonsWrapper}>
          <Typography variant="caption" gutterBottom align="center" style={{color:'white'}}>
            Please login to continue
          </Typography>
          <Button
            className={classes.button}
            variant="raised"
            // color="secondary"
            size="small"
            style={{backgroundColor: '#db3236', color: 'white'}}
            onClick={() => {
              this.handleClick(googleProvider)
            }}
          >
            <GooglePlusBox/>
            <div className={classes.text}>Google</div>
          </Button>
          <Button
            className={classes.button}
            variant="raised"
            size="small"
            style={{backgroundColor: '#3b5998', color: 'white'}}
            onClick={() => {
              this.handleClick(facebookProvider)
            }}
          >
            <FacebookBox/>
            <div className={classes.text}>Facebook</div>
          </Button>

          {/*<Button*/}
            {/*className={classes.button}*/}
            {/*variant="raised"*/}
            {/*color="primary"*/}
            {/*size="large"*/}
            {/*onClick={() => {*/}
              {/*this.handleClick(twitterProvider)*/}
            {/*}}*/}
          {/*>*/}
            {/*<TwitterBox/>*/}
            {/*<div className={classes.text}>Twitter</div>*/}
          {/*</Button>*/}
          {/*<Button*/}
            {/*className={classes.button}*/}
            {/*variant="raised"*/}
            {/*color="default"*/}
            {/*size="large"*/}
            {/*onClick={() => {*/}
              {/*this.handleClick(githubProvider)*/}
            {/*}}*/}
          {/*>*/}
            {/*<GithubBox/>*/}
            {/*<div className={classes.text}>Github</div>*/}
          {/*</Button>*/}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state,
})

const LoginWithRouter = withRouter(LoginComponent)
const LoginComponentWithStyle = withStyles(styles)(LoginWithRouter)

export default connect(mapStateToProps, null)(LoginComponentWithStyle)
