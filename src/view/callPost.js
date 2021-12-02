import {
  readData,
  deletePost,
  editPost,
  updateLikes,
} from '../lib/firestore.js';
import { auth } from '../lib/auth.js';

// Función que imprime los post
// Esta función se llama en el TemplateTimeLine
export const postCallback = (posts) => {
  const postMain = document.querySelector('#postContainer');
  postMain.innerHTML = '';
  const postContent = (element) => {
    const postUser = document.createElement('div');
    postUser.className = 'allPost';
    postUser.innerHTML += `
    <div class ="user"> ${element.userName} - ${element.datePost} <div class="userOptions"> </div> </div>
    
     <div class="post" id="${element.id}">
      <div class="feedPost"> 
      <textarea readonly class= "text-textarea"> ${element.artist} </textarea> <textarea readonly class= "text-textarea"> ${element.category} </textarea>
      <textarea readonly class= "text-textarea">  ${element.date} </textarea> <textarea readonly class= "text-textarea"> ${element.location} </textarea>
      <textarea readonly class= "text-textarea"> ${element.links} </textarea>
      <textarea readonly class= "text-textarea"> ${element.description} </textarea>
      </div>
     </div>
     <div class="reactions">
      <p class="likesCount" id="like-counter"> ${element.likesCounter} </p> <button id="btnLike" value= "${element.id}">
        <img class="img-like" src="./resources/like.png"> </button> 
        <img class="img-comment" src="./resources/comment.png">
      </div>
    </div>`;

    if (element.userId === auth.currentUser.uid) {
      postUser.innerHTML += `<button class="btn-Edit" value=${element.id} > Editar </button> 
      <button class="btn-Delete" id="btn-delete" value=${element.id} > Eliminar </button>
      <button class="btn-save" id="btn-save" value=${element.id} > Guardar </button>`;
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

  // función editar
  const btnEdit = postMain.querySelectorAll('.btn-Edit');
  btnEdit.forEach((item) => {
    item.addEventListener('click', (e) => {
      const dataBtn = e.target.parentElement;
      item.style.display = 'none';
      const btnSave = dataBtn.lastChild;
      btnSave.style.display = 'inline';
      const feedPost = dataBtn.childNodes[3].childNodes[1];
      feedPost.childNodes[1].removeAttribute('readonly');
      feedPost.childNodes[1].classList.toggle('active');
      // console.log(feedPost.childNodes);
      feedPost.childNodes[3].removeAttribute('readonly');
      feedPost.childNodes[3].classList.toggle('active');
      feedPost.childNodes[5].removeAttribute('readonly');
      feedPost.childNodes[5].classList.toggle('active');
      feedPost.childNodes[7].removeAttribute('readonly');
      feedPost.childNodes[7].classList.toggle('active');
      feedPost.childNodes[9].removeAttribute('readonly');
      feedPost.childNodes[9].classList.toggle('active');
      feedPost.childNodes[11].removeAttribute('readonly');
      feedPost.childNodes[11].classList.toggle('active');

      btnSave.addEventListener('click', () => {
        item.style.display = 'inline';
        btnSave.style.display = 'none';
        const idPost = item.value;
        const artsValue = feedPost.childNodes[1].value;
        const cateValue = feedPost.childNodes[3].value;
        const dateValue = feedPost.childNodes[5].value;
        const descripValue = feedPost.childNodes[11].value;
        const locaValue = feedPost.childNodes[7].value;
        const linkValue = feedPost.childNodes[9].value;

        // console.log(artsValue, idPost, cateValue, dateValue, descripValue, locaValue, linkValue);

        editPost(idPost, artsValue, cateValue, dateValue, descripValue, locaValue, linkValue);
      });
    });
  });

  // función dar like
  const likeBtn = postMain.querySelectorAll('#btnLike');
  likeBtn.forEach((btnElement) => {
    btnElement.addEventListener('click', () => {
      const postId = btnElement.value;
      const userId = auth.currentUser.uid;
      updateLikes(postId, userId);
    });
  });

  return postMain;
};

export const showPost = () => {
  readData('Post', postCallback);
};
