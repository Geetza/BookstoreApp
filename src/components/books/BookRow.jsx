import React from "react";
import { Link } from "react-router-dom";

const BookRow = ({
  id,
  title,
  author,
  publisher,
  publishedDate,
  isbn,
  onDelete,
}) => {
  return (
    <tr className="table-row">
      <td>{title}</td>
      <td>{author}</td>
      <td>{publisher}</td>
      <td>{publishedDate} years</td>
      <td>{isbn}</td>
      <td>
        <div className="btn-container">
          <Link to={`/books/${id}/edit`} className="normal-btn">
            Edit
          </Link>
          <button className="delete-btn" onClick={onDelete}>
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BookRow;
