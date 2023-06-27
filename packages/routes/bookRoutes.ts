import { defineRoute, defineRoutes } from "shared-routes";
import { z } from "zod";

const bookWithoutIdSchema = z.object({
  title: z.string(),
  author: z.string(),
  numberOfPages: z.number(),
});

const bookIdSchema = z.string();

const bookSchema = bookWithoutIdSchema.merge(
  z.object({
    id: bookIdSchema,
  })
);

export type Book = z.infer<typeof bookSchema>;

export const bookRoutes = defineRoutes({
  getBooks: defineRoute({
    url: "/books",
    method: "get",
    queryParamsSchema: z.object({ titleContains: z.string() }),
    // headersSchema: z.object({ authorization: z.string() }),
    responses: { 200: z.array(bookSchema) },
  }),
  getBookById: defineRoute({
    url: "/books/:id",
    method: "get",
    responses: { 200: bookSchema, 404: z.object({ message: z.string() }) },
  }),
  addMyBook: defineRoute({
    url: "/books",
    method: "post",
    requestBodySchema: bookWithoutIdSchema,
    responses: { 201: z.object({ id: bookIdSchema }) },
  }),
});
