// import función para muro??
import { exit } from '../lib/auth.js';
import { readData } from '../lib/firestore.js';
import { postCallback, showPost } from '../view/callPost.js'

export const timeLine = (user, photo) => {
  console.log(user, photo);
  const quarterPage = document.createElement('div');
  quarterPage.className = 'third-page';
  quarterPage.id = 'thirdPage';

  quarterPage.innerHTML = ` <header id = 'headerTimeLine'>
  <img class='logo-timeLine' src='resources/logo.png'> 
  <nav id= "userNav"> 
  <span class= "userInfo"> <img id= profilePhoto src=${photo || '../resources/profile.png'} > Hola ${user || 'Usuario'} </span>
  <ul class= 'submenu'>
            <li class='menu-item menu-link'> <img src = ./resources/edit.png class = 'icon1'> Editar perfil </li>
            <li class='menu-item menu-link' id = 'logOut' > <img src = ./resources/sign-out.png class = 'icon'> Cerrar sesión </li>
            </ul>
  </nav> 
  </header> 
      <section id= "post"> 
      
      <main id="containerPost"> </main>

       </section>
       <footer id= "navUser">
       <li class="menu-item menu-link"> <img src = ./resources/search.png class = "icon-search">  <li>
       <a href="#/post"> <button id="btnPublish" class='menu-item menu-link'> <img src = 'resources/post.png' class='publish-btn'> </button> </a>
        <li class='menu-item menu-link'> <img src = ./resources/calendar.png class = 'icon-calendar'> <li>
       </footer>
      `;

  showPost();

  const logOut = quarterPage.querySelector('#logOut');
  logOut.addEventListener('click', () => {
    exit();
    alert('Sesión cerrada con éxito, vuelve pronto');
  });

  readData('Post', postCallback);
  return quarterPage;
};
