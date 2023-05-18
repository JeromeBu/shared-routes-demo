import express, { Express } from "express";
import bodyParser from "body-parser";
import { Book, bookRoutes } from "routes";
import { createExpressSharedRouter } from "shared-routes/express";

export const theHobbitBook: Book = {
  id: "001",
  title: "The Hobbit",
  author: "J.R.R. Tolkien",
  numberOfPages: 310,
};

<<<<<<< HEAD
const booksStorage: Book[] = [theHobbitBook, theHobbitBook, theHobbitBook, theHobbitBook, theHobbitBook, theHobbitBook];
=======
const booksStorage: Book[] = [theHobbitBook];
>>>>>>> cb1a7aa (improve test and show cases)

const getId = () => Math.floor(Math.random() * 1000);

const createBookRouter = () => {
  const expressRouter = express.Router();
  const expressSharedRouter = createExpressSharedRouter(
    bookRoutes,
    expressRouter
  );

  expressSharedRouter.getBooks((req, res) =>
    res.json(
      booksStorage.filter((book) =>
<<<<<<< HEAD
        book.title.toLowerCase().includes(req.query.titleContains.toLowerCase())
=======
        book.title.toLowerCase().includes(req.query.inTitle.toLowerCase())
>>>>>>> cb1a7aa (improve test and show cases)
      )
    )
  );

  expressSharedRouter.addMyBook((req, res) => {
    const bookId = getId().toString();
    booksStorage.push({ id: bookId, ...req.body });
    res.status(201).json({ id: bookId });
  });

  expressSharedRouter.getBookById((req, res) => {
    const matchedBook = booksStorage.find((book) => book.id === req.params.id);
    res.json(matchedBook);
  });

  return expressRouter;
};

export const createBookApp = (): Express => {
  const app = express();
  app.use(bodyParser.json());
  app.use(createBookRouter());
  return app;
};
