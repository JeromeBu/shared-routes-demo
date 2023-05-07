import express, { Express } from "express";
import bodyParser from "body-parser";
import { Book, bookRoutes } from "routes";
import { createExpressSharedRouter } from "shared-routes-express";

const booksStorage: Book[] = [
  // { title: "The Hobbit", author: "J.R.R. Tolkien", numberOfPages: 310 },
];

const createBookRouter = () => {
  const expressRouter = express.Router();
  const { expressSharedRouter } = createExpressSharedRouter(
    bookRoutes,
    expressRouter
  );

  expressSharedRouter.getBooks((req, res) => {
    const { orderBy } = req.query;
    // orderBy alphabetically
    res.json(booksStorage.sort((a, b) => a[orderBy].localeCompare(b[orderBy])));
  });

  expressSharedRouter.addBook((req, res) => {
    booksStorage.push(req.body);
    res.status(201).json();
  });

  return expressRouter;
};

export const createBookApp = (): Express => {
  const app = express();
  app.use(bodyParser.json());
  app.use(createBookRouter());
  return app;
};
