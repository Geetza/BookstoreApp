import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import {
  getOneBook,
  updateBook,
  createBook,
} from "../../services/booksService";
import Spinner from "../Spinner";
import { getPublishers } from "../../services/publishersService";
import { getAuthors } from "../../services/authorsService";

const BookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const authorsData = await getAuthors(1, 30);
        const publishersData = await getPublishers();
        setAuthors(authorsData.items);
        setPublishers(publishersData);
      } catch (err) {
        setError("We couldn't load authors or publishers. Please try again.");
      }
      setLoading(false);
    };

    loadData();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      authorId: "",
      publisherId: "",
      pageCount: "",
      publishedDate: "",
      isbn: "",
    },
  });

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const loadBook = async () => {
      if (id) {
        try {
          const book = await getOneBook(id);
          reset({
            title: book.title,
            authorId: book.authorId,
            publisherId: book.publisherId,
            pageCount: book.pageCount,
            publishedDate: formatDateForInput(book.publishedDate),
            isbn: book.isbn,
          });
        } catch (error) {
          setError(
            "We couldn't load the book right now. Please try again in a moment"
          );
        }
        setLoading(false);
      } else {
        reset({
          title: "",
          authorId: "",
          publisherId: "",
          pageCount: "",
          publishedDate: "",
          isbn: "",
        });
      }
    };

    loadBook();
  }, [id, reset]);

  const onSubmit = async (book) => {
    //setLoading(true);
    try {
      if (id) {
        const bookToUpdate = { ...book, id: Number(id) };
        await updateBook(bookToUpdate);
      } else {
        await createBook(book);
      }
      navigate("/books");
    } catch (err) {
      setError(
        "Oops! Something went wrong while saving the book. Give it another shot"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="book-form-container">
      {error && <p className="error-span show">{error}</p>}
      <h2 className="form-title">{id ? "Edit Book" : "Add Book"}</h2>

      <form className="book-form" onSubmit={handleSubmit(onSubmit)}>
        <label>
          Title:
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            placeholder="Book Title"
          />
          <span className={`error-msg ${errors.title ? "show" : ""}`}>
            {errors.title?.message}
          </span>
        </label>

        <label>
          Author:
          <select
            {...register("authorId", {
              required: "Author selection is required",
              valueAsNumber: true,
            })}
          >
            <option value="">Select Author</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.fullName}
              </option>
            ))}
          </select>
          <span className={`error-msg ${errors.authorId ? "show" : ""}`}>
            {errors.authorId?.message}
          </span>
        </label>

        <label>
          Publisher:
          <select
            {...register("publisherId", {
              required: "Publisher selection is required",
              valueAsNumber: true,
            })}
          >
            <option value="">Select Publisher</option>
            {publishers.map((publisher) => (
              <option key={publisher.id} value={publisher.id}>
                {publisher.name}
              </option>
            ))}
          </select>
          <span className={`error-msg ${errors.publisherId ? "show" : ""}`}>
            {errors.publisherId?.message}
          </span>
        </label>

        <label>
          Page Count:
          <input
            type="number"
            {...register("pageCount", {
              required: "Page count is required",
              min: { value: 1, message: "Minimum page count is 1" },
            })}
          />
          <span className={`error-msg ${errors.pageCount ? "show" : ""}`}>
            {errors.pageCount?.message}
          </span>
        </label>

        <label>
          Published Date:
          <input
            type="date"
            {...register("publishedDate", {
              required: "Published date is required",
            })}
          />
          <span className={`error-msg ${errors.publishedDate ? "show" : ""}`}>
            {errors.publishedDate?.message}
          </span>
        </label>

        <label>
          ISBN:
          <input
            type="text"
            {...register("isbn", { required: "ISBN is required" })}
            placeholder="ISBN"
          />
          <span className={`error-msg ${errors.isbn ? "show" : ""}`}>
            {errors.isbn?.message}
          </span>
        </label>

        <div className="btn-container">
          <button className="normal-btn" type="submit">
            {id ? "Save" : "Add"}
          </button>
          <button
            className="normal-btn"
            type="button"
            onClick={() => navigate("/books")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
