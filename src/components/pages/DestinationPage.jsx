import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
  Route,

  withRouter,
  Link
} from 'react-router-dom'
import {withStyles} from 'material-ui/styles'
import Tabs, {Tab} from 'material-ui/Tabs'
import Typography from 'material-ui/Typography'

import MainAppBar from '../common/MainAppBar'
import ByLocationTabPage from '../destination/ByLocationTabPage'
import GeneralMapTabPage from '../destination/GeneralMapTabPage'
import EventsTabPage from '../destination/EventsTabPage'

function TabContainer({children, dir}) {
  return (
    <Typography component="div" dir={dir}>
      {children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
}

const styles = theme => ({
  root: {},
  navigator: {
    display: 'flex',
  },
})

class Destination extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.getActiveIndex(),
    }
  }

  getActiveIndex = () => this.props.location.pathname === '/destination/location' ? 0 : 1

  handleChange = (event, value) => {
    this.setState({value})
  }

  render() {
    const {classes} = this.props
    return (
      <Router>
        <div className={classes.root}>
          <MainAppBar title='Choose Destination'>
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered={true}
              fullWidth
            >
              <Tab label="By Location" component={Link} to="/destination/location"/>
              <Tab label="By Events" component={Link} to="/destination/events"/>
            </Tabs>
          </MainAppBar>
          <Route exact path={'/destination/location'} component={ByLocationTabPage}/>
          {/*<Route exact path={'/destination/location'} component={GeneralMapTabPage}/>*/}
          <Route path={'/destination/events'} component={EventsTabPage} />
        </div>
      </Router>
    )
  }
}

Destination.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, {withTheme: true})(withRouter(Destination))
