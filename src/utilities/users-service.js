import * as usersAPI  from './users-api';

export async function signUp(userData) {
  // Delete the network request code to the 
  // users-api.js module which will ultimately
  // return the JWT
  const token = await usersAPI.signUp(userData);
  // Baby step by returning whatever is sent back by the server
  localStorage.setItem('token', token);
  return getUser();
}

export function getToken() {
  // getItem returns null if there's no string
  const token = localStorage.getItem('token');
  if (!token) return null;
  // obtain the payload of the token
  const payload = JSON.parse(atob(token.split('.')[1]));
  if (payload.exp < Date.now() / 1000) {
    // token has expired
    localStorage.removeItem('token');
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();
  // if there's a token, return the user in the payload
  return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export function logOut() {
  localStorage.removeItem('token');
}

export async function login(credentials) {
  const token = await usersAPI.login(credentials);
  localStorage.setItem('token', token);
  return getUser();
}

export function checkToken() {
     // Just so that you don't forget how to use .then
  return usersAPI.checkToken()
  // checkToken returns a string, but let's 
  // make it a Date object for more flexibility
  .then(dateStr => new Date(dateStr));
}
