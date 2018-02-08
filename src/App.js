import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import FileSelection from './FileSelection';
import Sketch from './Sketch';
import store from './store'
import LoginPage from './LoginPage'
import PickDestination from './PickDestination'
import ArahanPage from './ArahanPage'
import FinishPage from './FinishPage'
import NoMatch from './NoMatch'

const styles = {
    container: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        fontFamily: "'Roboto', sans-serif",
    },
};

class App extends Component {
    state = {
        image: null,
    };

    handleFileSelected = ({ image, whiteImage, blackImage }) => {
        this.setState({ image, whiteImage, blackImage });
    }


    render() {
        const { image, whiteImage, blackImage } = this.state;
        console.log(this.state)
        return (
          <Provider store= { store } >
            <MuiThemeProvider>
                <div>
                  <div style={styles.container}>
                      {!image && <FileSelection onFileSelected={this.handleFileSelected} />}
                      {image && <Sketch image={image} whiteImage={whiteImage} blackImage={blackImage} />}
                  </div>
                  <Router>
                    <Switch>
                      <Route exact path="/" render={() => <LoginPage/>}/>
                      <Route path="/pick" render={() => <PickDestination/>}/>
                      <Route path="/arahan" render={() => <ArahanPage/>}/>
                      <Route path="/finish" render={() => <FinishPage/>}/>
                      <Route render={() => <NoMatch/>}/>
                    </Switch>
                </Router>
                </div>
            </MuiThemeProvider>
          </Provider>
        )
    }
}

export default App;
