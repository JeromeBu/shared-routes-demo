import { useEffect, useState } from "react";
import { Book } from "routes";
import { bookRoutes } from "routes";
import { createFetchSharedClient } from "shared-routes/fetch";

const httpClient = createFetchSharedClient(bookRoutes, fetch, {
  baseURL: "/api",
});

export const ListBooks = () => {
  const [searchInTitle, setSearchInTitle] = useState("");
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = () =>
    httpClient
      .getBooks({
        queryParams: { titleContains: searchInTitle },
      })
      .then((response) => {
        setBooks(response.body);
      });

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInTitle]);

  return (
    <>
      <AddBookForm refetchData={fetchBooks} />
      <hr />
      <label htmlFor="search-in-title">Search in title :</label>
      <input
        type="text"
        name="search-in-title"
        value={searchInTitle}
        onChange={(e) => setSearchInTitle(e.target.value)}
      />

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
        const book: Omit<Book, "id"> = { title, author, numberOfPages };
        if (!book.title || !book.author || !book.numberOfPages) return;
        await httpClient.addMyBook({
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
