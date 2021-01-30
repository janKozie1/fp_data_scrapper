import { Task } from './functors/Task';
import fetch from 'node-fetch';

export const getURL = (url) => new Task((resolve, reject) => 
  fetch(url, {method: 'GET', headers: { "Content-Type": 'text/plain'}})
    .then(resolve)
    .catch(reject)
)

export const extractHTML = (response) => new Task((resolve, reject) =>
  response.text()
    .then(resolve)
    .catch(reject)
)

