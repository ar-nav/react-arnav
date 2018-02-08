import React, { Component } from 'react'

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
        Home
      </div>
    )
  }
}

export default HomePage
