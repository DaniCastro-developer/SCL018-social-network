// import función para muro??
import { exit } from '../lib/auth.js';
import { readData } from '../lib/firestore.js';
import { postCallback } from '../view/callPost.js'

export const timeLine = () => {
  const quarterPage = document.createElement('div');
  quarterPage.className = 'third-page';
  quarterPage.id = 'thirdPage';

  quarterPage.innerHTML = ` <header id = "headerTimeLine">
  <img class="logo-timeLine" src="resources/logo.png"> 
  <nav id= "userNav"> 
  <span id= "userInfo">  </span>
  <ul class= "submenu">
            <li class="menu-item menu-link"> <img src = ./resources/edit.png class = "icon1"> Editar perfil </li>
            <li class="menu-item menu-link" id = "logOut" > <img src = ./resources/sign-out.png class = "icon"> Cerrar sesión </li>
            </ul>
  </nav> 
  </header> 
      <section class= "posts-container"> 
      
      <main id="postContainer"> </main> 

       </section>
       <footer id= "navUser">
       <li class="menu-item menu-link"> <img src = ./resources/search.png class = "icon-nav">  <li>
       <a href="#/post"> <button id="btnPublish" class="menu-item menu-link"> <img src = "resources/post.png" class="icon-nav"> </button> </a>
        <li class="menu-item menu-link"> <img src = ./resources/calendar.png class = "icon-nav"> <li>
       </footer>
      `;

  const logOut = quarterPage.querySelector('#logOut');
  logOut.addEventListener('click', () => {
    exit();
    alert('Sesión cerrada con éxito, vuelve pronto');
  });

  const profileOptions = quarterPage.querySelector('#userInfo');
  const submenu = quarterPage.querySelector('.submenu');
  profileOptions.addEventListener('click', () => {
    submenu.classList.toggle('show');
  });

  readData('Post', postCallback);
  return quarterPage;
};
