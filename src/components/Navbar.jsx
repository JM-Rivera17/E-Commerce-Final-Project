import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, User, Menu, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Navbar = () => {
  const { cart, currentUser, logout } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      navigate(`/games?search=${searchTerm}`);
      setSearchTerm('');
    }
  };

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'GAMES', path: '/games' },
    { name: 'WISHLIST', path: '/wishlist' },
    { name: 'ABOUT', path: '/about' },
  ];

  const userNavLinks = [
    ...navLinks,
    { name: 'MY ORDERS', path: '/my-orders' },
  ];

  const displayLinks = currentUser ? userNavLinks : navLinks;

  return (
    <nav className="bg-saturn-dark/80 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3 group">
              <img src="/images/SATURN_Logo2.png" alt="SATURN" className="w-10 h-10 object-contain group-hover:scale-110 transition-transform" />
              <span className="font-rajdhani font-bold text-2xl tracking-tighter text-white">SATURN</span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              {location.pathname !== '/admin' && displayLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`nav-link ${location.pathname === link.path ? 'nav-link-active' : ''}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {location.pathname !== '/admin' && (
              <>
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Search games..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleSearch}
                    className="bg-white/5 border border-white/10 rounded-full px-4 py-2 pl-10 text-sm focus:outline-none focus:border-saturn-accent w-64 transition-all"
                  />
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-white/40 group-focus-within:text-saturn-accent" />
                </div>

                <Link to="/cart" className="relative p-2 text-white/70 hover:text-saturn-accent transition-colors">
                  <ShoppingCart className="w-6 h-6" />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-saturn-accent text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </Link>
              </>
            )}

            {currentUser ? (
              <div className="flex items-center gap-4">
                {currentUser.role === 'admin' && (
                  <button 
                    onClick={() => navigate('/admin')}
                    className="text-[10px] font-black bg-white/5 border border-white/10 px-3 py-1.5 rounded hover:bg-saturn-accent hover:text-black transition-all tracking-[0.2em] uppercase cursor-pointer relative z-10 hover:scale-105"
                  >
                    Admin Panel
                  </button>
                )}
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black text-saturn-accent tracking-[0.2em] uppercase leading-none">Commander</span>
                  <span className="text-sm font-bold font-rajdhani text-white leading-none mt-1">{currentUser.name.toUpperCase()}</span>
                </div>
                <button 
                  onClick={logout}
                  className="p-2 text-white/40 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn-primary text-sm py-1.5 px-6">
                Log In
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center gap-4">
            <Link to="/cart" className="relative p-2">
              <ShoppingCart className="w-5 h-5 text-white/70" />
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-saturn-card border-b border-white/10 px-4 pt-2 pb-6 flex flex-col gap-4">
          {displayLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-white/70 px-4 py-2 hover:bg-white/5 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/login" className="btn-primary text-center mx-4 mt-2">
            Log In
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
