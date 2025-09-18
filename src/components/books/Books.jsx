import React, { useEffect } from "react";
import { useState } from "react";
import { getBooks } from "../../services/booksService";
import BookRow from "../books/BookRow";
import Spinner from "../Spinner";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadBooks = async () => {
    setLoading(true);
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (err) {
      setError("We couldn't fetch the books right now. Please try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="title-container">
        <h1>Books</h1>
      </div>
      <div className="error-container">
        {error && <span className="error-span show">{error}</span>}
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>Page Count</th>
              <th>Published Date</th>
              <th>ISBN</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <BookRow
                key={book.id}
                title={book.title}
                author={book.author?.fullName}
                publisher={book.publisher?.name}
                pageCount={book.pageCount}
                publishedDate={book.publishedDate}
                isbn={book.isbn}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Books;
