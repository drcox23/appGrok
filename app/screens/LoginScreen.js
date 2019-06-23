import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Icon } from 'react-native-elements'
// import Icon from 'react-native-vector-icons/FontAwesome'
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

//aws authentication
import { Auth } from 'aws-amplify'

export default class Login extends Component {
  // static navigationOptions = {
  //   title: "Login",
  // }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isAuthenticated: false,
    }
  }

  static navigationOptions = () => ({
    title: 'Login',
    headerStyle: {
      backgroundColor: 'transparent',
    },
    // header: null


  });


  _logginIn = () => {
    // alert('Next Button Pressed')
    const { email, password } = this.state
    Auth.signIn(email, password)
      .then(user => {
        Auth.currentSession()
          .then(data => {
            console.log("user data", data.getIdToken())
            this.setState({ isAuthenticated: true })
            this.props.navigation.navigate('Home', { authInfo: data.getIdToken().payload })
          })
          .catch(err => {
            console.log("login user error", err)
          })
      })
      .catch(err => {
        console.log("user sign in err", err);
        alert("Email address or Password do not match, please try again")
      })
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
              <Text style={styles.loginHeader}>Log In</Text>
              <View styles={styles.fieldContainer}>
                <TextInput style={styles.label}
                  label="Email"
                  placeholderTextColor="white"
                  onChangeText={(value) => this.setState({ email: value })} // this updates this.state.email to value in this Input                 
                  placeholder="Enter email"
                  borderColor="white"
                  autoCapitalize='none'
                />
              </View>
              <TextInput style={styles.label}
                label="password"
                placeholderTextColor="white"
                secureTextEntry
                // leftIcon={{ type: "font-awesome", name: "envelope" }}
                onChangeText={(value) => this.setState({ password: value })} // this updates this.state.email to value in this Input
                placeholder="Enter password"
                borderColor="white"
                autoCapitalize='none'
              />
            </ScrollView>
            <Button style={styles.nextButton}
              large
              rounded
              title="Login"
              onPress={() => this._logginIn()}
              backgroundColor="#f5f5f5"
              color="black"
            />
          </View>

        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    // display: 'flex',
    flex: 1,
    backgroundColor: '#273746',
    // justifyContent: 'center'
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
  fieldContainer: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15
  },
  icon: {
    padding: 10,
  },
  nextButton: {
    alignItems: 'flex-end',
    right: 20,
    bottom: 40,
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