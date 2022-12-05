import {initializeApp} from "firebase/app"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBcSJJUVP7Jb-SUfZ_BBoYCHjUToV5fov8",
    authDomain: "e-commerce-7aed7.firebaseapp.com",
    projectId: "e-commerce-7aed7",
    storageBucket: "e-commerce-7aed7.appspot.com",
    messagingSenderId: "955506594811",
    appId: "1:955506594811:web:ce97b844e3e581a5eab15e"
}

initializeApp(firebaseConfig)
export const storage = getStorage()

export const defaultAvatar =
    'https://firebasestorage.googleapis.com/v0/b/e-commerce-7aed7.appspot.com/o/static%2Fno-user-image.gif?alt=media&token=7cd23976-12f3-4a24-a6fb-9e0a22276ffa'

export const noImg =
    'https://firebasestorage.googleapis.com/v0/b/e-commerce-7aed7.appspot.com/o/static%2Fno-img.png?alt=media&token=494c1cb3-d196-44fe-be1a-66718764459b'
