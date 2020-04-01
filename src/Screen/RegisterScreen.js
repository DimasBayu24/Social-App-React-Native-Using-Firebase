import React, {Component} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as firebase from 'firebase';

export default class RegisterScreen extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    errorMessage: null,
  };

  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(userCredentials => {
        return userCredentials.user.updateProfile({
          displayName: this.state.name,
        });
      })
      .catch(error =>
        this.setState({
          errorMessage: error.message,
        }),
      );
    this.props.navigation.navigate('LoginScreen');
  };

  render() {
    return (
      <View style={style.container}>
        <Text style={style.greeting}>{'Hello!\nSign up to get started.'}</Text>
        <View style={style.errorMessage}>
          {this.state.errorMessage && (
            <Text style={style.error}>{this.state.errorMessage}</Text>
          )}
        </View>

        <View style={style.form}>
          <View>
            <Text style={style.inputTitle}>Full name</Text>
            <TextInput
              style={style.input}
              autoCapitalize="none"
              onChangeText={name => this.setState({name})}
              value={this.state.name}></TextInput>
          </View>
          <View style={{marginTop: 32}}>
            <Text style={style.inputTitle}>Email Adrress</Text>
            <TextInput
              style={style.input}
              autoCapitalize="none"
              onChangeText={email => this.setState({email})}
              value={this.state.email}></TextInput>
          </View>

          <View style={{marginTop: 32}}>
            <View>
              <Text style={style.inputTitle}>Password</Text>
              <TextInput
                style={style.input}
                secureTextEntry
                autoCapitalize="none"
                onChangeText={password => this.setState({password})}
                value={this.state.password}></TextInput>
            </View>
          </View>
        </View>

        <TouchableOpacity style={style.button} onPress={this.handleSignUp}>
          <Text style={{color: '#FFF', fontWeight: '500'}}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{alignSelf: 'center', marginTop: 32}}
          onPress={() => this.props.navigation.navigate('LoginScreen')}>
          <Text style={{color: '#41/4959', fontSize: 13}}>
            Already have an account?
            <Text style={{fontWeight: '500', color: '#E9446A'}}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  greeting: {
    marginTop: 32,
    fontSize: 18,
    textAlign: 'center',
  },
  errorMessage: {
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  error: {
    color: '#E9446A',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: '#8A8F9E',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  input: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: '#161F3D',
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: '#E9446A',
    borderRadius: 4,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
