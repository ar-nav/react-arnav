import React from 'react'
import PropTypes from 'prop-types'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {withStyles} from 'material-ui/styles'
import SwipeableViews from 'react-swipeable-views'
import Tabs, {Tab} from 'material-ui/Tabs'
import Typography from 'material-ui/Typography'

import MainAppBar from '../common/MainAppBar'
import MainContainer from '../common/MainContainer'
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

class Destination extends React.Component {
  state = {
    value: 0,
  }

  handleChange = (event, value) => {
    this.setState({value})
  }

  handleChangeIndex = index => {
    this.setState({value: index})
  }

  render() {
    const {classes, theme} = this.props

    return (
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
            <Tab label="By Location"/>
            <Tab label="By Events"/>
          </Tabs>
        </MainAppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
          style={{backgroundColor:'yellow'}}
        >
          <TabContainer dir={theme.direction}>
            <GeneralMapTabPage/>
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <EventsTabPage/>
          </TabContainer>
        </SwipeableViews>
      </div>
    )
  }
}

Destination.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, {withTheme: true})(Destination)
