import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import { Button } from 'react-native-elements';
import colors from '../styles/colors/index.js';
import InputField from '../components/forms/inputField.js';
import NextArrowButton from '../components/buttons/NextArrowButton.js'

// aws auth
import { Auth } from 'aws-amplify'


export default class ConfirmRegistration extends Component {
  static navigationOptions = {
    title: "Confirm",
  }

  constructor() {
    super();
    this.state = {
      email: '',
      confirmCode: '',
      isAuthenticated: ''
    }
  }

  componentDidMount() {

    const { navigation } = this.props
    const confirmEmail = navigation.getParam('email')
    console.log("EMAIL", confirmEmail)
    this.setState({ email: confirmEmail })

  }

  handleConfirm = () => {

    // Auth.currentCredentials()
    console.log("STATE", this.state)

    const { email, confirmCode } = this.state

    Auth.confirmSignUp(email, confirmCode)
      .then(user => {
        console.log("confirm data", user)
        this.props.navigation.navigate('Login')
      })
      .catch(err => {
        console.log("confirm error", err)
        alert(`Error while confirming, please try again. Error: ${err.message}`)
      })

  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.wrapper} behavior="padding">
        <View style={styles.scrollViewWrapper}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.loginHeader}>Confirm Registration</Text>
            <TextInput style={styles.label}
              label="confirmationCode"
              // leftIcon={{ type: "font-awesome", name: "envelope" }}
              onChangeText={
                // this updates this.state.email to value in this Input
                (value) => this.setState({ confirmCode: value })
              }
              placeholder="Confirmation Code"
              placeholderTextColor="white"
            />


          </ScrollView>
        </View>
        <View style={styles.nextButton}>
          <Button
          large
          rounded
          title="Submit"
          onPress={this.handleConfirm}
          />
        </View>
      </KeyboardAvoidingView>
    )
  }
}


const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flex: 1,
    backgroundColor: colors.lightBlack,

  },
  scrollViewWrapper: {
    marginTop: 70,
    flex: 1,
  },
  scrollView: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    flex: 1,
  },
  loginHeader: {
    fontSize: 30,
    color: colors.white,
    fontWeight: '300',
    marginBottom: 40,
  },
  nextButton: {
    alignItems: 'flex-end',
    right: 20,
    bottom: 20,
  },
  label: {
    // fontWeight: '300',
    fontSize: 20,
    color: "white",
    marginBottom: 20,
    borderBottomWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
  }
})