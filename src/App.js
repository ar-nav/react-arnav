import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// import FileSelection from './FileSelection'
// import Sketch from './Sketch'
import store from './store'
import HomePage from './components/HomePage'
import DestinationPage from './components/Destination'
import FinishPage from './components/FinishPage'
import NoMatchPage from './components/NoMatch'
import SketchPage from './Sketch'
import PlacesManagerPage from './components/PlacesManagerPage'

import AppBar from './components/AppBar'
import MainDrawer from './components/MainDrawer'

const theme = createMuiTheme()

class App extends Component {
  state = {
    image: null,
  }

  handleFileSelected = ({ image, whiteImage, blackImage }) => {
    this.setState({ image, whiteImage, blackImage })
  }

  render() {
    // const { image, whiteImage, blackImage } = this.state
    console.log(this.state)
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <Router>
            <div>
              <AppBar />
              <MainDrawer />
              <div style={{marginTop: '100px'}}>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/destination" component={DestinationPage} />
                <Route path="/manager" component={PlacesManagerPage} />
                <Route path="/direction" component={SketchPage} />
                <Route path="/finish" component={FinishPage} />
                <Route component={NoMatchPage} />
              </Switch>
              </div>
            </div>
          </Router>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

export default App