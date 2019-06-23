'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Button
} from 'react-native';

// small navigator and Avatar
import { ButtonGroup, Avatar } from 'react-native-elements'

// qrcode generator
import QRCode from 'react-native-qrcode'

import ScanScreen from './ScanScreen.js'

import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  // console.log("STATE", state)
  return {
    myCard: state.myCard,
    authInfo: state.authInfo
  }
}

class QRScreen extends React.Component {
  static navigationOptions = () => {
    return {
      headerStyle: {
        backgroundColor: '#273746',
      }
    }
  };

  constructor(props) {
    super(props)
    // console.log("ALL THE PROPS", props)
  }





  componentDidMount = () => {
    console.log("QRSCREEN", this.qrCodeData())
    // console.log("QRPROPS", this.props.myCard)

  }

  qrCodeData = () => {
    console.log("PROPS", this.props.myCard)
    const { data, style, user_id } = this.props.myCard
    const newObj = { data, style, user_id }
    // console.log("CAN I STRING IT LIKE THIS???", newObj)
    return JSON.stringify(newObj)
  }


  render() {

    return (
      <View style={styles.container}>

        <Text>{this.props.myCard.data.name}</Text>

        <QRCode large
          value={this.qrCodeData()}
          size={350}
        />
        <View>
          <Button
            style={styles.exButton}
            title="SCAN WITH CAMERA"
            onPress={() => this.props.navigation.navigate('Scan')}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    padding: 5,
  }
});

export default connect(mapStateToProps)(QRScreen)