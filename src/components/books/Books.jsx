import React, { useEffect } from "react";
import { useState } from "react";
import { getBooks, deleteBook } from "../../services/booksService";
import BookRow from "../books/BookRow";
import Spinner from "../Spinner";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (err) {
      setError("We couldn't fetch the books right now. Please try again.");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteBook(id);
      setBooks((books) => books.filter((book) => book.id !== id));
    } catch (err) {
      setError("Oops! We couldn't remove this book. Please try again.");
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <BookRow
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author?.fullName}
                publisher={book.publisher?.name}
                pageCount={book.pageCount}
                publishedDate={book.publishedDate}
                isbn={book.isbn}
                onDelete={() => handleDelete(book.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Books;
