import { userLogin, loginWithGoogle, sendPasswordReset } from '../lib/auth.js';

export const homeLogin = () => {
  // container principal
  const firstPage = document.createElement('div');
  firstPage.className = 'firstPage';
  firstPage.id = 'container';

  // header
  const header = document.createElement('header');
  firstPage.appendChild(header);

  const logo = document.createElement('img');
  logo.className = 'title1';
  logo.src = 'resources/logo.png';
  header.appendChild(logo);

  // section 1 - Página de login
  const section1 = document.createElement('section');
  section1.className = 'login';
  section1.innerHTML = ` <input type='email' class= 'input' id='mailLogin' placeholder="correo@example.com" pattern="^\\S+@\\S+\\.\\S+$" title="Ejemplo: correo@example.com" required/>
        <input type='password' class= 'input' id='passwordLogin' placeholder="contraseña" pattern="^(?=\\w*\\d)(?=\\w*[A-Z])(?=\\w*[a-z])\\S{8,16}$" title="La contraseña debe tener al menos entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. NO puede tener otros símbolos." required />
        <p id= 'lostPassword' class = 'info'> Olvidé mi contraseña </p>
    
       <a href='#/timeLine'> <button id = 'btnLogin' class= 'button'> Ingresar </button> </a>
    
        <p class = 'info'> O ingresa con </p>
    
        <button id="googleLogin"> <img src = 'resources/google.png' class = 'google'> </button>
    
        <p class='info'> ¿No tienes  una cuenta? <a href='#/account'> Crea una cuenta </a> </p>`;

  firstPage.appendChild(section1);

  section1.querySelector('#btnLogin').addEventListener('click', () => {
    const email1 = section1.querySelector('#mailLogin').value;
    const password1 = section1.querySelector('#passwordLogin').value;
    userLogin(email1, password1);
  });

  section1.querySelector('#googleLogin').addEventListener('click', () => {
    loginWithGoogle();
  });

  section1.querySelector('#lostPassword').addEventListener('click', () => {
    window.location.hash = '#/resetPassword';
  });

  return firstPage;
};
