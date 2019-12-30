import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyC18gHpc7iOnKGT5RMcImUXn_0z1nREhlM',
  authDomain: 'auth-1f84c.firebaseapp.com',
  databaseURL: 'https://auth-1f84c.firebaseio.com',
  projectId: 'auth-1f84c',
  storageBucket: 'auth-1f84c.appspot.com',
  messagingSenderId: '651261160330',
  //   appId: '1:651261160330:web:1fe6a6e4d3510a0e447673',
  //   measurementId: 'G-P6HG7JKSP8',
};

const Firebase = firebase.initializeApp(config);

const Auth = firebase.auth();

export {Firebase, Auth};
