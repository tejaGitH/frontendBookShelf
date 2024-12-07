import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentBooks, updateReadingProgress, markBookAsFinished } from '../../actions/bookActions';


const CurrentlyReading = () => {
  const dispatch = useDispatch();
  const [fetchData, setFetchData] = useState(false);
  const { currentlyReading, loading, error } = useSelector((state) => state.books);
  useEffect(() => {
    if (!currentlyReading.length && !loading) {
      dispatch(fetchCurrentBooks())
        .catch((error) => {
          console.error(error);
        });
    }
  }, [dispatch, currentlyReading, loading]);

  const handleUpdateProgress = useCallback((bookId, progress, comments) => {
    dispatch(updateReadingProgress({ bookId, progress, comments }));
  }, [dispatch]);

  const handleMarkAsFinished = useCallback((bookId) => {
    dispatch(markBookAsFinished(bookId))
      .then(() => {
        dispatch(fetchCurrentBooks());
      });
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message || error}</div>;

  return (
    <div>
    <h2>Currently Reading</h2>
    {currentlyReading.length > 0 ? (
        currentlyReading.map(book => (
            <div key={book._id}>
                <h3>{book.title}</h3>
                <img src={book.image || '/images/default-book-image.jpg'} alt={book.title} width="50" />
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const progress = e.target.progress.value;
                        const comments = e.target.comments.value;
                        handleUpdateProgress(book._id, progress, comments);
                    }}
                >
                    <label>
                        Progress (%):
                        <input type="number" name="progress" min="0" max="100" required />
                    </label>
                    <label>
                        Comments:
                        <textarea name="comments"></textarea>
                    </label>
                    <button type="submit">Update Progress</button>
                </form>
                <button onClick={() => handleMarkAsFinished(book._id)}>Mark as Finished</button>
            </div>
        ))
    ) : (
        <p>No books currently being read.</p>
    )}
</div>
   
  );
};

export default CurrentlyReading;