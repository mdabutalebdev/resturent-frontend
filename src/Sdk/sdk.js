import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCKaztymk4nuZzxzawApLmiBrnfbW318S0",
    authDomain: "resturant-9675c.firebaseapp.com",
    databaseURL: "https://resturant-9675c-default-rtdb.firebaseio.com",
    projectId: "resturant-9675c",
    storageBucket: "resturant-9675c.appspot.com",
    messagingSenderId: "696147502692",
    appId: "1:696147502692:web:c9227f371c2d89593be171",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export default app;