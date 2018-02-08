import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  paper: {
    padding: 16,
    flexGrow: 1,
    color: theme.palette.text.secondary,
  },
})

function FullWidthGrid(props) {
  const { classes } = props

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>{props.children}</Paper>
        </Grid>
      </Grid>
    </div>
  )
}

FullWidthGrid.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(FullWidthGrid)
