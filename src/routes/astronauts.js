const express = require('express');
const fetch = require('node-fetch');

const astronautRouter = express.Router();

astronautRouter.get('/', (req, res) => {
    fetch('http://api.open-notify.org/astros.json')
      .then(res => res.json())
      .then(json => res.send(json))
      .catch(e => {
        res.status(503);
        res.send(e.message);
      })
  });

astronautRouter.get('/name/:searchParam', (req, res) => {
  fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${req.params.searchParam}%20astronaut&prop=info&inprop=url&utf8=&format=json`)
    .then(res => res.json())
    .then(json => res.send(json))
    .catch(e => {
      res.status(503);
      res.send(e.message);
    })
});

astronautRouter.get('/bio/:name', (req, res) => {
  fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=${req.params.name}`)
    .then(res => res.json())
    .then(json => res.send(json))
    .catch(e => {
      res.status(503);
      res.send(e.message);
    })
});

module.exports = {
  astronautRouter
}
