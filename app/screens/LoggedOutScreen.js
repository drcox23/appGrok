import React, { Component } from 'react';
import colors from '../styles/colors/index.js';
import {
  Animated,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RoundedButton from '../components/buttons/RoundedButton.js'

import { Auth } from 'aws-amplify';


//~~~~~~~~~~ ANIMATION STUFF ~~~~~~~~~~//
class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
  }

  componentDidMount() {
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 4000,              // Make it take a while
      }
    ).start();                        // Starts the animation
  }

  render() {
    let { fadeAnim } = this.state;

    return (
      <Animated.View                 // Special animatable View
        style={{
          ...this.props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}



export default class LoggedOut extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    header: null
  }


  componentDidMount() {
    // console.log("PROPS", this.props.navigation)
  }


  render() {

    // const { navigate } = this.props.navigation;
    const remote = "https://images.pexels.com/photos/533424/pexels-photo-533424.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

    return (
      <ImageBackground
        style={styles.container}
        resizeMode='cover'
        source={{ uri: remote }}
      >
        <View style={styles.wrapper}>
          <View style={styles.welcomeWrapper}>
            <FadeInView>
              <Image
                source={require('../img/dino.png')}
                style={styles.logo}
              />
              <Text style={styles.welcomeText}>Welcome to Grok</Text>
            </FadeInView>
            <View style={styles.buttonWrapper}>
              <RoundedButton
                text="Get Started"
                textColor={colors.lightBlack}
                background={colors.white}
                // icon={<Icon name="facebook" size={20} style={styles.facebookButtonIcon} />}
                handleOnPress={this.onGetStarted}
              />
              <RoundedButton
                text="Create Account"
                textColor={colors.lightBlack}
                background={colors.white}
                handleOnPress={this._onCreateAccount}
              />
            </View>
          </View>
        </View>
      </ImageBackground>


    )
  }


  onGetStarted = () => {
    // console.log('hitting')
    this.props.navigation.navigate('Login')

  }

  _onCreateAccount = () => {
    // alert('Create Account Pressed')
    // console.log('can i register???')
    this.props.navigation.navigate('Register')
  }

  _onPressLearnMore() {
    alert('LOL')
    Auth.signOut()
      .then(data => {
        console.log("signout data", data)
      })
      .catch(err => {
        console.log("signout err", err)
      })
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  wrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  welcomeWrapper: {
    // flex: 1,
    marginTop: 120,
    paddingLeft: 25,
    paddingRight: 25,
    // justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 37,
    color: colors.white,
    fontWeight: '300',
    marginBottom: 40,
    fontWeight: 'bold'
  },
  logo: {
    width: 120,
    height: 120,
    marginTop: 55,
    marginLeft: 20,
    right: 30,
  },
  facebookButtonIcon: {
    color: colors.lightBlack,
    position: 'relative',
    left: 20,
    zIndex: 8,
  },

})

