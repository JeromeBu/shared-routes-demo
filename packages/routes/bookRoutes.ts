import { defineRoute, defineRoutes } from "shared-routes";
import { z } from "zod";

const bookSchema = z.object({
  title: z.string(),
  author: z.string(),
  numberOfPages: z.number(),
})

export type Book = z.infer<typeof bookSchema>

export const bookRoutes = defineRoutes({
  getBooks: defineRoute({
    url: "/books",
    method: "get",
    responseBodySchema: z.array(bookSchema)
  }),
  addBook: defineRoute({
    url: "/books",
    method: "post",
    bodySchema: bookSchema
  })
})