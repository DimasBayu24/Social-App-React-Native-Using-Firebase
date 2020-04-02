import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class GeoLocationScreen extends Component {
  render() {
    return (
      <View style={style.container}>
        <Text>GeoLocationScreen</Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
