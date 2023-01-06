import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD15FHif6MjgjbeET2XzXWifbDuTAm8WjU",
    authDomain: "spwr-9e05c.firebaseapp.com",
    projectId: "spwr-9e05c",
    storageBucket: "spwr-9e05c.appspot.com",
    messagingSenderId: "524823826204",
    appId: "1:524823826204:web:781a7f7de76ff5016034d9",
    measurementId: "G-WYKJMBSMT5",
}

const
    app = initializeApp(firebaseConfig),
    analytics =  getAnalytics(app),
    auth = getAuth(app),
    db = getFirestore(app);

export {
    app,
    analytics,
    auth,
    db,
};

