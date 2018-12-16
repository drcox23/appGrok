'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Button
} from 'react-native';

// qrcode generator
import QRCode from 'react-native-qrcode'

import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  // console.log("STATE", state)
  return {
    myCardData: state.myCardData,
    myCardCSS: state.myCardCSS,
    authInfo: state.authInfo
  }
}


class QRScreen extends React.Component {

  


  componentDidMount = () => {
    // console.log("QRSCREEN", this.props.myCardData)
    console.log("QRCODE" )
    
  }

  render(){
    const qrData = [this.props.myCardData]
    console.log(qrData)
    return(
      <View style={styles.container}>
        {/* <Text>QRScreen!!!</Text> */}
        <QRCode 
         value={this.qrData}
         size={200}
         bgColor='purple'
         fgColor='white'
        />
       <View>
        <Button
        style={styles.exButton}
        title="SCAN WITH CAMERA"
        onPress={ () => this.props.navigation.navigate('Scan')}
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