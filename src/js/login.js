import { loadHeaderFooter, getParam } from './utils.mjs';
import { login } from './auth.mjs';

loadHeaderFooter();

let redirect = getParam('redirect') || '/';

document.getElementById('loginButton').addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  await login({ email, password }, redirect);
});
