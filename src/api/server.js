const express = require('express');
const morgan = require('morgan');

const PORT = process.env.PORT || 8000;
const app = express();
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(PORT, () => { console.log(`Server is running on port: ${PORT}`) });
