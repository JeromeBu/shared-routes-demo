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
        responseBody: {
          description: "The list of books stored in backend",
          example: [bookExemple],
        },
      },
    },

    addMyBook: {
      extraDocs: { successStatusCode: 201 },
    },
  },
});
