import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

//screens
import LoginScreen from '../app/screens/LoginScreen.js';
import RegistrationScreen from '../app/screens/RegistrationScreen.js';
import LoggedOutScreen from '../app/screens/LoggedOutScreen.js';

// component 
// import TabBarIcon from '../components/TabBarIcon.js'

const AuthStack = createStackNavigator({
  LoggedOut: LoggedOutScreen,
  Login: LoginScreen,
  Register: RegistrationScreen
})


export default AuthStack
  