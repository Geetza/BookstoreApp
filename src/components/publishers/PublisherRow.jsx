import React from "react";

const PublisherRow = ({ name, address, website }) => {
  return (
    <tr className="table-row">
      <td>{name}</td>
      <td>{address}</td>
      <td>{website}</td>
    </tr>
  );
};

export default PublisherRow;
