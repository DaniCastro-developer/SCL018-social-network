// import { editPost } from '../lib/firestore.js';

export const editTemplete = (item) => {
  const idPost = item;
  console.log(idPost);
  const thirdPage = document.createElement('div');
  thirdPage.className = 'third-page';
  thirdPage.id = 'thirdPage';

  thirdPage.innerHTML = `<p> ${idPost} </p> `;

  return thirdPage;
};
