import express from 'express'
import routes from './routes';
import 'dotenv/config';

const app = express();
const port = process.env.APP_PORT;

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


app.use('/api/v1/games', routes.games);
app.use('/api/v1/games', routes.gamePlayer);
app.use('/api/v1/games', routes.gamePlayerCard);

app.listen(port, () =>
    console.log(`REST API server ready at: http://localhost:${port}`),
)
