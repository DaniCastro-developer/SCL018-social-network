// import { editPost } from '../lib/firestore.js';

export const editTemplete = (idPost) => {
  const thirdPage = document.createElement('div');
  thirdPage.className = 'third-page';
  thirdPage.id = 'thirdPage';

  thirdPage.innerHTML = `<p> ${idPost.value} </p> `;

  return thirdPage;
};
