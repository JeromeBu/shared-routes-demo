import "./App.css";
import axios from "axios";
import { useState } from "react";
import { createAxiosSharedClient } from "shared-routes-axios";
import { Book, bookRoutes } from "routes";

const axiosInstance = axios.create({});
const axiosSharedRoutes = createAxiosSharedClient(bookRoutes, axiosInstance);

function App() {
  const [books, setBooks] = useState<Book[]>([]);

  const getBooks = async () => {
    const response = await axiosSharedRoutes.getBooks();
    setBooks(response.body);
  };

  return (
    <>
      <h1>Shared routes demo</h1>
      <div className="card">
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
    </>
  );
}

export default App;
