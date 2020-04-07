import React, {Component} from 'react';
import {View, Image, StyleSheet, ActivityIndicator} from 'react-native';
import * as firebase from 'firebase';

export default class LoadingScreen extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'App' : 'Auth');
    });
  }

  render() {
    return (
      <View style={style.container}>
        <View style={style.logoContainer}>
          <Image
            style={style.logo}
            source={require('../Assets/img/AppLogo.png')}
          />
        </View>
        <ActivityIndicator size="large" />
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
  logoContainer: {
    width: 170,
    height: 120,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
});
