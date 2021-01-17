// import { response } from 'express';
import * as functions from "firebase-functions";

import * as express from "express";
import * as cors from 'cors';


export const basicHTTP = functions.https.onRequest((req, res) => {
  const name = req.query.name;

  if (!name) {
    res.status(400).send("you must supply a namesss");
  } else {
    res.send(`Hello ${name}`);
  }
});

// Custom Middleware
const auth = (request, response, next) => {
  console.log(JSON.stringify(request.headers));
  if (!request.header.authorization) {
    response.status(400).send('unauthorized');
  }else {
    next();
  }
};

const app = express();
app.use(cors({ origin: true }));
app.use(auth);

app.get("/cat", (request, response) => {
  response.send("CAT");
});

app.get("/dog", (request, response) => {
  response.send("DOG");
});

export const api = functions.https.onRequest(app);