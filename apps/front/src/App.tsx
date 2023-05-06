import "./App.css";
import axios from "axios";
import { useState } from "react";
import { createAxiosSharedClient } from "shared-routes-axios";
import { Book, bookRoutes } from "routes";
import SwaggerUI from "swagger-ui-react";
import { openApiSpec } from "./openApiSpec";

const axiosInstance = axios.create({});
const axiosSharedRoutes = createAxiosSharedClient(bookRoutes, axiosInstance);

type Mode = "listBooks" | "showOpenApiDocs";

const App = () => {
  const [mode, setMode] = useState<Mode>("listBooks");

  return (
    <>
      <h1>Shared routes demo</h1>
      <div>
        <button onClick={() => setMode("listBooks")}>List books</button>
        <button onClick={() => setMode("showOpenApiDocs")}>Show docs</button>
      </div>
      <div className="card">
        {mode === "listBooks" && <ListBooks />}
        {mode === "showOpenApiDocs" && <SwaggerUI spec={openApiSpec} />}
      </div>
    </>
  );
};

const ListBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const getBooks = async () => {
    const response = await axiosSharedRoutes.getBooks({
      queryParams: { orderBy: "author" },
    });
    setBooks(response.body);
  };

  return (
    <div>
      <button onClick={getBooks}>Get all books</button>

      {books.length > 0 && (
        <ul>
          {books.map((book) => (
            <li key={book.title}>
              {book.title} - {book.author} - {book.numberOfPages} pages
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
