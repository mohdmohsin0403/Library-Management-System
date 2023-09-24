import React from 'react';
import './home.css'; // Import your CSS file for styling
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="homepage">
      <header>
        <h1>Welcome to the Library</h1>
        <p>Explore a World of Knowledge</p>
      </header>
      <main>
        <p>Discover a vast collection of books in our library.</p>
        <Link to="/login" className="cta-button">Login</Link> {/* Link to the login page */}
        <Link to="/signup" className="cta-button">Signup</Link> {/* Link to the signup page */}
        {/* Add more content, book listings, and features here */}
      </main>
      <footer>
        <p>&copy; Library Management by Mohsin</p>
      </footer>
    </div>
  );
}

export default Home;
