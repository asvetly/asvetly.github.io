import firebase from 'firebase';

const config = {
    apiKey: process.env.FB_apiKey,
    authDomain: process.env.FB_authDomain,
    databaseURL: process.env.FB_databaseURL,
    projectId: process.env.FB_projectId,
    storageBucket: process.env.FB_storageBucket,
    messagingSenderId: process.env.FB_messagingSenderId,
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
