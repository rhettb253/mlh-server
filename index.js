require('dotenv').config();
const PORT = process.env.PORT || 3001;
const {start} = require('./server');

start(PORT);


