import express from 'express';
import postsRouter from './routers/postsRouters.js';

const app = express();

const SERVER_PORT = process.env.SERVER_PORT || 3000;

app.use(express.static('public', {
    index: false
}));

app.get('/', (request, response) => {
    response.send('<h1>Benvenuti</h1>')
})

app.get('/posts', postsRouter);

app.listen(SERVER_PORT, (error) => {

    if (error) {
        console.log('Il server ha riscontrato dei problemi', error);
    } else {
        console.log('Server in ascolto sulla porta:', SERVER_PORT);
    }
})