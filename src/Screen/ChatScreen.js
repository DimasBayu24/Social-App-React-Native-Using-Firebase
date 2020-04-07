import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import * as firebase from 'firebase';

export default class ChatScreen extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      userUID: '',
      data2: {},
    };
    this.getAllUser();
  }

  getAllUser = async () => {
    const uid = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref('/users');

    await ref.on('value', async snapshot => {
      let data = [];
      let data2 = [];
      let data3 = [];
      let data4 = {};
      await Object.keys(snapshot.val()).map(async key => {
        const friendUID = snapshot.val()[key].uid;
        const noRead = [];
        let x = [];
        const ref2 = firebase.database().ref(`/chat/${friendUID}/${uid}/`);
        await ref2.on('value', async snapshot => {
          if (snapshot.val() != null) {
            await Object.keys(snapshot.val()).map(key => {
              if (snapshot.val()[key].isRead != undefined) {
                noRead.push(snapshot.val()[key].isRead);
                console.log('READDDD', snapshot.val()[key].isRead);
                x = snapshot.val()[key];
                x['total'] = noRead.length;
              }
            });
          }
          if (x.messages != undefined) {
            data2.push(x);
            data3.push(x.messages.user);
          }
        });
        await data.push({
          uid: key,
          data: snapshot.val()[key],
        });
      });
      console.log('data22', data2);
      console.log('data3', data3);
      for (let i = 0; i < data3.length; i++) {
        data4[`${data3[i]._id}`] = data2[i].total;
      }
      await this.setState({
        data: data,
        data2: data4,
      });
      console.log('data4', data4);
    });
  };

  getUser = async () => {
    const uid = firebase.auth().currentUser.uid;
    this.setState({
      userUID: uid,
    });
  };

  handleChat = async friendUID => {
    const uid = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref(`/chat/${friendUID}/${uid}/`);
    ref.on('value', async snapshot => {
      if (Object.keys(snapshot.val()) != null) {
        await Object.keys(snapshot.val()).map(async key => {
          const ref2 = firebase
            .database()
            .ref(`/chat/${friendUID}/${uid}/${key}/isRead`);
          ref2.remove();
        });
        delete this.state.data2[`${friendUID}`];
        this.forceUpdate();
        console.log('dadadat2', this.state.data2);
        this.getAllUser();
      }
    });
    this.props.navigation.push('ChatBox', {
      uid: friendUID,
    });
  };

  componentDidMount() {
    this.getUser();
  }

  render() {
    return (
      <View style={style.container}>
        <Text
          style={{
            fontFamily: 'sans-serif-medium',
            fontSize: 42.5,
            marginVertical: 5,
            marginLeft: 10,
          }}>
          Chats
        </Text>
        <TextInput
          style={{
            paddingLeft: 15,
            marginHorizontal: 5,
            marginBottom: 5,
          }}
          backgroundColor={'#fff'}
          borderRadius={10}
          height={40}
          fontSize={15}
          placeholder="Search"
        />

        <ScrollView
          style={{flex: 0.5, marginTop: 10, paddingTop: 2, borderTopWidth: 1}}>
          {this.state.data.map(data => {
            const {userUID} = this.state;
            return userUID == data.uid ? null : (
              <TouchableOpacity
                onPress={() => this.handleChat(data.uid)}
                activeOpacity={0.5}
                style={{
                  height: 75,
                  backgroundColor: '#2f2c2c',
                  borderBottomColor: '#878787',
                  borderBottomWidth: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}
                key={data.uid}>
                <Image
                  source={{uri: `${data.data.url}`}}
                  style={{
                    height: 60,
                    width: 60,
                    borderRadius: 40,
                    marginRight: 20,
                  }}
                />
                <View>
                  <Text style={{fontSize: 16, color: 'white'}}>
                    {data.data.displayName}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    {data.data.status == 'offline' ? (
                      <View
                        style={{
                          height: 8,
                          width: 8,
                          borderRadius: 8,
                          backgroundColor: 'gray',
                          opacity: 0.5,
                          alignSelf: 'center',
                          marginRight: '5%',
                          marginTop: '5%',
                        }}
                      />
                    ) : (
                      <View
                        style={{
                          height: 8,
                          width: 8,
                          borderRadius: 8,
                          backgroundColor: 'pink',
                          alignSelf: 'center',
                          marginRight: '5%',
                          marginTop: '5%',
                        }}
                      />
                    )}
                    <Text
                      style={{
                        fontSize: 12,
                        color: 'gray',
                        alignSelf: 'center',
                      }}>
                      {data.data.status}
                    </Text>
                  </View>
                </View>
                {this.state.data2[`${data.data.uid}`] != null ? (
                  <View
                    style={{
                      height: 20,
                      width: 20,
                      backgroundColor: 'pink',
                      borderRadius: 10,
                      position: 'absolute',
                      right: '3%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{color: 'white'}}>
                      {this.state.data2[`${data.data.uid}`]}
                    </Text>
                  </View>
                ) : null}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2f2c2c',
  },
});
