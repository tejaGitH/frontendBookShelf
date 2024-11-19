// src/containers/BookshelfContainer.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "../actions/bookActions";
import Bookshelf from "../components/Bookshelf";

const BookshelfContainer = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return <Bookshelf books={books} loading={loading} error={error} />;
};

export default BookshelfContainer;