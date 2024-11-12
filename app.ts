import express, { Application } from 'express';
import routers from './routes';

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routers);


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
export default app;
