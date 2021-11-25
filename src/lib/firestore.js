import {
  collection,
  addDoc,
  getFirestore,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  orderBy,
  updateDoc,
} from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js';
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
      userId: auth.currentUser.uid,
      artist: artistValue,
      category: categoryValue,
      date: dateValue,
      description: descriptionValue,
      links: urlValue,
      location: locationValue,
      datePost: Date(Date.now()),
      like: [],
    });
    console.log('Document written with ID: ', docRef);
    return docRef;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

// Función para leer data de la colección de Firebase
export const readData = (nameCollection, callback) => {
  const q = query(collection(db, nameCollection), orderBy('datePost', 'asc'));
  onSnapshot(q, (querySnapshot) => {
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({ ...doc.data(), id: doc.id });
    });
    callback(posts);
  });
};

// función para borrar publicación
export const deletePost = async (postId) => {
  console.log(postId);
  const confirm = window.confirm('¿Quieres eliminar esta publicación?');
  if (confirm) {
    await deleteDoc(doc(db, 'Post', postId));
  }
};

// función editar documento
export const editPost = async (idPost, artsValue) => {
  const collectionRef = doc(db, 'Post', idPost);
  await updateDoc(collectionRef, {
    artist: artsValue,
  });
};

/*  cateValue, dateValue, descripValue, urlValue, locationValue
category: cateValue,
date: dateValue,
description: descripValue,
links: urlValue,
location: locationValue, */

/* export const editPost = async (idPost, artsValue) => {
  const postRef = doc(db, 'publicaciones', idPost);
  await updateDoc(postRef, {
    artist: artsValue,
  });
}; */
