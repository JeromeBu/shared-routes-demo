import { bookRoutes } from "routes";
import { createOpenApiGenerator } from "shared-routes-openapi";

const generateOpenApiSpec = createOpenApiGenerator(bookRoutes, {
  info: {
    title: "Book API",
    version: "1",
    description: "This is the documentation extracted from the shared routes",
  },
  openapi: "3.0.0",
});

export const openApiSpec = generateOpenApiSpec({
  addBook: { description: "This is a custom description, for addBook" },
  getBooks: {
    description: "This is a custom description, for getBooks",
    extraDocumentation: {
      queryParams: {
        orderBy: { description: "Allows to chose how results are ordered" },
      },
    },
  },
});
