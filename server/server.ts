import bodyParser from 'body-parser';
import express from 'express';
import photos from './api/photos';

const app = express();
const port = process.env.port || 4000;

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use('/api', photos);

app.listen(port, () => console.log(`Launched on port ${port}`));
