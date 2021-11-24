import {
  collection,
  addDoc,
  getFirestore,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  orderBy,
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

/* export const editarPost = (idPostEdit, currentText) => {
  const post = prompt('Ingresa el nuevo texto', currentText);
  if (post.trim().length === 0) {
    alert('Completa el campo solicitado');
  }
  return db.collection('Post').doc(idPostEdit).update({
    post,
  })
    .then(() => {
      console.log('¡Documento actualizado con éxito!');
    })
    .catch((error) => {
      console.error('Error al actualizar el documento: ', error);
    });
}; */
