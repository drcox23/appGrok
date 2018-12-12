import React, { Component } from 'react';
import colors from '../styles/colors/index.js';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RoundedButton from '../components/buttons/RoundedButton.js'

import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';

// import LoginScreen from '../app/screens/LoginScreen.js';

export default class LoggedOut extends Component {
  static navigationOptions = {
    title: "LoggedOut",
  }

  render() {
    // const { navigate } = this.props.navigation;
    return (
      <View style={styles.wrapper}>
        <View style={styles.welcomeWrapper}>
          <Image
            source={require('../img/dino.png')}
            style={styles.logo}
          />
          <Text style={styles.welcomeText}>Welcome to Grok</Text>
          <RoundedButton
            text="Get Started"
            textColor={colors.lightBlack}
            background={colors.white}
            icon={<Icon name="facebook" size={20} style={styles.facebookButtonIcon} />}
            handleOnPress={this.onGetStarted}
          />
          <RoundedButton
            text="Create Account"
            textColor={colors.white}
            handleOnPress={this.onCreateAccount}
          />


        </View>
      </View>
    )
  }

  onGetStarted() {
    console.log('hitting')

  }

  onCreateAccount() {
    alert('Create Account Pressed')
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: 'flex',
    backgroundColor: colors.lightBlack,
  },
  welcomeWrapper: {
    flex: 1,
    display: 'flex',
    marginTop: 30,
    padding: 20,
  },
  welcomeText: {
    fontSize: 30,
    color: colors.white,
    fontWeight: '300',
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    marginTop: 50,
    marginBottom: 40,
    marginLeft: 20,
  },
  facebookButtonIcon: {
    color: colors.lightBlack,
    position: 'relative',
    left: 20,
    zIndex: 8,
  }
})
