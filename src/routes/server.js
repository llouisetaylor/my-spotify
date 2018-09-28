const express = require('express');
const morgan = require('morgan');
const path = require('path');

const { astronautRouter } = require('./astronauts')

const PORT = process.env.PORT || 8000;
const app = express();
app.use(morgan('tiny'));

app.use('/js', express.static(path.resolve(__dirname, '../../', 'dist/js')));
app.use('/css', express.static(path.resolve(__dirname, '../../', 'dist/css')));
app.use('/img', express.static(path.resolve(__dirname, '../../', 'dist/img')));

app.use('/api/astronauts', astronautRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../', 'dist/index.html'));
})

app.listen(PORT, () => { console.log(`Server is running on port: ${PORT}`) });
