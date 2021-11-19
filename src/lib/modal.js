const closeModal = (element) => {
  const section = element;
  const closeButton = section.querySelector('.close');
  closeButton.addEventListener('click', () => {
    section.style.display = 'none';
    if (closeButton.id === 'emailModal') window.location.hash = '#/login';
    if (closeButton.id === 'postConfirmation') window.location.reload();
  });
  window.addEventListener('click', (e) => {
    if (e.target === section) {
      section.style.display = 'none';
      if (closeButton.id === 'emailModal') window.location.hash = '#/login';
      if (closeButton.id === 'postConfirmation') window.location.reload();
    }
  });
};

export const sendPasswordResetEmailModal = (email) => {
  const section = document.createElement('section');
  section.classList.add('modal');
  section.innerHTML = `
        <section class="modal-content">
          <header class="modal-header">
              <span class="close">&times;</span>
              <h2>¡Correo enviado!</h2>
          </header>
          <main class="modal-body">
              <p>Hemos enviado un link de restablecimiento de contraseña al correo: <span class="modalEmail"><b>${email}</b></span></br>
              <br>Por favor revise su buzón de correo o spam.</p></br>
          </main>
          <footer class="modal-footer">
          </footer>
        </section>`;
  closeModal(section);
  return section;
};

export const userNotRegisterModal = (email) => {
  const section = document.createElement('section');
  section.classList.add('modal');
  section.innerHTML = `
        <section class="modal-content">
          <header class="modal-header">
              <span class="close">&times;</span>
              <h2>¡UPS!</h2>
          </header>
          <main class="modal-body">
              <p>No existe una cuenta registrada con el correo: <span class="modalEmail">
              <b>${email}</b></span>
              </p></br>
              <p>Intentelo de nuevo.</p>
          </main>
          <footer class="modal-footer">
              <span>¿No tienes una cuenta?</span>
              <a href="#/signup">
              <span class="modal-redirect" id="signUpRedirectModal"><b>Crear una cuenta</b></span>
              </a>
          </footer>
        </section>`;
  closeModal(section);
  return section;
};
