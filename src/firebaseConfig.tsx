import firebase from 'firebase';

import { toast } from './toast';

const config = {
    apiKey: "AIzaSyCdcbgH-klIqNElRT5dbdZFqGcXjDBM678",
    authDomain: "meet-day-auth.firebaseapp.com",
    projectId: "meet-day-auth",
    storageBucket: "meet-day-auth.appspot.com",
    messagingSenderId: "558616608692",
    appId: "1:558616608692:web:c8fd60dc463a9b3108bce1"
}
firebase.initializeApp(config);

interface User {
    day: any;
    time: string;
}

// Get User and collection doc

export function getCurrentUser() {
    return new Promise((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                console.log("user is login");

                await firebase.firestore().collection('users').doc(user.uid).get().then(doc => {
                    let userData: any = doc
                    resolve({ user, userData })
                })

            } else {
                resolve(null)
            }
            unsubscribe()
        })

    })

}

// set and collection doc current user

export function addData(day: any, time: string) {

    var someId = firebase.auth().currentUser?.uid;

    firebase.firestore().collection('users').doc(someId).set({
        day: day,
        time: time,
    }).then((docRef: any) => {
        toast('You added time');

    }).catch((error) => {
        toast(error + ' Not added time');
    });

}

//logout auth

export function logoutUser() {
    return firebase.auth().signOut();
}

//Login auth

export async function loginUser(username: string, password: string) {
    const email = `${username}@test.com`

    try {
        const res = await firebase.auth().signInWithEmailAndPassword(email, password);
        return res;

    } catch (error) {
        toast(error.message, 4000)
        return false;
    }


}

//Login register user and add some data

export async function registerUser(username: string, password: string) {
    const email = `${username}@test.com`

    try {
        const res = await firebase.auth().createUserWithEmailAndPassword(email, password);
        if (res.user) {
            const userData: User = {
                day: [],
                time: ""
            }
            await firebase.firestore().collection('/users').doc(res.user?.uid).set(userData);

        }
        console.log(res)
        return true;
    } catch (error) {
        toast(error.message, 4000)
        return false;
    }


}