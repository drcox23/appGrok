import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { Constants, BarCodeScanner, Permissions } from 'expo';

export default class App extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: '#273746',
      }
    }
  }
  state = {
    hasCameraPermission: null
  };

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = data => {
    console.log("QR DATA", JSON.parse(data.data))
    const cardData = JSON.parse(data.data)
    Alert.alert('Scan successful!');
    this.props.navigation.navigate('Save', {cardData: cardData} )
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.hasCameraPermission === null ?
          <Text>Requesting for camera permission</Text> :
          this.state.hasCameraPermission === false ?
            <Text>Camera permission is not granted</Text> :
            <BarCodeScanner
              onBarCodeRead={this._handleBarCodeRead}
              style={StyleSheet.absoluteFill}>

              <Text style={styles.description}>Scan your QR code</Text>
       
              <Text
                onPress={() => this.props.navigation.pop()}
                style={styles.cancel}>
                Cancel
              </Text>

            </BarCodeScanner>
            
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    // backgroundColor: '#ecf0f1',
  },
  camera: {
    flex: 1,
    justifyContent: 'space-between'
  },
  description: {
    fontSize: 30,
    marginTop: '5%',
    textAlign: 'center',
    color: 'white',
  },
  cancel: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    // alignItems: 'flex-end',
    top: '85%',

  }
});
