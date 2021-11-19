import {
  collection,
  addDoc,
  getFirestore,
  query,
  onSnapshot,
  orderBy } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js';
import { app } from '../lib/firebaseConfig.js';
import { auth } from '../lib/auth.js';

const db = getFirestore(app);

// Acá se crea el post
export const createPost = async (artistValue, categoryValue, dateValue, descriptionValue, urlValue, locationValue) => {
  try {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, 'Post'), {
      userName: auth.currentUser.displayName,
      photo: auth.currentUser.photoURL,
      artist: artistValue,
      category: categoryValue,
      date: dateValue,
      description: descriptionValue,
      links: urlValue,
      location: locationValue,
      datePost: Date(Date.now()),
    });
    console.log('Document written with ID: ', docRef);
    return docRef;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

// Función para leer data de la colección de Firebase
export const readData = (nameCollection, callback) => {
  const q = query(collection(db, nameCollection), orderBy('datePost', 'desc'));
  onSnapshot(q, (querySnapshot) => {
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push(doc.data());
      console.log(doc);
    });
    callback(posts);
    console.log(posts);
  });
};
