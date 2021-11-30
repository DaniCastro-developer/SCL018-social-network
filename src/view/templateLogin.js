import { userLogin, loginWithGoogle } from '../lib/auth.js';

export const homeLogin = () => {
  // container principal
  const firstPage = document.createElement('div');
  firstPage.className = 'firstPage';
  firstPage.id = 'container';

  firstPage.innerHTML = ` <header> <img src= "resources/logo.png" class="logo-login"> </header> 
  <section class= "login"> 
  <input type="email" class= "input" id="mailLogin" placeholder="correo@ejemplo.com" pattern="^\\S+@\\S+\\.\\S+$" required />
  <input type='password' class= "input" id="passwordLogin" placeholder="contraseña" />
  <p class = "info" id = "lostPassword"> Olvidé mi contraseña </p>

 <a href="#/timeLine"> <button id = "btnLogin" class= "button"> Ingresar </button> </a>

  <p class = "info"> O ingresa con </p>

  <button id="googleLogin"> <img src = "resources/google.png" class = "google"> </button>

  <p class="info"> ¿No tienes  una cuenta? <a href="#/account"> Crea una cuenta </a> </p>
  </section>`;

  firstPage.querySelector('#btnLogin').addEventListener('click', () => {
    const email1 = firstPage.querySelector('#mailLogin').value;
    const password1 = firstPage.querySelector('#passwordLogin').value;
    userLogin(email1, password1);
  });

  firstPage.querySelector('#googleLogin').addEventListener('click', () => {
    loginWithGoogle();
  });

  firstPage.querySelector('#lostPassword').addEventListener('click', () => {
    window.location.hash = '#/resetPassword';
  });

  return firstPage;
};
