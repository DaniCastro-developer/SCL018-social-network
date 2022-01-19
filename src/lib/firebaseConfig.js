import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js';

const firebaseConfig = {
  apiKey: 'AIzaSyCNLaoS9p3z6_y0V06ggvzw2n6RQwrmt0A',
  authDomain: 'concert-date.firebaseapp.com',
  databaseURL: 'https://concert-date-default-rtdb.firebaseio.com',
  projectId: 'concert-date',
  storageBucket: 'concert-date.appspot.com',
  messagingSenderId: '345481607594',
  appId: '1:345481607594:web:060069248ceb9322ed93d3',
  measurementId: 'G-433Q90N1LX',
};

// Inicializar Firebase
export const app = initializeApp(firebaseConfig);
