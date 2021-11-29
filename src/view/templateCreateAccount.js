import { userRegister } from '../lib/auth.js';

export const createAccount = () => {
  const secondPage = document.createElement('div');
  secondPage.className = 'second-page';
  secondPage.id = 'secondPage';
  secondPage.innerHTML = `<header> <img src='resources/logo.png' class = 'title1'>
   <p class='slogan'> El punto de encuentro de tus conciertos </p> </header>`;

  // section 2 - Página para crear cuenta
  const section2 = document.createElement('section');
  section2.className = 'create-Account';
  section2.id = 'createAccount';
  section2.innerHTML = `<input type="text" id="createName" class = "input" placeholder="Nombre de usuario"/>
      <input type="email" id="mailRegister" class = "input" placeholder="correo@ejemplo.com" pattern="^\\S+@\\S+\\.\\S+$" required/>
      <input type="password" id="passwordRegister" class = "input" placeholder="contraseña" />
  
      <p class = "info">  <input type="checkbox" class = "info" class= "disabled" id="conditions" value="check"/> Acepto términos y condiciones </p>
  
      <button id = "btnRegister" class= "button"> Registrar </button>
  
     <p class= "info"> ¿Ya tienes una cuenta? <a href="#/login"> Inicia sesión </a> </p>`;

  secondPage.appendChild(section2);

  section2.querySelector('#btnRegister').addEventListener('click', () => {
    const email = section2.querySelector('#mailRegister').value;
    const password = section2.querySelector('#passwordRegister').value;
    const name = section2.querySelector('#createName').value;
    userRegister(email, password, name);
  });

  return secondPage;
};
