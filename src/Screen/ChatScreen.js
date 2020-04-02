import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class GeoLocationScreen extends Component {
  render() {
    return (
      <View style={style.container}>
        <Text>ChatScreen</Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2f2c2c',
  },
});
