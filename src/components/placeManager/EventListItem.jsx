import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import StarIcon from 'material-ui-icons/Star'

class EventListItem extends Component {
  render() {
    return (
      <ListItem button>
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <ListItemText inset primary={this.props.name} />
      </ListItem>
    )
  }
}

export default EventListItem
