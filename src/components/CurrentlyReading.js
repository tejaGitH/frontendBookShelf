// // CurrentlyReading.js
// import React, { useEffect, useRef, useCallback } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCurrentBooks, updateReadingProgress } from '../actions/bookActions';

// const CurrentlyReading = () => {
//   const dispatch = useDispatch();
//   const requestSent = useRef(false); // Ref to track request state

//   const { currentlyReading = [], loading, error } = useSelector((state) => state.books);

//   const fetchBooks = useCallback(() => {
//     dispatch(fetchCurrentBooks())
//       .then((response) => {
//         if (response.length > 0) {
//           requestSent.current = true;
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, [dispatch]);
  
//   // useEffect(() => {
//   //   if (!requestSent.current) {
//   //     fetchBooks();
//   //   }
//   // }, [fetchBooks, requestSent.current]);
//   useEffect(() => {
//     if (!requestSent.current) {
//       dispatch(fetchCurrentBooks())
//         .then((response) => {
//           if (response.length === 0) {
//             // Return a value or throw an error when the response array is empty
//             return;
//           }
//           requestSent.current = true;
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     }
//   }, [dispatch]);
  

//   const handleUpdateProgress = (bookId, progress, comments) => {
//     dispatch(updateReadingProgress({ bookId, progress, comments }));
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message || error}</div>;

//   return (
//     <div>
//       <h2>Currently Reading</h2>
//       {currentlyReading.length > 0 ? (
//         currentlyReading.map(book => (
//           <div key={book._id}>
//             <h3>{book.title}</h3>
//             <button onClick={() => handleUpdateProgress(book._id, 100, 'Finished reading!')}>
//               I've finished
//             </button>
//             {/* Add progress update form or button */}
//           </div>
//         ))
//       ) : (
//         <p>No books currently being read.</p>
//       )}
//     </div>
//   );
// };

// export default CurrentlyReading;
