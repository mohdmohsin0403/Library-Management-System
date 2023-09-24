import React, { useState, useEffect, useRef, useContext } from 'react';
import './book.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Sidebar';
import { useCart } from './DataContext';

// Function to shuffle an array randomly
function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function Books() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null); // Track the selected book
  const [sortOption, setSortOption] = useState('Title'); // Default sorting option
  const [loading, setLoading] = useState(false); // To track if more books are being loaded
  const [page, setPage] = useState(1); // Current page of loaded books
  const [loadMore, setLoadMore] = useState(false); // To trigger loading more books
  const bookListRef = useRef(null); // Reference to the book list container
  const { cart, addToCart } = useCart();

  const handleAddToCart = (book) => {
    addToCart(book); // Add the book to the cart using addToCart function from context
    console.log(book);
  };

  useEffect(() => {
    fetchBooks();
    window.addEventListener('scroll', handleScroll); // Add a scroll event listener
    return () => {
      window.removeEventListener('scroll', handleScroll); // Remove the event listener on unmount
    };
  }, [searchQuery, sortOption]);

  useEffect(() => {
    // If loadMore is true, load 10 more books
    if (loadMore) {
      fetchBooks(); // Fetch more books
      setLoadMore(false);
    }
  }, [loadMore]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const startIndex = (page - 1) * 10;
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchQuery === '' ? 'programming' : searchQuery}&startIndex=${startIndex}&maxResults=10`
      );

      const shuffledBooks = shuffleArray(response.data.items || []);
      let sortedBooks = [...shuffledBooks];

      if (sortOption === 'Title') {
        sortedBooks = sortedBooks.sort((a, b) =>
          a.volumeInfo.title.localeCompare(b.volumeInfo.title)
        );
      } else if (sortOption === 'Author') {
        sortedBooks = sortedBooks.sort((a, b) =>
          a.volumeInfo.authors?.[0].localeCompare(b.volumeInfo.authors?.[0])
        );
      }

      if (page === 1) {
        setBooks(sortedBooks);
      } else {
        setBooks((prevBooks) => [...prevBooks , ...shuffledBooks.slice(-10)]);
      }

      setPage((prevPage) => prevPage + 1); // Increment the page
      setLoading(false);
      setLoadMore(false);
    } catch (error) {
      console.error('Error fetching books:', error.message);
      setLoading(false);
    }
  };

  // Scroll event handler to load more books when scrolled to the bottom
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight 
    ) {
      setLoadMore(true);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const showBookDescription = (book) => {
    setSelectedBook(book);
  };

  return (
    <div className="books-container">
      <button className="sidebar-toggle-button" onClick={toggleSidebar}>
        &#8285;
      </button>

      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <h2>Sidebar</h2>
        <ul>
          <li>
            <Link to={{ pathname: '/cart', state: { cart: cart } }}>Cart</Link>
          </li>
          <li>
            <Link to="/">Logout</Link>
          </li>
        </ul>
      </div>

      <h2 className="books-heading">Discover Books</h2>
      <input
        type="text"
        placeholder="Search for books (e.g., programming)"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="sort-select"
      >
        <option value="Title">Sort by Title</option>
        <option value="Author">Sort by Author</option>
      </select>
      <div ref={bookListRef} className="books-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <img
              className="book-cover"
              src={
                book.volumeInfo.imageLinks?.thumbnail ||
                'https://via.placeholder.com/128x192.png?text=No+Image'
              }
              alt={book.volumeInfo.title}
              onClick={() => showBookDescription(book)} // Click to show description
            />
            <div className="book-details">
              <h3 className="book-title">{book.volumeInfo.title}</h3>
              <p className="book-author">
                Author: {book.volumeInfo.authors?.join(', ')}
              </p>
              <p className="book-info">
                Genre: {book.volumeInfo.categories?.join(', ') || 'N/A'},
                Year: {book.volumeInfo.publishedDate || 'N/A'}
              </p>
              <p className="book-availability">
                {book.saleInfo?.saleability === 'FOR_SALE' ? (
                  <span className="in-stock">
                    In Stock
                    <br />
                    <button onClick={() => handleAddToCart(book)}>Add to Cart</button>
                  </span>
                ) : (
                  <span className="out-of-stock">Out of Stock</span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>

      {loading && <p>Loading more books...</p>}

      {selectedBook && (
        <div className="book-description">
          <h3>{selectedBook.volumeInfo.title}</h3>
          <p>{selectedBook.volumeInfo.description || 'No description available.'}</p>
          <button onClick={() => setSelectedBook(null)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default Books;
