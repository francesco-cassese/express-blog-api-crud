import express from 'express';
import postsRouter from './routers/postsRouters.js';

const app = express();
app.use(express.json());

const SERVER_PORT = process.env.SERVER_PORT || 3000;

app.use(express.static('public', {
    index: false
}));

app.get('/', (request, response) => {
    response.send('<h1>Benvenuti</h1>')
})

/*http://localhost:3000/posts*/
app.use('/posts', postsRouter);

app.listen(SERVER_PORT, (error) => {

    if (error) {
        console.log('Il server ha riscontrato dei problemi', error);
    } else {
        console.log('Server in ascolto sulla porta:', SERVER_PORT);
    }
})