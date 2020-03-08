// http client that uses promises
const axios = require("axios");
// loads variables from environment
require("dotenv").config();

const api = {
  getUser(username) {
    // setup url using username
    // and variables loaded thru .env / dotenv
    const url = `https://api.github.com/users/${username}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`;

    return axios.get(url).catch(err => {
      console.log(`User not found`);

      // terminate program
      process.exit(1);
    });
  }
};

module.exports = api;
