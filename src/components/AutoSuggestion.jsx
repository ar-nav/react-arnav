import React from 'react'
import PropTypes from 'prop-types'
import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import { MenuItem } from 'material-ui/Menu'
import { withStyles } from 'material-ui/styles'

import { fetchSuggestions, fetchDetailTarget } from '../store/action'
import { connect } from 'react-redux'

const suggestions = [
  { description: 'Afghanistan' },
  { description: 'Aland Islands' },
  { description: 'Albania' },
  { description: 'Algeria' },
  { description: 'American Samoa' },
  { description: 'Andorra' },
  { description: 'Angola' },
  { description: 'Anguilla' },
  { description: 'Antarctica' },
  { description: 'Antigua and Barbuda' },
  { description: 'Argentina' },
  { description: 'Armenia' },
  { description: 'Aruba' },
  { description: 'Australia' },
  { description: 'Austria' },
  { description: 'Azerbaijan' },
  { description: 'Bahamas' },
  { description: 'Bahrain' },
  { description: 'Bangladesh' },
  { description: 'Barbados' },
  { description: 'Belarus' },
  { description: 'Belgium' },
  { description: 'Belize' },
  { description: 'Benin' },
  { description: 'Bermuda' },
  { description: 'Bhutan' },
  { description: 'Bolivia, Plurinational State of' },
  { description: 'Bonaire, Sint Eustatius and Saba' },
  { description: 'Bosnia and Herzegovina' },
  { description: 'Botswana' },
  { description: 'Bouvet Island' },
  { description: 'Brazil' },
  { description: 'British Indian Ocean Territory' },
  { description: 'Brunei Darussalam' },
]

function renderInput(inputProps) {
  const { classes, ref, ...other } = inputProps

  return (
    <TextField
      label="Search a Place"
      fullWidth
      inputRef={ref}
      InputProps={{
        classes: {
          input: classes.input,
        },
        ...other,
      }}
    />
  )
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.description, query)
  const parts = parse(suggestion.description, matches)

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </strong>
          )
        })}
      </div>
    </MenuItem>
  )
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  )
}

function getSuggestions(value) {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length
  let count = 0

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 &&
          suggestion.description.toLowerCase().slice(0, inputLength) === inputValue

        if (keep) {
          count += 1
        }

        return keep
      })
}

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
    height: 200,
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
})

class IntegrationAutosuggest extends React.Component {
  state = {
    value: '',
    suggestions: [],
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    })
  }

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    })
  }

  handleChange = (event, { newValue }) => {
    this.props.fetchSuggestions(newValue)
    this.setState({
      value: newValue,
    })
  }

  getSuggestionValue = (suggestion) => {
    this.props.fetchDetailTarget(suggestion.place_id)
    return suggestion.description
  }

  render() {
    const { classes } = this.props
    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderInputComponent={renderInput}
        suggestions={this.props.suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          classes,
          placeholder: 'Search a place',
          value: this.state.value,
          onChange: this.handleChange,
        }}
      />
    )
  }
}

IntegrationAutosuggest.propTypes = {
  classes: PropTypes.object.isRequired,
}

const placeAutoCompleteWithStyles = withStyles(styles)(IntegrationAutosuggest)

const mapStateToProps = state => ({ ...state })

const mapDispatchToProps = dispatch => ({
  fetchSuggestions: (query) =>
    dispatch(fetchSuggestions(query, { lat: -6.266, long: 106.7828454 })),
  fetchDetailTarget: (id) => dispatch(fetchDetailTarget(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  placeAutoCompleteWithStyles
)
