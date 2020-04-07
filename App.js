import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from './src/Screen/LoginScreen';
import RegisterScreen from './src/Screen/RegisterScreen';
import LoadingScreen from './src/Screen/LoadingScreen';
import * as firebase from 'firebase';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import GeoLocationScreen from './src/Screen/GeoLocationScreen';
import ChatScreen from './src/Screen/ChatScreen';
import ChatBoxScreen from './src/Screen/ChatBoxScreen';
import ProfileScreen from './src/Screen/ProfileScreen';
import FriendProfileScreen from './src/Screen/FriendProfileScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const ChatStack = createStackNavigator(
  {
    ChatList: {screen: ChatScreen},
    ChatBox: {screen: ChatBoxScreen},
    FriendProfile: {screen: FriendProfileScreen},
  },
  {
    initialRouteName: 'ChatList',
    headerMode: 'none',
  },
);
const AppTabNavigator = createBottomTabNavigator(
  {
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon color={'#fff'} name="user" size={25} />
        ),
        header: null,
      },
    },

    Chat: {
      screen: ChatStack,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon color={'#fff'} name="comment-o" size={25} />
        ),
        header: null,
      },
    },
    GeoLocation: {
      screen: GeoLocationScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon color={'#fff'} name="wpexplorer" size={25} />
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
