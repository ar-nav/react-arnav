import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { Provider } from 'react-redux'
import { HttpLink } from 'apollo-link-http';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { setContext } from 'apollo-link-context';

import './assets/css/main.css'
import {store} from './store'
import MainRouter from './MainRouter'
import mainTheme from './mainTheme'

const link = new HttpLink({ uri: 'https://ael3l4ewpbffzmehxdpvxlfigm.appsync-api.us-east-1.amazonaws.com/graphql' });

const authLink = setContext((_, { headers }) => {
  const APIKEY = 'da2-arau223jmbbiddhflcebwwxhuq'
  return {
    headers: {
      ...headers,
      'x-api-key': APIKEY
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache()
});


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ApolloProvider client={client} >
          <MuiThemeProvider theme={mainTheme}>
            <MainRouter/>
          </MuiThemeProvider>
        </ApolloProvider>
      </Provider>
    )
  }
}

export default App