import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import * as firebase from 'firebase';

export default class HomeScreen extends Component {
  state = {
    email: '',
    displayName: '',
  };

  componentDidMount() {
    const {email, displayName} = firebase.auth().currentUser;
    this.setState({email, displayName});
  }

  signOutUser = () => {
    firebase.auth().signOut();

    // this.props.navigation.navigate('LoginScreen');
  };

  render() {
    return (
      <View style={style.container}>
        <Text>Hi, {this.state.email}!</Text>
        <TouchableOpacity style={{marginTop: 32}} onPress={this.signOutUser}>
          <Text>Logout</Text>
        </TouchableOpacity>
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
