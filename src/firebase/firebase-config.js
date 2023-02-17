// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDR_CE918zYRiE521MZHlfHk1lIrsv_BSc",
	authDomain: "big-project-46f1b.firebaseapp.com",
	projectId: "big-project-46f1b",
	storageBucket: "big-project-46f1b.appspot.com",
	messagingSenderId: "943885215241",
	appId: "1:943885215241:web:c94b23ac0ada943a64fad8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Init services
export const db = getFirestore(app);
