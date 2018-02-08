import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import firebase from "firebase";
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button'
import Icon from 'material-ui/Icon'

let config = {
  apiKey: "AIzaSyBfhHdyNVEK_Nb2MxU6c9skmj-Odgs6gyI",
  authDomain: "example-189109.firebaseapp.com"
};
firebase.initializeApp(config);

let googleProvider = new firebase.auth.GoogleAuthProvider();
let facebookProvider = new firebase.auth.FacebookAuthProvider();
let twitterProvider = new firebase.auth.TwitterAuthProvider();
let githubProvider = new firebase.auth.GithubAuthProvider();

const styles = theme =>( {
  container: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      fontFamily: "'Roboto', sans-serif",
  },
})

class LoginPage extends Component {
  constructor (props) {
    super(props);
  }
  
  componentDidMount(){
    console.log(this.props)
  }

  handleClick(provider) {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(this.props.history)
        this.props.history.push('/destination')
        // ...
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(error)
        // ...
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button variant="raised"  color="secondary"  onClick={() => { this.handleClick(facebookProvider)}}>
          Facebook
        </Button>
        <Button variant="raised"  color="secondary"  onClick={() => {this.handleClick(googleProvider)}}>
          Google
        </Button>
        <Button variant="raised"  color="secondary"  onClick={() => { this.handleClick(twitterProvider)}}>
          Twitter
        </Button>
        <Button variant="raised" color="secondary" onClick={() => { this.handleClick(githubProvider)}}>
        Github
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state,
})

const LoginWithRouter = withRouter(LoginPage)
 
export default connect(mapStateToProps,null)(LoginWithRouter)