import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import store from './app/redux/store.js'
import { Provider } from 'react-redux';


import AppNavigator from './navigation/AppNavigator';

import Amplify, { Auth } from 'aws-amplify';
import config from './aws-config';

Amplify.configure({
  Auth: {
    mandatorySignIn: false,
    region: config.REGION,
    userPoolId: config.USER_POOL_ID,
    // identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.APP_CLIENT_ID
  },
});

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}


