const express = require('express');
const morgan = require('morgan');
const fetch = require('node-fetch');

const PORT = process.env.PORT || 8000;
const app = express();
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  fetch('http://api.open-notify.org/astros.json')
    .then(res => res.json())
    .then(json => res.send(json))
    .catch(e => {
      res.status(503);
      res.send(e.message);
    })
});

app.listen(PORT, () => { console.log(`Server is running on port: ${PORT}`) });
