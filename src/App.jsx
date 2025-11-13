import React from "react";
import "./styles/main.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Publishers from "./components/publishers/Publishers";
import Authors from "./components/authors/authors";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Books from "./components/books/Books";
import BookForm from "./components/books/BookForm";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/publishers" element={<Publishers />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/add" element={<BookForm />} />
          <Route path="/books/:id/edit" element={<BookForm />} />
          <Route path="/authors" element={<Authors />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
