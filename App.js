import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/Screen/LoginScreen';
import RegisterScreen from './src/Screen/RegisterScreen';
import LoadingScreen from './src/Screen/LoadingScreen';
import * as firebase from 'firebase';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import GeoLocationScreen from './src/Screen/GeoLocationScreen';
import ChatScreen from './src/Screen/ChatScreen';
import ProfileScreen from './src/Screen/ProfileScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

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

const AppTabNavigator = createBottomTabNavigator(
  {
    GeoLocation: {
      screen: GeoLocationScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon color={'#fff'} name="wpexplorer" size={25} />
        ),
        header: null,
      },
    },
    Chat: {
      screen: ChatScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon color={'#fff'} name="comment-o" size={25} />
        ),
        header: null,
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon color={'#fff'} name="user" size={25} />
        ),
        header: null,
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#2f2c2c',
      inactiveTintColor: '#878787',
      showLabel: false,
      inactiveBackgroundColor: '#2f2c2c',
      activeBackgroundColor: '#878787',
    },
  },
);

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppTabNavigator,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'Loading',
    },
  ),
);
