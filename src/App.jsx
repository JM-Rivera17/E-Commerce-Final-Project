import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Games from './pages/Games';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Wishlist from './pages/Wishlist';
import About from './pages/About';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import { StoreProvider } from './context/StoreContext';

function App() {
  return (
    <StoreProvider>
      <Router>
        <div className="min-h-screen bg-saturn-dark text-white flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/games" element={<Games />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/about" element={<About />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin" element={<Admin />} />
              {/* Optional: Add a 404 page */}
              <Route path="*" element={
                <div className="flex flex-col items-center justify-center py-40">
                  <h1 className="text-9xl font-black text-white/5 absolute -z-10">404</h1>
                  <h2 className="text-4xl font-bold font-rajdhani mb-4">ORBIT LOST</h2>
                  <p className="text-white/40 mb-8">The page you're looking for has drifted into a black hole.</p>
                  <a href="/" className="btn-primary">Back to Station</a>
                </div>
              } />
            </Routes>
          </main>
          
          <footer className="bg-black/50 border-t border-white/5 py-12 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
                <div className="md:col-span-2">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
                    <span className="text-2xl">🪐</span>
                    <span className="font-rajdhani font-bold text-xl tracking-tighter">SATURN</span>
                  </div>
                  <p className="text-white/30 text-sm max-w-sm">
                    SATURN is the next-generation game store for enthusiasts. Discover, play, and connect in a premium ecosystem designed for gamers.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-6 uppercase tracking-widest text-white/70">Shop</h4>
                  <ul className="space-y-4 text-sm text-white/40">
                    <li><a href="#" className="hover:text-saturn-accent transition-colors">Trending</a></li>
                    <li><a href="#" className="hover:text-saturn-accent transition-colors">Bestsellers</a></li>
                    <li><a href="#" className="hover:text-saturn-accent transition-colors">Coming Soon</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-6 uppercase tracking-widest text-white/70">Support</h4>
                  <ul className="space-y-4 text-sm text-white/40">
                    <li><a href="#" className="hover:text-saturn-accent transition-colors">Help Center</a></li>
                    <li><a href="#" className="hover:text-saturn-accent transition-colors">Contact Us</a></li>
                    <li><a href="#" className="hover:text-saturn-accent transition-colors">Refund Policy</a></li>
                  </ul>
                </div>
              </div>
              <div className="h-px bg-white/5 my-12"></div>
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-white/20 uppercase tracking-[0.2em] font-bold">
                <p>© 2026 SATURN GAME STORE. ALL RIGHTS RESERVED.</p>
                <div className="flex gap-8">
                  <a href="#">Privacy</a>
                  <a href="#">Terms</a>
                  <a href="#">Cookies</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </StoreProvider>
  );
}

export default App;
