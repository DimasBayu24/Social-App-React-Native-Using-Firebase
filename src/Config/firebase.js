import Firebase from 'firebase';

let config = {
  apiKey: 'AIzaSyB3wZtXZGh2LbNRONH4wKiJHtAgxaelWUU',
  authDomain: 'realtimechat-react-native.firebaseapp.com',
  databaseURL: 'https://realtimechat-react-native.firebaseio.com',
  projectId: 'realtimechat-react-native',
  storageBucket: 'realtimechat-react-native.appspot.com',
  messagingSenderId: '525012632072',
  appId: '1:525012632072:web:c960cb72e1402cbe01c7bd',
  measurementId: 'G-MLBV3Y18LN',
};

let app = Firebase.initializeApp(config);
export const db = app.database();
