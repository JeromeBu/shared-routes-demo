import { Book, bookRoutes } from "routes";
import { createSupertestSharedClient } from "shared-routes/supertest";
import supertest from "supertest";
import { createBookApp, theHobbitBook } from "./createBookApp";
import { describe, it, expect } from "vitest";

const harryPotterBook: Omit<Book, "id"> = {
  title: "Harry Potter and the Philosopher's Stone",
  author: "J.K. Rowling",
  numberOfPages: 223,
};

const expectToEqual = <T>(actual: T, expected: T) => {
  expect(actual).toEqual(expected);
};

describe("bookApi", () => {
  it("adds a book, than get the list of books", async () => {
    const supertestRequest = supertest(createBookApp());
    const request = createSupertestSharedClient(bookRoutes, supertestRequest);

    const { status } = await request.addMyBook({
      body: harryPotterBook,
    });
    expect(status).toBe(201);

    const response = await request.getBooks({
<<<<<<< HEAD
      queryParams: { titleContains: "potter" },
=======
      queryParams: { inTitle: "potter" },
>>>>>>> cb1a7aa (improve test and show cases)
    });
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject([harryPotterBook]);
  });

  it("gets a book from it's title", async () => {
    const supertestRequest = supertest(createBookApp());
    const request = createSupertestSharedClient(bookRoutes, supertestRequest);

    const response = await request.getBookById({
      urlParams: { id: "001" },
    });
    expectToEqual(response.body, theHobbitBook);
    expect(response.status).toBe(200);
  });
});
