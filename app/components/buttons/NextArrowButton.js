import React, { Component } from 'react';
// import { PropTypes } from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  TouchableHighlight,
  StyleSheet,
  Text
} from 'react-native';
import colors from '../../styles/colors/index.js'

export default class NextArrowButton extends Component {
  render() {
    const { disabled } = this.props;
    const opacityStyle = disabled ? { backgroundColor: 'rgba(255,255,255,0.2)' } : { backgroundColor: 'rgba(255,255,255,0.6)' }
    return (
      <TouchableHighlight
        style={[opacityStyle, styles.button]}
      >
        <Icon
          name="angle-right"
          color={colors.green01}
          size={32}
          style={styles.icon}
        />
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: 60,
    height: 60,
  },
  icon: {
    // marginRight: -2,
    // marignTop: -2,
  }
})