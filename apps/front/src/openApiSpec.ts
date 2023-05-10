import { type Book, bookRoutes } from "routes";
import { createOpenApiGenerator } from "shared-routes/openapi";

const generateOpenApiSpec = createOpenApiGenerator(bookRoutes, {
  info: {
    title: "Book API",
    version: "1",
    description: "This is the documentation extracted from the shared routes",
  },
  openapi: "3.0.0",
  servers: [{ url: "/api" }],
  tags: [{ name: "Books", description: "All about books" }],
});

const bookExemple: Book = {
  title: "The Hobbit",
  author: "J.R.R. Tolkien",
  numberOfPages: 310,
};

export const openApiSpec = generateOpenApiSpec({
  getBooks: {
    tags: ["Books"],
    extraDocs: {
      queryParams: {
        orderBy: { description: "Allows to chose how results are ordered" },
      },
      responseBody: {
        description: "The list of books stored in backend",
        example: [bookExemple],
      },
    },
  },
  addBook: {
    tags: ["Books"],
    extraDocs: { successStatusCode: 201, body: { example: bookExemple } },
  },
  getBookByTitle: {
    tags: ["Books"],
    extraDocs: {
      responses: { 404: { description: "When the book is not found" } },
    },
  },
});

console.log(openApiSpec);
