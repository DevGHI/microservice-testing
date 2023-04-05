const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', proxy('http://127.0.0.1:3333/'))
app.use('/posts', proxy('http://127.0.0.1:4444/'))


app.listen(8000, () => {
    console.log('Gateway is Listening to Port 8000')
})