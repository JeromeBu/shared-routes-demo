import { Book, bookRoutes } from "routes";
import { createSupertestSharedClient } from "shared-routes/supertest";
import supertest from "supertest";
import { createBookApp } from "./createBookApp";
import { describe, it, expect } from "vitest";

const getSharedSupertestRequest = () => {
  const app = createBookApp();
  const supertestRequest = supertest(app);
  return createSupertestSharedClient(bookRoutes, supertestRequest);
};

const expectToEqual = <T>(actual: T, expected: T) => {
  expect(actual).toEqual(expected);
};

describe("bookApi", () => {
  it("get all books, than add a book, than the new book is in the list", async () => {
    const request = getSharedSupertestRequest();

    const initialResponse = await request.getBooks({
      queryParams: { orderBy: "title" },
    });

    expect(initialResponse.status).toBe(200);
    expectToEqual(initialResponse.body, []);

    const harryPotterBook: Book = {
      title: "Hary Potter and the Philosopher's Stone",
      author: "J.K. Rowling",
      numberOfPages: 223,
    };

    await request.addBook({
      body: harryPotterBook,
    });

    const { status, body } = await request.getBooks({
      queryParams: { orderBy: "title" },
    });
    expect(status).toBe(200);
    expectToEqual(body, [harryPotterBook]);
  });
});
