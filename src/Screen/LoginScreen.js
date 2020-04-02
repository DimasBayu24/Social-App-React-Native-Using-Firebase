import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  LayoutAnimation,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as firebase from 'firebase';

export default class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    email: '',
    password: '',
    errorMessage: null,
  };

  handleLogin = () => {
    const {email, password} = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => this.setState({errorMessage: error.message}));
    this.props.navigation.navigate('HomeScreen');
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
        <Text style={style.greeting}>{'Hello Again.\nWelcome Back.'}</Text>
        <View style={style.errorMessage}>
          {this.state.errorMessage && (
            <Text style={style.error}>{this.state.errorMessage}</Text>
          )}
        </View>

        <View style={style.form}>
          <View>
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

        <TouchableOpacity style={style.button} onPress={this.handleLogin}>
          <Text style={{color: '#FFF', fontWeight: '500'}}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{alignSelf: 'center', marginTop: 32}}
          onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={{color: '#414959', fontSize: 13}}>
            New to App?{' '}
            <Text style={{fontWeight: '500', color: '#E9446A'}}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#221f1f',
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
    color: 'white',
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
