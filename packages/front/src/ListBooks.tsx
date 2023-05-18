import { useEffect, useState } from "react";
import { Book } from "routes";
import { bookRoutes } from "routes";
// import { createAxiosSharedClient } from "shared-routes/axios";
import { createFetchSharedClient } from "shared-routes/fetch";

// const axiosInstance = axios.create({ baseURL: "/api" });
// const httpClient = createAxiosSharedClient(bookRoutes, axiosInstance);

const httpClient = createFetchSharedClient(bookRoutes, fetch, {
  baseURL: "/api",
});

export const ListBooks = () => {
  const [orderBy, setOrderBy] = useState<"title" | "author">("author");
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = () =>
    httpClient
      .getBooks({
        queryParams: { orderBy },
      })
      .then((response) => {
        setBooks(response.body);
      });

  useEffect(() => {
    fetchBooks();
  }, [orderBy]);

  return (
    <>
      <AddBookForm refetchData={fetchBooks} />
      <hr />
      <label htmlFor="orderBy">Order by</label>
      <select
        name="orderBy"
        id="orderBy"
        defaultValue="author"
        onChange={(e) => setOrderBy(e.target.value as "title" | "author")}
      >
        <option value="author">Author</option>
        <option value="title">Title</option>
      </select>

      <div className="books">
        {books.length > 0
          ? books.map((book) => (
              <div key={book.title} className="book-card">
                <h2>{book.title}</h2>
                <p>{book.author}</p>
                <p>{book.numberOfPages} pages</p>
              </div>
            ))
          : "No books yet !"}
      </div>
    </>
  );
};

const AddBookForm = ({ refetchData }: { refetchData: () => void }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [numberOfPages, setNumberOfPages] = useState(0);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const book: Book = { title, author, numberOfPages };
        if (!book.title || !book.author || !book.numberOfPages) return;
        await httpClient.addBook({
          body: book,
        });
        setTitle("");
        setAuthor("");
        setNumberOfPages(0);

        refetchData();
      }}
    >
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <input
          type="text"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="author">Nombre de pages</label>
        <input
          type="number"
          name="numberOfPages"
          value={numberOfPages}
          onChange={(e) => setNumberOfPages(parseInt(e.target.value, 10))}
        />
      </div>
      <button type="submit">Add book</button>
    </form>
  );
};
