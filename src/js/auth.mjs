// import jwt_decode from 'jwt-decode';
import { jwtDecode } from 'jwt-decode';

import { getLocalStorage, setLocalStorage } from './utils.mjs';
import { loginRequest } from './externalServices.mjs';

const tokenKey = 'so-token';

// if there is a valid token it will be returned, otherwise we will redirect to the login page.
export function checkLogin() {
  const token = getLocalStorage(tokenKey);
  console.log(token);
  const valid = isTokenValid(token);

  if (!valid) {
    localStorage.removeItem(tokenKey);

    const location = window.location;

    window.location = `/login/index.html?redirect=${location.pathname}`;
  } else return token; //if they are logged in then just return the token.
}

function isTokenValid(token) {
  if (token) {
    const decoded = jwtDecode(token);
    let currentDate = new Date();

    //check if the token has expired
    if (decoded.exp * 1000 < currentDate.getTime()) {
      // token expired
      console.log('Token expired.');
      return false;
    } else {
      // token not expired
      console.log('Valid token');
      return true;
    }
  } else return false;
}

export async function login(creds, redirect = '/') {
  try {
    const token = await loginRequest(creds);
    setLocalStorage(tokenKey, token);
    window.location = redirect;
  } catch (err) {
    alertMessage(err.message.message);
  }
}
