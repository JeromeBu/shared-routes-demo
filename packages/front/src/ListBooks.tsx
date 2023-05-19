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
      <section className="app__block list-books">
        <div className="list-books__search-filter">
          <label htmlFor="search-in-title" className="add-book-form__label">
            Search in title :
          </label>
          <input
            type="text"
            name="search-in-title"
            className="input"
            value={searchInTitle}
            onChange={(e) => setSearchInTitle(e.target.value)}
            placeholder="E.g. The lord of the rings"
          />
        </div>
        <div className="books">
          {books.length > 0
            ? books.map((book) => (
                <div key={book.title} className="book-card">
                  <h2 className="book-card__title">{book.title}</h2>
                  <div className="book-card__description">
                    <p>{book.author}</p>
                    <p>{book.numberOfPages} pages</p>
                  </div>
                </div>
              ))
            : "No books yet !"}
        </div>
      </section>
    </>
  );
};

const AddBookForm = ({ refetchData }: { refetchData: () => void }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [numberOfPages, setNumberOfPages] = useState(200);

  return (
    <section className="app__block">
      <form
        className="add-book-form"
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
        <div className="add-book-form__row">
          <label htmlFor="title" className="add-book-form__label">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="input"
            placeholder="E.g. The lord of the rings"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="add-book-form__row">
          <label htmlFor="author" className="add-book-form__label">
            Author
          </label>
          <input
            type="text"
            name="author"
            placeholder="E.g. Tolkien"
            className="input"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="add-book-form__row">
          <label htmlFor="author" className="add-book-form__label">
            Number of pages
          </label>
          <input
            type="number"
            className="input"
            name="numberOfPages"
            value={numberOfPages}
            onChange={(e) => setNumberOfPages(parseInt(e.target.value, 10))}
          />
        </div>
        <button type="submit" className="add-book-form__submit">
          Add book
        </button>
      </form>
    </section>
  );
};
