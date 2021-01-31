import { Task } from './functors/Task';
import fetch from 'node-fetch';
import { left } from './fp';

export const getURL = (url) => new Task((resolve) => 
  fetch(url, {method: 'GET', headers: { "Content-Type": 'text/plain'}})
    .then(resolve)
    .catch(left)
)

export const extractHTML = (response) => new Task((resolve) =>
  response.text()
    .then(resolve)
    .catch(left)
)

