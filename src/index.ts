import express from 'express'
import routes from './routes';

const app = express();

app.use(express.json());

app.use('/api/games', routes.game);

app.listen(3000, () =>
    console.log('REST API server ready at: http://localhost:3000'),
)
