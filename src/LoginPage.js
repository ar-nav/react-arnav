import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login-component';

const styles = {
  container: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      fontFamily: "'Roboto', sans-serif",
  },
};

class LoginPage extends Component {
  constructor (props, context) {
    super(props, context);
  }
  componentDidMount(){
    console.log(this.props)
  }

  responseFacebook(response) {
    console.log(response)
  }

  responseGoogle (googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    console.log({accessToken: id_token});
    //anything else you want to do(save to localStorage)...
  }
 
  render() {
    return (
      <div>
      <FacebookLogin
        appId="593802020971036"
        autoLoad={true}
        fields="name,email,picture"
        callback={this.responseFacebook}
        style={styles.container}
      />
      <GoogleLogin socialId="590843646533-5fluslllasoua91h3ljptoaun55laiin.apps.googleusercontent.com"
        className="google-login"
        scope="profile"
        fetchBasicProfile={false}
        responseHandler={this.responseGoogle}
        buttonText="Login With Google"/>
      </div>
    )
  }
}
 
export default LoginPage;