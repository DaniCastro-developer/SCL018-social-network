// import función para muro??
import { exit } from '../lib/auth.js';
import { readData } from '../lib/firestore.js';
import { postCallback } from '../view/callPost.js'
import { showPost } from '../view/callPost.js';

export const timeLine = () => {
  const containerRoot = document.querySelector('#root');
  const quarterPage = document.createElement('div');
  quarterPage.className = 'third-page';
  quarterPage.id = 'thirdPage';

  const structureWall = ` <header id = 'headerTimeLine'>
  <nav id= 'userInfo'></nav> 
  <nav id='wallNav'>  
  <span class='nav-bar' id='btnMenu'> <i class= 'fas fa-bars'> </i> Menú </span>
    <nav class='main-nav'>
      <ul class='menu' id='menu'>
        <li class='menu-item container-submenu'> <a href='#' class='menu-link submenu-btn'> <img src = ./resources/profile.png class = 'icon1'> Perfil </a>
          <ul class= 'submenu'>
            <li class='menu-item menu-link'> <img src = ./resources/edit.png class = 'icon1'> Editar perfil </li>
            <li class='menu-item menu-link' id = 'logOut' > <img src = ./resources/sign-out.png class = 'icon'> Cerrar sesión </li>
            </ul>
        </li>
        <li class='menu-item menu-link'> <img src = ./resources/search.png class = 'icon1'> Buscar <li>
        <li class='menu-item menu-link'> <img src = ./resources/calendar.png class = 'icon1'> Calendario <li>
        </ul>
      </nav>
      </header> 
      <section id= 'post'> <a href='#/post'> <button id="btnPublish"> <img src = 'resources/post.png'> </button> </a> </section>
      <main id='containerPost'> </main>`;

  quarterPage.innerHTML = structureWall;
  containerRoot.appendChild(quarterPage);
  showPost();
  const logOut = quarterPage.querySelector('#logOut');
  logOut.addEventListener('click', () => {
    exit();
  });
  readData('Post', postCallback);
  return quarterPage;
};
