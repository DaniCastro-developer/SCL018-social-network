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
  getDoc,
  arrayRemove,
  arrayUnion,
  Timestamp,
} from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js';
import { app } from './firebaseConfig.js';
import { auth } from './auth.js';

const db = getFirestore(app);

// Función para crear publicación
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
      likesCounter: 0,
    });
    // console.log('Document written with ID: ', docRef);
    return docRef;
  } catch (e) {
    // console.error('Error adding document: ', e);
  }
};

// Función para leer data de la colección de Firebase
export const readData = (nameCollection, callback) => {
  const q = query(collection(db, nameCollection), orderBy('datePost', 'desc'));
  onSnapshot(q, (querySnapshot) => {
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({ ...doc.data(), id: doc.id });
    });
    callback(posts);
  });
};

// Función para borrar publicación
export const deletePost = async (postId) => {
  // console.log(postId);
  const confirm = window.confirm('¿Quieres eliminar esta publicación?');
  if (confirm) {
    await deleteDoc(doc(db, 'Post', postId));
  }
};

// Función editar documento
export const editPost = async (idPost, artsValue, cateValue, dateValue, descripValue, locaValue, linkValue) => {
  const collectionRef = doc(db, 'Post', idPost);
  await updateDoc(collectionRef, {
    artist: artsValue,
    category: cateValue,
    date: dateValue,
    description: descripValue,
    links: linkValue,
    location: locaValue,

  });
};

// Dar like a una publicación

export const updateLikes = async (postId, userId) => {
  const collectionRef = doc(db, 'Post', postId);
  const docSnap = await getDoc(collectionRef);
  const postData = docSnap.data();
  const likesCount = postData.likesCounter;
  // console.log(postData.like);

  if ((postData.like).includes(userId)) {
    await updateDoc(collectionRef, {
      like: arrayRemove(userId),
      likesCounter: likesCount - 1,
    });
  } else {
    await updateDoc(collectionRef, {
      like: arrayUnion(userId),
      likesCounter: likesCount + 1,
    });
  }
};
