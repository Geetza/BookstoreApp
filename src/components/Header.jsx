import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/authors">Authors</Link>
        <Link to="/publishers">Publishers</Link>
        <Link to="/books">Books</Link>
        <Link to="/books/add">Create book</Link>
      </nav>
    </header>
  );
};

export default Header;
