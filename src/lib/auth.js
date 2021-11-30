// Import the functions you need from the SDKs you need
// 18-11 cambios

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithPopup,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  signOut,
} from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js';
import { timeLine } from '../view/templateTimeLine.js';

import { app } from './firebaseConfig.js';

export const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);

// obtener información del usuario
export const profileInit = async (userCredential) => {
  const user = userCredential.displayName;
  const photo = userCredential.photoURL;
  timeLine(user, photo);
};

// Registrar usuario
export const userRegister = (email, password, name) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // console.log('usuario creado', user);
      updateProfile(auth.currentUser, {
        displayName: name,
      });

      // send email verification
      if (user != null) {
        sendEmailVerification(auth.currentUser)
          .then(() => {
            // console.log('correo enviado');
            alert('Hemos enviado un correo de verificación para validar tu cuenta.');
            window.location.hash = '#/login';
          })
          .catch((error) => {
            // console.log('Proceso no realizado', error);
          });
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      alert(errorMessage);
      // console.log(errorCode + errorMessage);
    });
};

// Iniciar sesión con correo
export const userLogin = (email1, password1) => {
  signInWithEmailAndPassword(auth, email1, password1)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      if (user && user.emailVerified === true) {
        window.location.hash = '#/timeLine';
      } else {
        alert('Recuerda validar tu correo.');
        window.location.hash = '#/login';
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // console.log(errorCode + errorMessage);
      window.location.hash = '#/login';
    });
};

// Iniciar sesión con google
export const loginWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      window.location.hash = '#/timeLine';
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

// Cerrar sesión
export const exit = () => {
  signOut(auth).then(() => {
    window.location.hash = '#/login';
  }).catch((error) => {
    alert(error);
  });
};

//  Observador de estado de autentificación
export const authChanged = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      // console.log('usuario logueado', user.displayName);
      profileInit(user);
    } else if (!user) {
      if (!['#/resetPassword', '#/account'].includes(window.location.hash)) window.location.hash = '#/login';
    }
  });
};

// Función para cambiar contraseña olvidada
export const sendPasswordReset = (email) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};
