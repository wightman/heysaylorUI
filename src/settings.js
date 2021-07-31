/**
  * settings.js - app-level settings for reaching the API.
  */

const protocol = 'https';
const host = '192.168.2.113';
const port = '8000';

const serviceURL = protocol.concat('://',host,':',port);

export default {
    serviceURL,
}
