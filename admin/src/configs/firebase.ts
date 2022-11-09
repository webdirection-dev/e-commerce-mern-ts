import {initializeApp} from "firebase/app"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyC2UKBbNIZoCrGk4rAVjq3CRyepCP1NE-4",
    authDomain: "netflix-a1cac.firebaseapp.com",
    projectId: "netflix-a1cac",
    storageBucket: "netflix-a1cac.appspot.com",
    messagingSenderId: "688945813951",
    appId: "1:688945813951:web:3decf8acd133f8a453e90a",
    measurementId: "G-RVJB2316C3"
}

initializeApp(firebaseConfig)
export const storage = getStorage()

export const defaultAvatar = 'https://firebasestorage.googleapis.com/v0/b/netflix-a1cac.appspot.com/o/static-img%2Fdefault-img.png?alt=media&token=4225ef0f-46ac-4246-9131-a260a09c7b0d'