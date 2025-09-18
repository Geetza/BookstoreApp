import React from "react";
import "./styles/main.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Publishers from "./components/Publishers";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Books from "./components/Books";
import BookForm from "./components/BookForm";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/publishers" element={<Publishers />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/bookForm" element={<BookForm />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
