import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import nodeFetch from 'node-fetch';
import { createApi } from 'unsplash-js';

const server = express();

/*
* Following the Unsplash Guidelines to define the logic on server side
* in order to not reveal a key
*/
const unsplash = createApi({
  accessKey: process.env.UNSPLASH_API_KEY,
  fetch: nodeFetch,
});

server
  .use(bodyParser.json())
  .get('/photos', async (req: Request, res: Response) => {
    let {
      topic = 'travel',
      quantity = '10',
    } = req.query;

    try {
      const result = await unsplash.search
        .getPhotos({
          query: topic as string,
          perPage: Number(quantity),
        });

      res.status(result.status);
      res.json(result);
    } catch (e: any) {
      res.status(500);
      res.json({
        type: 'error',
        status: 500,
        errors: ['Unknown error'],
      });
    }
  });

export default server;
