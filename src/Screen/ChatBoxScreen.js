// import React, {Component} from 'react';
// import {View, Text, StyleSheet, TextInput} from 'react-native';

// export default class ChaatBoxScreen extends Component {
//   render() {
//     return (
//       <View style={style.container}>
//         <Text
//           style={{
//             fontFamily: 'sans-serif-medium',
//             fontSize: 42.5,
//             marginVertical: 5,
//             marginLeft: 10,
//           }}>
//           Chats
//         </Text>
//         <TextInput
//           style={{paddingLeft: 15, marginHorizontal: 5}}
//           backgroundColor={'#fff'}
//           borderRadius={10}
//           height={40}
//           fontSize={15}
//           placeholder="Search"
//         />
//       </View>
//     );
//   }
// }

// const style = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#2f2c2c',
//   },
// });

import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  TextInput,
  PermissionsAndroid,
  ActivityIndicator,
  ToastAndroid,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {GiftedChat, Send, Bubble} from 'react-native-gifted-chat';
import firebase from 'firebase';
// import Logo from '../../../../assets/images/No_Image_Available.png';
// import {db} from '../Config/firebase';
import Geolocation from 'react-native-geolocation-service';
// import axios from 'axios';

class ChatBoxScreen extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      displayName: '',
      uid: '',
      url: '',

      friendUID: '',
      friendName: '',
      friendUrl: '',
      friendStatus: '',

      lastSeen: '',
    };
    this.getUser();
    this.getChat();
    this.getFriendUser();
  }

  getUser = async () => {
    const uid = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref(`/users/${uid}`);
    ref.on('value', snapshot => {
      this.setState({
        displayName: snapshot.val().displayName,
        uid: snapshot.val().uid,
        url: snapshot.val().url,
      });
    });
  };

  getFriendUser = async () => {
    const friendUID = await this.props.navigation.getParam('uid');
    const ref = firebase.database().ref(`/users/${friendUID}`);
    ref.on('value', snapshot => {
      console.log(snapshot.val().displayName);
      this.setState({
        friendName: `${snapshot.val().displayName}`,
        friendUrl: `${snapshot.val().url}`,
        friendStatus: `${snapshot.val().status}`,
      });
    });
  };

  getLastSeen = async () => {
    const friendUID = await this.props.navigation.getParam('uid');
    const ref = firebase.database().ref(`/users/${friendUID}`);
    ref.on('value', async snapshot => {
      const date1 = new Date();
      const date2 = new Date(snapshot.val().last_seen);
      var res = Math.abs(date1 - date2) / 1000;
      var minutes = Math.floor(res / 60) % 60;
      this.setState({
        lastSeen: `${minutes}`,
        friendStatus: `${snapshot.val().status}`,
      });
    });
  };

  getChat = async () => {
    const uid = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref(`/chat/${uid}/${this.state.friendUID}`);
    const ref2 = firebase
      .database()
      .ref(`/chat/${this.state.friendUID}/${uid}`);
    let data = [];
    ref.on('child_added', async snapshot => {
      data.push(snapshot.val().messages);
    });

    ref2.on('child_added', async snapshot => {
      data.push(snapshot.val().messages);
    });

    data = data.sort((a, b) => {
      if (a.createdAt < b.createdAt) {
        return 1;
      } else if (a.createdAt > b.createdAt) {
        return -1;
      }
      return 0;
    });
    this.setState(previousState => ({
      messages: data,
    }));
  };

  async onSend(messages) {
    const {friendUID} = this.state;
    const uid = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref(`/chat/${uid}/${friendUID}/`);
    // const ref2 = firebase.database().ref(`/isread/${uid}/${friendUID}/`)

    await ref.push({
      isRead: 'no',
      messages: {
        _id: Math.floor(Math.random() * 10000000000000) + 1,
        text: messages[0].text,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        user: {
          _id: uid,
          avatar: `${this.state.url}`,
          displayName: `${this.state.displayName}`,
        },
      },
    });
    await this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  interval = 0;
  lastSeenInterval = 0;

  async componentDidMount() {
    const friendUID = await this.props.navigation.getParam('uid');
    await this.setState({
      friendUID,
    });
    await this.getUser();
    this.getChat();
    this.getFriendUser();
    // this.getLastSeen();
    this.interval = setInterval(() => {
      this.getChat();
    }, 2000);
    // this.lastSeenInterval = setInterval(() => {
    //   this.getLastSeen();
    // }, 30000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.lastSeenInterval);
  }

  renderSend(props) {
    return (
      <Send {...props}>
        <View style={{marginRight: 15, paddingVertical: 5}}>
          <Icon name="send" size={30} color="pink" />
        </View>
      </Send>
    );
  }

  renderBubble = props => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: '#FAF8F0',
          },
          left: {
            color: '#FAF8F0',
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: '#878787',
          },
          right: {
            backgroundColor: '#2f2c2c',
          },
        }}
      />
    );
  };

  render() {
    return (
      <>
        <View
          style={{
            height: 60,
            backgroundColor: '#2AE986',
            elevation: 2,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 15,
          }}>
          <Icon
            name="chevron-left"
            size={20}
            color="#FAF8F0"
            onPress={() => this.props.navigation.navigate('ChatList')}
          />
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              this.props.navigation.push('FriendProfile', {
                uid: this.state.friendUID,
              })
            }>
            <Image
              source={{uri: `${this.state.friendUrl || 'none'}`}}
              style={{
                marginLeft: 15,
                height: 50,
                width: 50,
                borderRadius: 50,
                backgroundColor: '#FFFADD',
              }}
            />
          </TouchableOpacity>
          <View>
            <Text style={{marginLeft: 15, fontSize: 18, color: 'black'}}>
              {this.state.friendName}
            </Text>
            <Text style={{marginLeft: 15, fontSize: 12, color: 'black'}}>
              {this.state.friendStatus == 'offline'
                ? this.state.lastSeen > '30'
                  ? this.state.friendStatus
                  : `Last Seen ${this.state.lastSeen} minutes ago`
                : this.state.friendStatus}
            </Text>
          </View>
        </View>
        <GiftedChat
          messagesContainerStyle={{
            backgroundColor: 'black',
          }}
          renderBubble={this.renderBubble}
          renderSend={this.renderSend}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.state.uid,
            displayName: `${this.state.displayName}`,
            avatar: `${this.state.url}`,
          }}
        />
      </>
    );
  }
}

export default ChatBoxScreen;
