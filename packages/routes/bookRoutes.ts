import { defineRoute, defineRoutes } from "shared-routes";
import { z } from "zod";

const bookSchema = z.object({
  title: z.string(),
  author: z.string(),
  numberOfPages: z.number(),
});

export type Book = z.infer<typeof bookSchema>;

export const bookRoutes = defineRoutes({
  getBooks: defineRoute({
    url: "/books",
    method: "get",
    queryParamsSchema: z.object({ orderBy: z.enum(["title", "author"]) }),
    responseBodySchema: z.array(bookSchema),
  }),
  getBookByTitle: defineRoute({
    url: "/books/:title",
    method: "get",
    headersSchema: z.object({ Authorization: z.string() }),
  }),
  addBook: defineRoute({
    url: "/books",
    method: "post",
    bodySchema: bookSchema,
  }),
});
