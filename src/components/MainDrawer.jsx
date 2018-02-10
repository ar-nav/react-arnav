import React from 'react'
import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom'

import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import List from 'material-ui/List'
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'

import HomeIcon from 'material-ui-icons/Home'
import DoneIcon from 'material-ui-icons/Done'
import DirectionsWalk from 'material-ui-icons/DirectionsWalk'
import BeachAccessIcon from 'material-ui-icons/BeachAccess'

import { toggleDrawer } from '../store/action'

const styles = {
  list: {
    width: 250,
  },
  listFull: {
    width: 'auto',
  },
}

class TemporaryDrawer extends React.Component {
  toggleDrawer = (side, open) => () => {}

  handleClick(routeName) {
    this.props.closeDrawer()
    alert(routeName)
  }

  render() {
    const { classes } = this.props

    const sideList = (
      <div className={classes.list}>
        <List>
          <ListItem button onClick={() => this.props.history.push('/')}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>

          <ListItem
            button
            onClick={() => this.props.history.push('/destination')}
          >
            <ListItemIcon>
              <BeachAccessIcon />
            </ListItemIcon>
            <ListItemText primary="Destination" />
          </ListItem>

          <ListItem
            button
            onClick={() => this.props.history.push('/direction')}
          >
            <ListItemIcon>
              <DirectionsWalk />
            </ListItemIcon>
            <ListItemText primary="Direction" />
          </ListItem>
          <ListItem
            button
            onClick={() => this.props.history.push('/manager')}
          >
            <ListItemIcon>
              <DirectionsWalk />
            </ListItemIcon>
            <ListItemText primary="Manager" />
          </ListItem>
          <ListItem button onClick={() => this.props.history.push('/finish')}>
            <ListItemIcon>
              <DoneIcon />
            </ListItemIcon>
            <ListItemText primary="Finish" />
          </ListItem>
        </List>
      </div>
    )
    return (
      <Drawer open={this.props.drawerOpen} onClose={this.props.closeDrawer}>
        <div
          tabIndex={0}
          role="button"
          onClick={this.props.closeDrawer}
          onKeyDown={this.props.closeDrawer}
        >
          {sideList}
        </div>
      </Drawer>
    )
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  ...state,
})

const mapDispatchToProps = dispatch => ({
  closeDrawer: () => dispatch(toggleDrawer(false)),
})

const drawerWithRouter = withRouter(TemporaryDrawer)
const DrawerWithStyles = withStyles(styles)(drawerWithRouter)

export default connect(mapStateToProps, mapDispatchToProps)(DrawerWithStyles)
