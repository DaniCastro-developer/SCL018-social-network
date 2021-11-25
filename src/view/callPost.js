import { readData, deletePost, editPost } from '../lib/firestore.js';
import { auth } from '../lib/auth.js';
// import { editTemplete } from '../view/editPost.js';
// Función que imprime los post
// Esta función se llama en el TemplateTimeLine

export const postCallback = (posts) => {
  const postMain = document.querySelector('#containerPost');
  postMain.innerHTML = '';
  const postContent = (element) => {
    const postUser = document.createElement('div');
    postUser.className = 'allPost';
    postUser.innerHTML += `
    <div class ='user'> ${element.userName} ${element.datePost} <div class='userOptions'> </div> </div>
    
     <div class='post' id='${element.id}'>
      <div class="feedPost"> 
      <textarea readonly class= "artist"> ${element.artist} </textarea>
      <p> ${element.category} </p>
      <p> ${element.date} - ${element.location} </p>
      <p> ${element.links} </p>
      <p> ${element.description} </p>
      </div>
     </div>
     <div class='reactions'>
       <div class='btnLike'>
        <img class='img' src='./resources/like.png'> <div class="likesCount"></div>
        </div>
        <div class='btnRecom'>
        <img class='img-comment' src='./resources/comment.png'>
        </div>
     </div>
    </div>`;

    if (element.userId === auth.currentUser.uid) {
      postUser.innerHTML += `<button class="btn-Edit" value=${element.id} > Editar </button> 
      <button class="btn-Delete" id="btn-delete" value=${element.id} > Eliminar </button>
      <button class="btn-save" id="btn-save" style="display: none" value=${element.id} > Guardar </button>`;
    }
    postMain.appendChild(postUser);
  };
  posts.forEach(postContent);

  // se llama a función para borrar publicación
  const btnDeleteList = postMain.querySelectorAll('.btn-Delete');
  btnDeleteList.forEach((item) => {
    const idPost = item.value;
    item.addEventListener('click', () => deletePost(idPost));
  });

  const btnEdit = postMain.querySelectorAll('.btn-Edit');

  btnEdit.forEach((item) => {
    item.addEventListener('click', () => {
      const idPost = item.value;
      const btnSave = postMain.querySelector('#btn-save');
      const artistInp = postMain.querySelector('.artist');
      console.log(btnSave);
      item.style.display = 'none';
      btnSave.style.display = 'hidden';
      artistInp.removeAttribute('readonly');

      btnSave.addEventListener('click', () => {
        item.style.display = 'hidden';
      });
      // editPost(idPost, artsValue, cateValue, dateValue, descripValue, urlValue, locationValue));
    });
  });

  return postMain;
};

export const showPost = () => {
  readData('Post', postCallback);
};
