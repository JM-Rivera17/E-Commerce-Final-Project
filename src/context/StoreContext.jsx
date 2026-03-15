import React, { createContext, useContext, useState, useEffect } from 'react';
import { games as initialGames } from '../data/games';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  // --- DATABASE SIMULATION (LocalStorage) ---
  
  // Games Data
  const [games, setGames] = useState(() => {
    const saved = localStorage.getItem('saturn_db_games');
    return saved ? JSON.parse(saved) : initialGames;
  });

  // Users Database
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('saturn_db_users');
    let dbUsers = saved ? JSON.parse(saved) : [];
    
    // Explicitly guarantee an admin account exists and has the correct name
    const adminIndex = dbUsers.findIndex(u => u.email === 'admin@saturn.com');
    if (adminIndex === -1) {
      dbUsers.push({
        id: 'admin-1',
        name: 'Admin',
        email: 'admin@saturn.com',
        password: 'admin',
        role: 'admin'
      });
    } else {
      // Update existing admin name if it's different
      dbUsers[adminIndex].name = 'Admin';
    }
    localStorage.setItem('saturn_db_users', JSON.stringify(dbUsers));
    return dbUsers;
  });

  // Current Logged In User
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('saturn_session_user');
    let user = saved ? JSON.parse(saved) : null;
    // Update name in session if it's the admin
    if (user && user.email === 'admin@saturn.com') {
      user.name = 'Admin';
    }
    return user;
  });

  // Cart & Wishlist (Shared across sessions for simplicity, or could be linked to user)
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('saturn_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('saturn_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('saturn_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Persistence Sync
  useEffect(() => {
    localStorage.setItem('saturn_db_games', JSON.stringify(games));
    localStorage.setItem('saturn_db_users', JSON.stringify(users));
    localStorage.setItem('saturn_session_user', JSON.stringify(currentUser));
    localStorage.setItem('saturn_cart', JSON.stringify(cart));
    localStorage.setItem('saturn_wishlist', JSON.stringify(wishlist));
    localStorage.setItem('saturn_orders', JSON.stringify(orders));
  }, [games, users, currentUser, cart, wishlist, orders]);

  // --- AUTHENTICATION LOGIC ---

  const register = (userData) => {
    const userExists = users.find(u => u.email === userData.email);
    if (userExists) return { success: false, message: 'Email already registered' };
    
    const newUser = { ...userData, id: Date.now(), role: 'user' };
    setUsers([...users, newUser]);
    return { success: true, message: 'Registration successful' };
  };

  const userLogin = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return { success: false, message: 'Invalid email or password' };
    if (user.role !== 'user') return { success: false, message: 'Access denied. This portal is for users only.' };
    
    setCurrentUser(user);
    return { success: true, user };
  };

  const adminLogin = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return { success: false, message: 'Invalid email or password' };
    if (user.role !== 'admin') return { success: false, message: 'Access denied. Not an administrator account.' };
    
    setCurrentUser(user);
    return { success: true, user };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // --- ADMIN LOGIC ---

  const addGame = (gameData) => {
    const newGame = { ...gameData, id: Date.now() };
    setGames([...games, newGame]);
    return newGame;
  };

  const updateGame = (id, updatedData) => {
    setGames(games.map(g => g.id === id ? { ...g, ...updatedData } : g));
  };

  const deleteGame = (id) => {
    setGames(games.filter(g => g.id !== id));
  };

  // --- STORE LOGIC ---

  const addToCart = (game) => {
    let status = false;
    setCart((prev) => {
      if (prev.find(item => item.id === game.id)) {
        status = false;
        return prev;
      }
      status = true;
      return [...prev, { ...game, quantity: 1 }];
    });
    return status;
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter(item => item.id !== id));
  };

  const toggleWishlist = (game) => {
    setWishlist((prev) => {
      if (prev.find(item => item.id === game.id)) {
        return prev.filter(item => item.id !== game.id);
      }
      return [...prev, game];
    });
  };

  const createOrder = (orderData) => {
    const newOrder = {
      id: Date.now(),
      userId: currentUser?.id,
      items: [...cart],
      total: cart.reduce((s, i) => s + i.price, 0),
      date: new Date().toISOString(),
      ...orderData
    };
    setOrders(prev => [...prev, newOrder]);
    setCart([]);
    return newOrder;
  };

  return (
    <StoreContext.Provider value={{ 
      games, 
      users,
      currentUser,
      cart, 
      orders, 
      wishlist,
      register,
      userLogin,
      adminLogin,
      logout,
      addGame,
      updateGame,
      deleteGame,
      addToCart, 
      removeFromCart, 
      toggleWishlist,
      createOrder 
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
