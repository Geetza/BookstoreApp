import React, { useEffect, useState } from "react";
import Spinner from "../Spinner";
import { getAuthors } from "../../services/authorsService";
import AuthorRow from "./AuthorRow";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(3);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadAuthors = async () => {
    setLoading(true);
    try {
      const data = await getAuthors(page, pageSize);
      setAuthors(data.items);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError("Authors are taking a coffee break ☕. Please try again");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadAuthors();
  }, [page]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="title-container">
        <h1>Authors</h1>
      </div>
      <div className="error-container">
        {error && <span className="error-span show">{error}</span>}
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Biography</th>
              <th>DateOfBirth</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author) => (
              <AuthorRow
                key={author.id}
                fullName={author.fullName}
                biography={author.biography}
                dateOfBirth={author.dateOfBirth}
              />
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </button>

          <span>
            {page} / {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Authors;
