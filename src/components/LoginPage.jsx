import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login-component'
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button'

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
  constructor (props) {
    super(props);
  }
  
  componentDidMount(){
    console.log(this.props)
  }

  responseFacebook(response) {
    console.log(response)
  }

  responseGoogle = (googleUser) => {
    var id_token = googleUser.getAuthResponse().id_token;
    console.log({accessToken: id_token})
    this.props.history.push('/destination')
  }
 
  render() {
    return (
      <div>
      {/* <FacebookLogin
        appId="593802020971036"
        autoLoad={true}
        fields="name,email,picture"
        callback={this.responseFacebook}
        style={styles.container}
      /> */}
      {/* <Button variant="raised"> */}
      <GoogleLogin socialId="590843646533-5fluslllasoua91h3ljptoaun55laiin.apps.googleusercontent.com"
        className="MuiButtonBase-root-47 MuiButton-root-102 MuiButton-raised-107"
        scope="profile"
        fetchBasicProfile={false}
        responseHandler={this.responseGoogle}
        buttonText="Login With Google"
        />
      {/* </Button> */}
      <br/>
      <br/>
      <Button variant="raised"  color="secondary">
        Home
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