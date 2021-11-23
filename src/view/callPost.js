import { readData } from '../lib/firestore.js';
// Función que imprime los post
// Esta función se llama en el TemplateTimeLine

// falta la hora :O
export const postCallback = (posts) => {
  const postMain = document.querySelector('#containerPost');
  postMain.innerHTML = '';
  const postContent = (element) => {
    const postUser = document.createElement('div');
    postUser.id = 'allPost';
    postUser.innerHTML += `
    <div class ='user-post'> <img id= profilePhoto src=${element.photoURL || '../resources/profile.png'} > <p class= name-user> ${element.userName} </p> 
    <img class= img-options src='../resources/options.png'> </div>
     <div class='post'>
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
        <img class='img' src='./resources/like.png'> 
        </div>
        <div class='btnRecom'>
        <img class='img-comment' src='./resources/comment.png'>
        </div>
     </div>
    </div>
    `;
    postMain.appendChild(postUser);
  };
  posts.forEach(postContent);
  return postMain;
};
export const showPost = () => {
  readData('Post', postCallback);
};
