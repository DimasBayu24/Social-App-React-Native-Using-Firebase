import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  Modal,
  ToastAndroid,
  Image,
} from 'react-native';
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TextInput, ScrollView} from 'react-native-gesture-handler';
import {db} from '../Config/firebase';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      displayName: '',
      email: '',
      dob: '',
      number: '',
      gender: '',
      status: '',
      url: '',
      latitude: '',
      longitude: '',
      address: '',
      modalVisible: false,

      isLoadingLocation: false,
    };
    this.getUser();
    this.updateLocation();
  }
  componentDidMount() {
    const {email, displayName} = firebase.auth().currentUser;
    this.getUser();
    this.setState({email, displayName});
    this.updateLocation();
  }

  getUser = async () => {
    const uid = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref(`/users/${uid}`);
    ref
      .on('value', snapshot => {
        this.setState({
          displayName: snapshot.val() != null ? snapshot.val().displayName : '',
          dob: snapshot.val() != null ? snapshot.val().dob : '',
          number: snapshot.val() != null ? snapshot.val().number : '',
          gender: snapshot.val() != null ? snapshot.val().gender : '',
          status: 'online',
          url: snapshot.val() != null ? snapshot.val().url : '',
          latitude: snapshot.val() != null ? snapshot.val().latitude : '',
          longitude: snapshot.val() != null ? snapshot.val().longitude : '',
        });
      })
      .then(res => {
        res
          ? console.log('statedaataa', this.state.spesificData)
          : ToastAndroid.showWithGravity(
              `Insert Your Data`,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
      })
      .catch(err => {
        console.log(err);
      });
  };

  updateLocation = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'GeoLocation Permission',
        message: 'Dimas wants to know your location ',
      },
    );
    if (granted) {
      await Geolocation.getCurrentPosition(
        async position => {
          console.log('My current location', JSON.stringify(position));
          await this.setState({
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          });

          await axios
            .get(
              `http://us1.locationiq.com/v1/reverse.php?key=68e73a2b14084c&lat=${
                this.state.latitude
              }&lon=${this.state.longitude}&format=json`,
            )
            .then(res =>
              this.setState({
                address: `${res.data.display_name}`,
              }),
            );
        },
        error => {
          console.log(error.code, error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        },
      );
      this.watchID = Geolocation.watchPosition(position => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.00922 * 1.5,
          longitudeDelta: 0.00421 * 1.5,
        };
      });
    }
  };
  handleUpdateLocation = async () => {
    this.updateLocation();
    const uid = firebase.auth().currentUser.uid;
    const {
      displayName,
      dob,
      gender,
      number,
      latitude,
      longitude,
      url,
      status,
    } = this.state;
    const email = firebase.auth().currentUser.email;
    const ref = firebase.database().ref(`/users/${uid}`);
    setTimeout(async () => {
      await ref.set({
        email,
        uid,
        displayName,
        dob,
        gender,
        number,
        latitude,
        longitude,
        status,
        url,
        date: new Date().getTime(),
      });
      this.setState({
        isLoadingLocation: false,
      });
      ToastAndroid.showWithGravity(
        `Location Updated`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }, 3000);
    this.setState({
      isLoadingLocation: true,
    });
  };

  handleClose = () => {
    this.setState({
      modalVisible: false,
    });
  };

  handleUpdateProfile = async () => {
    const uid = firebase.auth().currentUser.uid;
    const {
      displayName,
      gender,
      dob,
      number,
      url,
      latitude,
      longitude,
      status,
    } = this.state;
    const email = firebase.auth().currentUser.email;
    const ref = db.ref(`users/${uid}`);
    setTimeout(async () => {
      await ref.set({
        email,
        uid,
        displayName,
        gender,
        dob,
        number,
        url,
        latitude,
        longitude,
        status,
      });
      ToastAndroid.showWithGravity(
        'Data Updated',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }, 1000);
    this.setState({
      modalVisible: false,
    });
  };

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  signOutUser = async () => {
    const uid = firebase.auth().currentUser.uid;
    const {
      email,
      displayName,
      gender,
      dob,
      number,
      url,
      latitude,
      longitude,
    } = this.state;
    const ref = db.ref(`users/${uid}`);

    setTimeout(async () => {
      await ref.set({
        email,
        uid,
        displayName,
        gender,
        dob,
        number,
        url,
        status: 'offline',
        latitude,
        longitude,
      });
      ToastAndroid.showWithGravity(
        'Successfully logout',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }, 2000);

    firebase.auth().signOut();
  };

  render() {
    return (
      <View style={style.container}>
        <View style={style.containerTop}>
          <View style={style.defaultPicture}>
            <Image
              style={{width: '100%', height: '100%', borderRadius: 75}}
              source={{
                uri: this.state.url,
              }}
            />
          </View>
          <Text style={{color: 'white', marginTop: 32, fontSize: 15}}>
            {this.state.displayName} | {this.state.email}
          </Text>
          <View style={{flexDirection: 'row', marginHorizontal: 10}}>
            <TouchableOpacity onPress={() => this.handleUpdateLocation()}>
              <Icon
                name="map-marker"
                style={{alignSelf: 'center', marginHorizontal: 10}}
                size={23}
                color="green"
              />
            </TouchableOpacity>
            <Text style={{color: 'white', marginRight: 15}}>
              {this.state.address}
            </Text>
          </View>
        </View>
        <View>
          <View style={style.containerProfile}>
            {this.state.number === null ? null : (
              <View>
                <Text style={style.profileList}>Tel. Number</Text>
                <Text style={style.profileSet}>{this.state.number}</Text>
              </View>
            )}
            {this.state.dob === null ? null : (
              <View>
                <Text style={style.profileList}>Date of birthday</Text>
                <Text style={style.profileSet}>{this.state.dob}</Text>
              </View>
            )}
            {this.state.gender === null ? null : (
              <View>
                <Text style={style.profileList}>Gender</Text>
                <Text style={style.profileSet}>{this.state.gender}</Text>
              </View>
            )}

            <TouchableOpacity
              style={{marginTop: 20}}
              onPress={() => {
                this.setModalVisible(true);
              }}
              style={style.editProfile}>
              <Icon color={'white'} name="plus-circle" size={25} />
              <Text style={{marginLeft: 5, color: 'white'}}>Edit Profile</Text>
            </TouchableOpacity>
            <Modal
              visible={this.state.modalVisible}
              transparent={true}
              animationType="slide">
              <ScrollView>
                <View style={style.modal}>
                  <Text style={style.textModal}>Name</Text>
                  <TextInput
                    onChangeText={val => this.setState({displayName: val})}
                    style={style.inputModal}
                    placeholder="Update your display name here"
                  />
                  <Text style={style.textModal}>Birthday</Text>
                  <TextInput
                    onChangeText={val => this.setState({dob: val})}
                    style={style.inputModal}
                    placeholder="Update your birthday here"
                  />
                  <Text style={style.textModal}>Tel. Number</Text>
                  <TextInput
                    onChangeText={val => this.setState({number: val})}
                    style={style.inputModal}
                    placeholder="Update your number here"
                  />
                  <Text style={style.textModal}>Gender</Text>
                  <TextInput
                    onChangeText={val => this.setState({gender: val})}
                    style={style.inputModal}
                    placeholder="Update your gender here"
                  />
                  <Text style={style.textModal}>Profile Picture</Text>
                  <TextInput
                    onChangeText={val => this.setState({url: val})}
                    style={style.inputModal}
                    placeholder="Choose your profile picture here"
                  />
                  <View style={style.containerButtonModal}>
                    <TouchableOpacity onPress={this.handleUpdateProfile}>
                      <Text style={style.buttonModal}>save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.handleClose}>
                      <Text style={style.buttonModal}>close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </Modal>
          </View>
          <TouchableOpacity style={style.logout} onPress={this.signOutUser}>
            <Text style={{color: 'white', fontSize: 15, marginLeft: 10}}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
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
    height: '50%',
    backgroundColor: '#2f2c2c',
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
  containerProfile: {
    backgroundColor: '#878787',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  modal: {
    backgroundColor: '#2f2c2c',
    marginTop: '75%',
  },
  buttonModal: {
    backgroundColor: '#2AE986',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,

    fontSize: 15,
    alignSelf: 'center',
    borderWidth: 0.5,
  },
  containerButtonModal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  profileList: {
    marginLeft: 5,
    marginVertical: 5,
    opacity: 0.5,
  },
  profileSet: {
    marginLeft: 5,
    borderBottomWidth: 0.5,
  },
  inputModal: {
    marginHorizontal: 15,
    width: '60%',
    backgroundColor: 'white',
    height: 35,
    borderRadius: 5,
    alignSelf: 'center',
  },
  textModal: {
    color: 'white',
    opacity: 0.5,
    marginLeft: 78,
  },
  logout: {
    marginTop: 15,
    paddingVertical: 5,
    alignItems: 'center',
    borderBottomWidth: 0.5,
  },
  editProfile: {
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
    marginVertical: 5,
  },
});
