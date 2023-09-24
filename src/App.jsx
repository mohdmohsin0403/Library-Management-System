import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'; // Import from react-router-dom
import Home from './components/Home/home.jsx';
import Login from './components/Login/login.jsx'; // Import the Login component
import Signup from './components/Login/signup.jsx'; // Import the Signup component
import Logout from './components/Login/logout.jsx'; // Import the Logout component
import Books from './components/Books/book.jsx';
import Cart from './components/Books/Cart.jsx';
import { CartProvider  } from './components/Books/DataContext';

function App() {
  return (
    <>
      <div>
      <React.StrictMode>
        
        <Router>
          <CartProvider>
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route path="/login" element={<Login/>} /> {/* Add the login route */}
              <Route path="/signup" element={<Signup/>} /> {/* Add the signup route */}
              <Route path="/logout" element={<Logout/>} /> {/* Add the logout route */}
              <Route path="/book" element={<Books/>}/>
              <Route path="/cart" element={<Cart/>}/>
            </Routes>
          </CartProvider>
        </Router>
        
      </React.StrictMode>
      </div>
    </>
  )
}

export default App
