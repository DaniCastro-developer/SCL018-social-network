import { sendPasswordReset } from '../lib/auth.js';

// Conexión con template
// Se llama a la función que envía el correo para resetear
export const resetPasswordFirebase = (container) => {
  const resetBtn = container.querySelector('#resetPasswordButton');
  resetBtn.addEventListener('click', () => {
    const email = container.querySelector('#resetEmail');
    if (email.value !== '') {
      sendPasswordReset(email.value);
      alert('Hemos enviado un correo para que puedas recuperar tu contraseña');
      window.location.hash = '#/login';
    }
  });
};
//PARA COMENTAR UN TEMPLATE ES <!-- TEXTO -->
// Template para resetear contraseña
export const resetPassword = () => {
  const container = document.createElement('section');
  container.classList.add('resetPasswordContainer');
  container.innerHTML = `
    <form id="passwordForm" class="resetPasswordForm">
      <!--div class="container-logo">
      <img class="password-logo" src="./resources/logo.png" alt='logoConcertDate'/> 
      </diV-->
      <div class= "container-password">
      <img src= "./resources/password.png" class= "password-logo">
      <h1 class="hText"> ¿Tienes problemas para iniciar sesión? </h1> 
      <label class="formText"> Ingresa tu correo y te enviaremos un enlace para que recuperes el acceso a tu cuenta</label>
      <input id="resetEmail" class="input" name="emailReset" type="email" placeholder="correo@example.com" pattern="^\\S+@\\S+\\.\\S+$" title="Ejemplo: correo@example.com" required/>
      <button id="resetPasswordButton" class="button"> Recuperar contraseña </button>
      <a id="ccn" href="#/account" > Crear cuenta nueva </a>
      <a id="vis" href="#/login"> Volver a inicio de sesión </a>
      </div>
    </form>
  `;
  resetPasswordFirebase(container);
  return container;
};
