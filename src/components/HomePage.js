import React, { Component } from 'react'
import LoginPage from './LoginPage'

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
        <LoginPage/>
      </div>
    )
  }
}

export default HomePage
