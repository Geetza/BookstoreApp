import React from "react";
import { Link } from "react-router-dom";

const BookRow = ({
  id,
  title,
  author,
  publisher,
  pageCount,
  publishedDate,
  isbn,
  onDelete,
}) => {
  const date = new Date(publishedDate);
  return (
    <tr className="table-row">
      <td>{title}</td>
      <td>{author}</td>
      <td>{publisher}</td>
      <td>{pageCount}</td>
      <td>{date.toLocaleDateString()}</td>
      <td>{isbn}</td>
      <td>
        <div className="btn-container">
          <Link to={`/books/edit/${id}`} className="edit-btn">
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
