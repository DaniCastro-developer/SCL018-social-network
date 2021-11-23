// import función para crear una publicación
import { createPost } from '../lib/firestore.js';

export const post = () => {
  const thirdPage = document.createElement('div');
  thirdPage.className = 'third-page';
  thirdPage.id = 'thirdPage';

  // header
  const header = document.createElement('header');
  thirdPage.appendChild(header);

  const logo = document.createElement('img');
  logo.className = 'logo';
  logo.src = 'resources/logo.png';
  header.appendChild(logo);

  // nav
  const nav = document.createElement('nav');
  nav.className = 'nav-post';
  thirdPage.appendChild(nav);

  const text = document.createElement('span');
  text.className = 'title-templete';
  text.innerHTML = '<h1> Comparte tu concierto </h1>';
  nav.appendChild(text);

  const closePost = document.createElement('img');
  closePost.id = 'close-post';
  closePost.src = 'resources/close.png';
  nav.appendChild(closePost);

  // section 3 - Página para crear un publicación
  const section3 = document.createElement('section');
  section3.className = 'post';
  section3.id = 'post';
  section3.innerHTML = `<input type='text' id='artist' class = 'input' placeholder='Artista/s'/>
        <input type='text' id='category' class = 'input'  placeholder='Categoría' />
        <input type='date' id='date' class = 'input' placeholder='Fecha'/>
        <input type='text' id='location' class = 'input' placeholder='Ubicación'/>
        <input type='url' id='links' class = 'input' placeholder='Links de interes'/>
        <input type='text' id='description' class = 'input' placeholder= 'Descripción'/>
       
    
      <button id = 'btnPost' class= 'button'> Publicar </button>`;

  thirdPage.appendChild(section3);

  // publicar un post
  const publish = section3.querySelector('#btnPost');
  publish.addEventListener('click', () => {
    const artistValue = section3.querySelector('#artist').value;
    const categoryValue = section3.querySelector('#category').value;
    const dateValue = section3.querySelector('#date').value;
    const descriptionValue = section3.querySelector('#description').value;
    const urlValue = section3.querySelector('#links').value;
    const locationValue = section3.querySelector('#location').value;
    createPost(artistValue, categoryValue, dateValue, descriptionValue, urlValue, locationValue);
    window.location.hash = '#/timeLine';
  });

  // salir de la opción publicar
  const exitPost = nav.querySelector('#close-post');
  exitPost.addEventListener('click', () => {
    window.location.hash = '#/timeLine';
  });

  return thirdPage;
};
