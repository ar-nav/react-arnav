import React from 'react'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'

import Place from 'material-ui-icons/Place'

function FolderList(props) {
  // const { classes } = props
  return (
    <div>
      <List>

        <ListItem>
          <Avatar>
            <Place />
          </Avatar>
          <ListItemText primary="Hacktiv8"/>
        </ListItem>

        <ListItem>
          <Avatar>
            <Place />
          </Avatar>
          <ListItemText primary="Pondok Indah"/>
        </ListItem>

      </List>
    </div>
  )
}

export default FolderList
