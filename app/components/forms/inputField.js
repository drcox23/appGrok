import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Icon from 'react-native';
import colors from '../../styles/colors/index.js';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default class InputField extends Component {
  render() {
    const { labelText, labelTextSize, labelColor, textColor, borderBottomColor, inputType, customStyle } = this.props;
    const fontSize = labelTextSize || 14;
    const color = labelColor || colors.white;
    const inputColor = textColor || colors.white;
    const borderBottom = borderBottomColor || 'transparant';
    return (
      <View> style={[customStyle, styles.wrapper]}
        <Text styel={[{ color, fontSize }, styles.label]}>{labelText}</Text>
        <TextInput
          autoCorrect={false}
          style={[{ color: inputColor, borderBottomColor: borderBottom }, styles.InputField]}
          secureTextEntry={inputType === "password"}
        />
      </View>
    );
  }
}

InputField.PropTypes = {
  labelText: PropTypes.string.isRequired,
  labelTextSize: PropTypes.number,
  labelColor: PropTypes.string,
  textColor: PropTypes.string,
  borderBottomColor: PropTypes.string,
  inputType: PropTypes.string.isRequired,
  customStyle: PropTypes.object,
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
  },
  label: {
    fontWeight: '700',
    marginBottom: 20,
  },
  inputField: {
    borderBottomWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
  }
})