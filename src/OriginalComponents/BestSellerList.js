import React from 'react';

// const BestSellersList = ({ bestSellers }) => {
//     console.log(bestSellers);  // Ensure bestSellers is populated
//     return (
//       <div>
//         {bestSellers && bestSellers.length > 0 ? (
//           <ul>
//             {bestSellers.map((book) => (
//               <li key={book.primary_isbn13}>
//                 <h3>{book.title}</h3>
//                 <p>{book.author}</p>
//                 <p>{book.description}</p>
//                 <img src={book.book_image} alt={book.title} width={100} />
//                 <a href={book.amazon_product_url} target="_blank" rel="noopener noreferrer">
//                   Buy on Amazon
//                 </a>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No bestsellers available.</p>
//         )}
//       </div>
//     );
//   };

// export default BestSellersList;


const BestSellersList = ({ bestSellers }) => {
    return (
      <div className="best-sellers-list">
        <ul>
          {bestSellers.map((book) => (
            <li key={book.primary_isbn13} className="book-item">
              <img src={book.book_image} alt={book.title} className="book-image" />
              <div className="book-details">
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <p>{book.description}</p>
                <a href={book.amazon_product_url} target="_blank" rel="noopener noreferrer">
                  Buy on Amazon
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default BestSellersList;