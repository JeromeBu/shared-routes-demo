import axios from "axios";
import { useEffect, useState } from "react";
import { Book } from "routes";
import { bookRoutes } from "routes";
import { createAxiosSharedClient } from "shared-routes/axios";

const axiosInstance = axios.create({ baseURL: "/api" });
const axiosSharedRoutes = createAxiosSharedClient(bookRoutes, axiosInstance);

export const ListBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    axiosSharedRoutes
      .getBooks({
        queryParams: { orderBy: "title" },
      })
      .then((response) => {
        setBooks(response.body);
      });
  }, []);

  return (
    <div className="card">
      {books.length > 0 ? (
        <ul>
          {books.map((book) => (
            <li key={book.title}>
              {book.title} - {book.author} - {book.numberOfPages} pages
            </li>
          ))}
        </ul>
      ) : (
        "No books yet !"
      )}
    </div>
  );
};
