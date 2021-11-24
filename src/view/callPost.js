import { readData, deletePost } from '../lib/firestore.js';
import { auth } from '../lib/auth.js';
import { editTemplete } from '../view/editPost.js';
// Función que imprime los post
// Esta función se llama en el TemplateTimeLine

export const postCallback = (posts) => {
  const postMain = document.querySelector('#containerPost');
  postMain.innerHTML = '';
  const postContent = (element) => {
    const postUser = document.createElement('div');
    postUser.className = 'allPost';
    postUser.innerHTML += `
    <div class ='user'> ${element.userName} <div class='userOptions'> </div> </div>
    
     <div class='post' id='${element.id}'>
      <div class="feedPost"> 
      <p> ${element.artist} </p>
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
      postUser.innerHTML += `<button class="btn-Edit" value=${element.id}> Editar </button> 
      <button class="btn-Delete" id="btn-delete" value=${element.id}> Eliminar </button>`;
    }
    postMain.appendChild(postUser);
  };
  posts.forEach(postContent);

  // se llama a función para borrar publicación
  const btnDeleteList = postMain.querySelectorAll('.btn-Delete');
  btnDeleteList.forEach((item) => {
    item.addEventListener('click', () => deletePost(item.value));
  });

  const btnEditar = postMain.querySelectorAll('.btn-Edit');
  btnEditar.forEach((item) => {
    item.addEventListener('click', () => {
      console.log(item.value);
      editTemplete(item.value);
      window.location.hash = '#/editPost';
    });
  });
  return postMain;
};

export const showPost = () => {
  readData('Post', postCallback);
};
