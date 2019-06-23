import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  ImageBackground
} from 'react-native';
import { Button } from 'react-native-elements'
import colors from '../styles/colors/index.js';
import InputField from '../components/forms/inputField.js';
import NextArrowButton from '../components/buttons/NextArrowButton.js'

// aws auth
import Amplify, { Auth } from 'aws-amplify'


export default class Registration extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      isAuthenticated: ''
    }
  }

  static navigationOptions = () => ({
    title: 'Register',
    headerStyle: {
      // backgroundColor: 'transparent',
      // color: 
    },
    // header: null


  });

  handleRegister = () => {
    const { email, password, confirmPassword } = this.state

    if (password === confirmPassword) {
      Auth.signUp({
        username: email,
        password,
        attributes: {
          email: email
        }
      })
        .then(user => {
          // console.log("register data", user)
          this.props.navigation.navigate('Confirm', { email: this.state.email })
        })
        .catch(err => {
          console.log("register error", err)
          alert(`Error while registering, please try again. Error: ${err.message}`)
        })
    } else {
      alert('Password do not match')
    }
  }

  render() {
    const remote = "https://images.pexels.com/photos/1705093/pexels-photo-1705093.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"

    return (
      <KeyboardAvoidingView style={styles.wrapper} behavior="padding">

        <ImageBackground
          style={styles.container}
          resizeMode='cover'
          source={{ uri: remote }}
        >
          <View style={styles.scrollViewWrapper}>
            <ScrollView style={styles.scrollView}>
              <Text style={styles.loginHeader}>Register</Text>
              <View styles={styles.fieldContainer}>
                <TextInput style={styles.label}
                  label="email"
                  // leftIcon={{ type: "font-awesome", name: "envelope" }}
                  onChangeText={
                    // this updates this.state.email to value in this Input
                    (value) => this.setState({ email: value })
                  }
                  placeholder="Enter email"
                  placeholderTextColor="white"
                  borderColor="white"
                  autoCapitalize='none'
                />
                <TextInput style={styles.label}
                  label="password"
                  // leftIcon={{ type: "font-awesome", name: "envelope" }}
                  onChangeText={
                    // this updates this.state.email to value in this Input
                    (value) => this.setState({ password: value })
                  }
                  placeholder="Enter password"
                  placeholderTextColor="white"
                  secureTextEntry
                  borderColor="white"
                  autoCapitalize='none'
                />
                <TextInput style={styles.label}
                  label="confirm-password"
                  // leftIcon={{ type: "font-awesome", name: "envelope" }}
                  onChangeText={
                    // this updates this.state.email to value in this Input
                    (value) => this.setState({ confirmPassword: value })
                  }
                  placeholder="Confirm password"
                  placeholderTextColor="white"
                  secureTextEntry
                  borderColor="white"
                  autoCapitalize='none'
                />
              </View>
            </ScrollView>
          </View>
          <View style={styles.nextButton}>
            <Button
              title="Sign Up!"
              onPress={this.handleRegister}
              rounded
              large
              backgroundColor="#f5f5f5"
              color="black"
            />
          </View>

        </ImageBackground>

      </KeyboardAvoidingView>
    )
  }
}


const styles = StyleSheet.create({
  wrapper: {
    // display: 'flex',
    flex: 1,
    // backgroundColor: colors.lightBlack,
  },
  container: {
    height: '100%',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  scrollViewWrapper: {
    marginTop: 70,
    flex: 1,
  },
  scrollView: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    // flex: 1,
  },
  loginHeader: {
    fontSize: 35,
    color: colors.white,
    fontWeight: '300',
    marginBottom: 40,
    fontWeight: 'bold',
  },
  nextButton: {
    alignItems: 'flex-end',
    right: 20,
    bottom: 20,
  },
  fieldContainer: {
    padding: 15
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