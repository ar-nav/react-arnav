import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './assets/css/main.css'
import store from './store'
import HomePage from './components/pages/HomePage'
import DestinationPage from './components/pages/DestinationPage'
import FinishPage from './components/pages/FinishPage'
import NoMatchPage from './components/pages/NoMatchPage'
import SketchPage from './components/pages/SketchPage'
import PlacesManagerPage from './components/pages/PlacesManagerPage'
import MainDrawer from './components/common/MainDrawer'

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
              <MainDrawer />
              <div style={{overflowY:'scroll'}}>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/destination/" component={DestinationPage} />
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