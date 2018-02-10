import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import LoginComponent from './LoginComponent'

class LoginPage extends Component {
  
  render() {
    return (
      <div>
        <LoginComponent/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state,
})

const LoginWithRouter = withRouter(LoginPage)
 
export default connect(mapStateToProps,null)(LoginWithRouter)