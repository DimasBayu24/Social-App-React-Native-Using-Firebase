import React, {Component} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/Screen/LoginScreen';
import HomeScreen from './src/Screen/HomeScreen';
// import LocationScreen from './src/Screen/LocatioScreen';
// import ProfileScreen from './src/Screen/ProfileScreen';
import RegisterScreen from './src/Screen/RegisterScreen';
// import ChatScreen from './src/Screen/ChatScreen';
import LoadingScreen from './src/Screen/LoadingScreen';
import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyB3wZtXZGh2LbNRONH4wKiJHtAgxaelWUU',
  authDomain: 'realtimechat-react-native.firebaseapp.com',
  databaseURL: 'https://realtimechat-react-native.firebaseio.com',
  projectId: 'realtimechat-react-native',
  storageBucket: 'realtimechat-react-native.appspot.com',
  messagingSenderId: '525012632072',
  appId: '1:525012632072:web:c960cb72e1402cbe01c7bd',
  measurementId: 'G-MLBV3Y18LN',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();

export default class Navigator extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LoadingScreen"
            component={LoadingScreen}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
