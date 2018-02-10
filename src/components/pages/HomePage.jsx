import React, { Component } from 'react'
import LoginPage from './LoginPage'
import MainAppBar from '../common/MainAppBar'

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  handleClick() {
    this.setState({ open: !this.state.open })
  }

  render() {
    return (
      <div>
        <MainAppBar title='Login'/>
        <LoginPage/>
      </div>
    )
  }
}

export default HomePage
