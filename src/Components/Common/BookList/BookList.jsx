// import React, { useContext } from "react";
// import { GlobalContext } from "../../../context/GlobalState";
// import Book from "../../Book/Book";
// import "./BookList.scss";

// function BookList({ category }) {
//     const { books } = useContext(GlobalContext);

//     return (
//         <section className="books">
//             <h2 className="books__category">{category}</h2>

//             <div className="books_row">
//                 {books.map((book, id) => (
//                     <Book key={id} book={book} />
//                 ))}
//             </div>
//         </section>
//     );
// }

// export default BookList;