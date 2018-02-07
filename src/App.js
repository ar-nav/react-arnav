import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux'
import { StackNavigator } from 'react-navigation';

import FileSelection from './FileSelection';
import Sketch from './Sketch';
import store from './store'
import LoginPage from './LoginPage'
import PickDestination from './PickDestination'
import ArahanPage from './ArahanPage'
import FinishPage from './FinishPage'

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

// const AppNav = StackNavigator({
//   Login: { screen: LoginPage },
//   PickDest: { screen: PickDestination },
//   Arahan: { screen: ArahanPage },
//   Finish: { screen: FinishPage }
// });

class App extends Component {
    state = {
        image: null,
    };

    handleFileSelected = ({ image, whiteImage, blackImage }) => {
        this.setState({ image, whiteImage, blackImage });
    }
    render() {
        const { image, whiteImage, blackImage } = this.state;

        return (
          <Provider store= { store } >
            <MuiThemeProvider>
                <div style={styles.container}>
                    {!image && <FileSelection onFileSelected={this.handleFileSelected} />}
                    {image && <Sketch image={image} whiteImage={whiteImage} blackImage={blackImage} />}
                </div>
                {/* <AppNav/> */}
            </MuiThemeProvider>
          </Provider>
        )
    }
}

export default App;
