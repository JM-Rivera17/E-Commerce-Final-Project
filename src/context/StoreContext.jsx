import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { games as initialGames } from '../data/games';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [games, setGames] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('saturn_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('saturn_session_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  // =========================================
  // INITIAL DATA LOAD
  // =========================================
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      await Promise.all([
        loadGames(),
        loadUsers(),
        loadOrders(),
      ]);
      if (currentUser) {
        await loadCart(currentUser.id);
      }
      setLoading(false);
    };
    initializeData();
  }, []);

  // Sync wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('saturn_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Sync session to localStorage
  useEffect(() => {
    localStorage.setItem('saturn_session_user', JSON.stringify(currentUser));
    if (currentUser) {
      loadCart(currentUser.id);
      loadOrders();
    } else {
      setCart([]);
    }
  }, [currentUser]);

  // =========================================
  // DATABASE LOADERS
  // =========================================
  const loadGames = async () => {
    const { data, error } = await supabase.from('games').select('*').order('created_at', { ascending: true });
    if (error) { console.error('Error loading games:', error); return; }

    // Seed initial games if empty
    if (data.length === 0) {
      const gamesToInsert = initialGames.map(g => ({
        title: g.title,
        description: g.description,
        price: g.price,
        image: g.image,
        category: g.category,
        is_free: g.isFree || false
      }));
      const { data: seeded } = await supabase.from('games').insert(gamesToInsert).select();
      setGames(seeded || []);
    } else {
      setGames(data);
    }
  };

  const loadUsers = async () => {
    const { data, error } = await supabase.from('users').select('*');
    if (error) { console.error('Error loading users:', error); return; }
    setUsers(data || []);
  };

  const loadOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .order('date', { ascending: false });
    if (error) { console.error('Error loading orders:', error); return; }
    // Map the data to match our existing order format
    const mapped = (data || []).map(order => ({
      ...order,
      userId: order.user_id,
      customerName: order.customer_name,
      customerEmail: order.customer_email,
      items: order.order_items || []
    }));
    setOrders(mapped);
  };

  const loadCart = async (userId) => {
    if (!userId) return;
    const { data, error } = await supabase.from('cart_items').select('*').eq('user_id', userId);
    if (error) { console.error('Error loading cart:', error); return; }
    // Map to match existing cart format
    const mapped = (data || []).map(item => ({
      id: item.game_id,
      title: item.title,
      price: parseFloat(item.price),
      image: item.image,
      cartItemId: item.id
    }));
    setCart(mapped);
  };

  // =========================================
  // AUTHENTICATION
  // =========================================
  const register = async (userData) => {
    const { data: existing } = await supabase.from('users').select('id').eq('email', userData.email).single();
    if (existing) return { success: false, message: 'Email already registered' };

    const { data, error } = await supabase.from('users').insert([{
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: 'user'
    }]).select().single();

    if (error) return { success: false, message: 'Registration failed. Try again.' };
    await loadUsers();
    return { success: true, message: 'Registration successful' };
  };

  const userLogin = async (email, password) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .single();

    if (error || !data) return { success: false, message: 'Invalid email or password' };
    if (data.role !== 'user') return { success: false, message: 'Access denied. This portal is for users only.' };

    setCurrentUser(data);
    return { success: true, user: data };
  };

  const adminLogin = async (email, password) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .single();

    if (error || !data) return { success: false, message: 'Invalid email or password' };
    if (data.role !== 'admin') return { success: false, message: 'Access denied. Not an administrator account.' };

    setCurrentUser(data);
    return { success: true, user: data };
  };

  const logout = () => {
    setCurrentUser(null);
    setCart([]);
    localStorage.removeItem('saturn_session_user');
  };

  // =========================================
  // ADMIN - GAME MANAGEMENT
  // =========================================
  const addGame = async (gameData) => {
    const { data, error } = await supabase.from('games').insert([{
      title: gameData.title,
      description: gameData.description,
      price: parseFloat(gameData.price),
      image: gameData.image,
      category: gameData.category,
      is_free: gameData.isFree || false
    }]).select().single();

    if (error) { console.error('Error adding game:', error); return null; }
    setGames(prev => [...prev, data]);
    return data;
  };

  const updateGame = async (id, updatedData) => {
    const { data, error } = await supabase.from('games').update({
      title: updatedData.title,
      price: parseFloat(updatedData.price),
      category: updatedData.category,
      image: updatedData.image,
      description: updatedData.description
    }).eq('id', id).select().single();

    if (error) { console.error('Error updating game:', error); return; }
    setGames(prev => prev.map(g => g.id === id ? data : g));
  };

  const deleteGame = async (id) => {
    const { error } = await supabase.from('games').delete().eq('id', id);
    if (error) { console.error('Error deleting game:', error); return; }
    setGames(prev => prev.filter(g => g.id !== id));
  };

  // =========================================
  // CART MANAGEMENT
  // =========================================
  const addToCart = async (game) => {
    if (!currentUser) return false;
    const alreadyInCart = cart.find(item => item.id === game.id);
    if (alreadyInCart) return false;

    const { data, error } = await supabase.from('cart_items').insert([{
      user_id: currentUser.id,
      game_id: String(game.id),
      title: game.title,
      price: game.price,
      image: game.image
    }]).select().single();

    if (error) { console.error('Error adding to cart:', error); return false; }

    setCart(prev => [...prev, {
      id: game.id,
      title: game.title,
      price: parseFloat(game.price),
      image: game.image,
      cartItemId: data.id
    }]);
    return true;
  };

  const removeFromCart = async (gameId) => {
    if (!currentUser) return;
    const item = cart.find(i => i.id === gameId);
    if (!item) return;

    await supabase.from('cart_items').delete().eq('user_id', currentUser.id).eq('game_id', String(gameId));
    setCart(prev => prev.filter(i => i.id !== gameId));
  };

  const clearCart = async () => {
    if (!currentUser) return;
    await supabase.from('cart_items').delete().eq('user_id', currentUser.id);
    setCart([]);
  };

  // =========================================
  // WISHLIST (stays local for speed)
  // =========================================
  const toggleWishlist = (game) => {
    setWishlist(prev => {
      if (prev.find(item => item.id === game.id)) {
        return prev.filter(item => item.id !== game.id);
      }
      return [...prev, game];
    });
  };

  // =========================================
  // ORDERS
  // =========================================
  const createOrder = async (orderData) => {
    const total = cart.reduce((s, i) => s + i.price, 0);

    // Insert order
    const { data: newOrder, error: orderError } = await supabase.from('orders').insert([{
      user_id: currentUser?.id,
      customer_name: orderData.customerName,
      customer_email: orderData.customerEmail,
      method: orderData.method,
      status: 'completed',
      total: total
    }]).select().single();

    if (orderError) { console.error('Error creating order:', orderError); return null; }

    // Insert order items
    const items = cart.map(item => ({
      order_id: newOrder.id,
      game_id: String(item.id),
      title: item.title,
      price: item.price,
      image: item.image
    }));
    await supabase.from('order_items').insert(items);

    // Clear cart
    await clearCart();

    // Refresh orders
    await loadOrders();

    // Return order with items for receipt
    const finalOrder = {
      ...newOrder,
      id: newOrder.id,
      userId: newOrder.user_id,
      customerName: newOrder.customer_name,
      customerEmail: newOrder.customer_email,
      total: newOrder.total,
      date: newOrder.date,
      items: cart.map(i => ({ title: i.title, price: i.price, image: i.image }))
    };
    return finalOrder;
  };

  return (
    <StoreContext.Provider value={{
      games,
      users,
      currentUser,
      cart,
      orders,
      wishlist,
      loading,
      register,
      userLogin,
      adminLogin,
      logout,
      addGame,
      updateGame,
      deleteGame,
      addToCart,
      removeFromCart,
      clearCart,
      toggleWishlist,
      createOrder
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
