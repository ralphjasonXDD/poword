import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAoWHaKROITFIs7CkdeMmruIXZMjyHFKIg',
  authDomain: 'poword-c0847.firebaseapp.com',
  databaseURL: 'https://poword-c0847.firebaseio.com',
  projectId: 'poword-c0847',
  storageBucket: 'poword-c0847.appspot.com',
  messagingSenderId: '681183322086',
};

const fire = firebase.initializeApp(config);

export const fbProvider = new firebase.auth.FacebookAuthProvider();

export const auth = fire.auth();

export const fbKey = 'FB_INFO_LOCAL_STORAGE';

export const isAuthenticated = () => {
  return !!auth.currentUser || !!localStorage.getItem(fbKey);
}

export default fire;
