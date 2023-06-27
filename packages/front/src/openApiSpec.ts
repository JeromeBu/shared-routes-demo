import { type Book, bookRoutes } from "routes";
import { createOpenApiGenerator } from "shared-routes/openapi";

const generateOpenApiSpec = createOpenApiGenerator(
  { Books: bookRoutes },
  {
    info: {
      title: "Book API",
      version: "1",
      description: "This is the documentation extracted from the shared routes",
    },
    openapi: "3.0.0",
    servers: [{ url: "/api" }],
  }
);

const bookExemple: Book = {
  id: "123",
  title: "The Hobbit",
  author: "J.R.R. Tolkien",
  numberOfPages: 310,
};

export const openApiSpec = generateOpenApiSpec({
  Books: {
    getBooks: {
      extraDocs: {
        queryParams: {
          titleContains: {
            description: "Allows to chose how results are ordered",
          },
        },
        responses: {
          "200": { description: "The list of books" },
        },
      },
    },

    getBookById: {
      extraDocs: {
        responses: {
          "200": {
            description: "When the book is found",
          },
          "404": { description: "When the book cannot be found" },
        },
      },
    },

    addMyBook: {
      extraDocs: {
        body: {
          description: "The book to add",
          example: bookExemple,
        },
        responses: { "201": { description: "Returns the id, on success" } },
      },
    },
  },
});
