import { homeLogin } from '../view/templateLogin.js';
import { createCount } from '../view/templateCreateCount.js';
import { post } from '../view/templatePost.js';
import { timeLine } from '../view/templateTimeLine.js';
import { resetPassword } from '../view/resetPassword.js';

export const routes = (hash) => {
  const rootContainer = document.getElementById('root');
  rootContainer.innerHTML = '';
  if (hash === '#/' || hash === '/' || hash === '#' || hash === '') {
    rootContainer.appendChild(homeLogin());
  } else if (hash === '#/login') {
    rootContainer.appendChild(homeLogin());
  } else if (hash === '#/account') {
    rootContainer.appendChild(createCount());
  } else if (hash === '#/timeLine') {
    rootContainer.appendChild(timeLine());
  } else if (hash === '#/post') {
    rootContainer.appendChild(post());
  } else if (hash === '#/resetPassword') {
    rootContainer.appendChild(resetPassword());
  }
};
