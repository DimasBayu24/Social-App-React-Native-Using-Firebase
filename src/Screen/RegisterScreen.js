import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import * as firebase from 'firebase';

export default class RegisterScreen extends Component {
  static navigationOptions = {
    header: null,
  };

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
    LayoutAnimation.easeInEaseOut();

    return (
      <View style={style.container}>
        <View style={style.logoMainContainer}>
          <View style={style.logoContainer}>
            <Image
              style={style.logo}
              source={require('../Assets/img/AppLogo.png')}
            />
          </View>
        </View>
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
          onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={{color: '#414959', fontSize: 13}}>
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
    backgroundColor: '#2f2c2c',
  },
  greeting: {
    marginTop: 32,
    fontSize: 18,
    textAlign: 'center',
    color: '#2AE956',
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
  logoMainContainer: {
    marginTop: 50,
    width: '100%',
    alignItems: 'center',
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
