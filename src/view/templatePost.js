// import función para crear una publicación
import { createPost } from '../lib/firestore.js';

export const post = () => {
  const thirdPage = document.createElement('div');
  thirdPage.className = 'quarter-page';
  thirdPage.id = 'quarterPage';

  thirdPage.innerHTML = `<header> <img src="resources/logo.png" class="logo-timeLine"> 
  <nav class= "option-post"> 
  <img src="resources/close.png" id="closePost">
  <span class = "title-template"> <h1> Publicar </h1> </span>
   </nav>
  </header>
  <section class= "post-template" id= "post">
  <input type="text" id="artist" class = "input" placeholder="Artista/s"/>
        <input type="text" id="category" class = "input"  placeholder="Categoría" />
        <input type="date" id="date" class = "input" placeholder="Fecha"/>
        <input type="text" id="location" class = "input" placeholder="Ubicación"/>
        <input type="url" id='links' class = 'input' placeholder="Links de interes"/>
        <input type="text" id="description" class = "input" placeholder= "Descripción"/>
       
    
      <button id = "btnPost" class= "button"> Publicar </button>
  </section>`;

  // publicar un post
  const publish = thirdPage.querySelector('#btnPost');
  publish.addEventListener('click', () => {
    const artistValue = thirdPage.querySelector('#artist').value;
    const categoryValue = thirdPage.querySelector('#category').value;
    const dateValue = thirdPage.querySelector('#date').value;
    const descriptionValue = thirdPage.querySelector('#description').value;
    const urlValue = thirdPage.querySelector('#links').value;
    const locationValue = thirdPage.querySelector('#location').value;
    if (artistValue === '' || categoryValue === '' || dateValue === '' || descriptionValue === '' || urlValue === '' || locationValue === '') {
      alert('recuerda llenar todos los campos');
    } else {
      createPost(artistValue, categoryValue, dateValue, descriptionValue, urlValue, locationValue);
      window.location.hash = '#/timeLine';
    }
  });

  // salir de la opción publicar
  const exitPost = thirdPage.querySelector('#closePost');
  exitPost.addEventListener('click', () => {
    window.location.hash = '#/timeLine';
  });

  return thirdPage;
};
