import React from "react";

const AuthorRow = ({ fullName, biography, dateOfBirth }) => {
  return (
    <tr className="table-row">
      <td>{fullName}</td>
      <td>{biography}</td>
      <td>{dateOfBirth}</td>
    </tr>
  );
};

export default AuthorRow;
