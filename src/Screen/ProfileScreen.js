import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';

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
  };

  render() {
    return (
      <View style={style.container}>
        <View style={style.containerTop}>
          <View style={style.defaultPicture}>
            <Icon color={'#2f2c2c'} name="user" size={140} />
          </View>
          <Text style={{color: '#2f2c2c', marginTop: 32, fontSize: 15}}>
            {this.state.displayName} | {this.state.email}
          </Text>
        </View>
        <TouchableOpacity style={{marginTop: 20}} onPress={this.signOutUser}>
          <Text style={{color: 'white', fontSize: 15}}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2f2c2c',
  },
  containerTop: {
    width: '100%',
    height: '40%',
    backgroundColor: '#2AE986',
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultPicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#878787',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
