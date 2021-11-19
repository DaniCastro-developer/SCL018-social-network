import { readData } from '../lib/firestore.js';
// Función que imprime los post
// Esta función se llama en el TemplateTimeLine

export const postCallback = (posts) => {
  const postMain = document.querySelector('#containerPost');
  postMain.innerHTML = '';
  const postContent = (element) => {
    const postUser = document.createElement('div');
    postUser.innerHTML += `
    <div class='allPost'>
    <div class ='name'>${element.userName}</div>
    <div class='photo'> <img id= profilePhoto src=${element.photoURL || '../resources/profile.png'} >
     <div class='post'>
      <div class="feedPost"> 
      ${element.artist}
      ${element.category}
      ${element.date}
      ${element.description}
      ${element.links}
      ${element.location}
      </div>
     </div>
     <div class='reactions'>
       <div class='btnLike'>
        <img class='img' src='./resources/like.png'> 
        </div>
        <div class='btnRecom'>
        <img class='img' src='./resources/comment.png'>
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
