import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// import FileSelection from './FileSelection'
// import Sketch from './Sketch'
import store from './store'
import HomePage from './components/HomePage'
import DestinationPage from './components/Destination'
import DirectionPage from './components/ArahanPage'
import FinishPage from './components/FinishPage'
import NoMatch from './components/NoMatch'
import Sketch from './Sketch'

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
                <Route exact path="/" render={() => <HomePage />} />
                <Route path="/destination" component={DestinationPage} />
                <Route path="/direction" component={Sketch} />
                <Route path="/finish" render={() => <FinishPage />} />
                <Route render={() => <NoMatch />} />
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