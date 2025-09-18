import React from "react";

const BookRow = ({
  title,
  author,
  publisher,
  pageCount,
  publishedDate,
  isbn,
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
    </tr>
  );
};

export default BookRow;
