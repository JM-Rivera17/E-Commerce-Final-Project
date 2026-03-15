import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Edit2, Users, ShoppingBag, Gamepad2, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Admin = () => {
  const { games, users, orders, currentUser, addGame, deleteGame, updateGame } = useStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('games');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingGame, setEditingGame] = useState(null);
  const [newGame, setNewGame] = useState({
    title: '',
    price: '',
    category: 'trending',
    image: '/images/banner.jpg',
    description: ''
  });

  const handleAddGame = (e) => {
    e.preventDefault();
    addGame({
      ...newGame,
      price: parseFloat(newGame.price)
    });
    setShowAddModal(false);
    setNewGame({
      title: '',
      price: '',
      category: 'trending',
      image: '/images/banner.jpg',
      description: ''
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateGame(editingGame.id, {
      ...editingGame,
      price: parseFloat(editingGame.price)
    });
    setShowEditModal(false);
    setEditingGame(null);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete ${title}? This action is permanent.`)) {
      deleteGame(id);
    }
  };

  // Security check: Redirect if not admin
  React.useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      navigate('/admin-login');
    }
  }, [currentUser, navigate]);

  if (!currentUser || currentUser.role !== 'admin') return null;

  return (
    <div className="flex h-screen bg-[#08090d] relative overflow-hidden">
      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card w-full max-w-lg p-8 relative border-saturn-accent/20"
          >
            <button 
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold font-rajdhani mb-6 uppercase tracking-tighter">Initialize New Game Data</h2>
            
            <form onSubmit={handleAddGame} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Game Title</label>
                <input 
                  type="text" 
                  required
                  value={newGame.title}
                  onChange={(e) => setNewGame({...newGame, title: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-sm focus:border-saturn-accent outline-none text-white"
                  placeholder="e.g. Cyberpunk 2077"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Price (PHP)</label>
                  <input 
                    type="number" 
                    required
                    value={newGame.price}
                    onChange={(e) => setNewGame({...newGame, price: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-sm focus:border-saturn-accent outline-none text-white"
                    placeholder="1380"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Category</label>
                  <select 
                    value={newGame.category}
                    onChange={(e) => setNewGame({...newGame, category: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-sm focus:border-saturn-accent outline-none appearance-none text-white"
                  >
                    <option value="trending" className="bg-[#08090d]">TRENDING</option>
                    <option value="popular" className="bg-[#08090d]">POPULAR</option>
                    <option value="bestselling" className="bg-[#08090d]">BEST SELLING</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Image URL</label>
                <input 
                  type="text" 
                  required
                  value={newGame.image}
                  onChange={(e) => setNewGame({...newGame, image: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-sm focus:border-saturn-accent outline-none text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Small Description</label>
                <textarea 
                  required
                  value={newGame.description}
                  onChange={(e) => setNewGame({...newGame, description: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-sm focus:border-saturn-accent outline-none h-24 resize-none text-white"
                ></textarea>
              </div>

              <button type="submit" className="w-full bg-saturn-accent text-black font-black py-4 rounded text-xs tracking-[0.2em] uppercase hover:bg-white transition-all mt-4 shadow-lg shadow-saturn-accent/20">
                Deploy to Galaxy
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingGame && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card w-full max-w-lg p-8 relative border-blue-500/20"
          >
            <button 
              onClick={() => setShowEditModal(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold font-rajdhani mb-6 uppercase tracking-tighter">Modify Mission Assets</h2>
            
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Game Title</label>
                <input 
                  type="text" 
                  required
                  value={editingGame.title}
                  onChange={(e) => setEditingGame({...editingGame, title: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-sm focus:border-blue-500 outline-none text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Price (PHP)</label>
                  <input 
                    type="number" 
                    required
                    value={editingGame.price}
                    onChange={(e) => setEditingGame({...editingGame, price: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-sm focus:border-blue-500 outline-none text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Category</label>
                  <select 
                    value={editingGame.category}
                    onChange={(e) => setEditingGame({...editingGame, category: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-sm focus:border-blue-500 outline-none appearance-none text-white"
                  >
                    <option value="trending" className="bg-[#08090d]">TRENDING</option>
                    <option value="popular" className="bg-[#08090d]">POPULAR</option>
                    <option value="bestselling" className="bg-[#08090d]">BEST SELLING</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Image URL</label>
                <input 
                  type="text" 
                  required
                  value={editingGame.image}
                  onChange={(e) => setEditingGame({...editingGame, image: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-sm focus:border-blue-500 outline-none text-white"
                />
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white font-black py-4 rounded text-xs tracking-[0.2em] uppercase hover:bg-blue-500 transition-all mt-4 shadow-lg shadow-blue-600/20">
                Update Game Data
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Admin Sidebar */}
      <div className="w-64 bg-saturn-dark border-r border-white/5 p-6 flex flex-col gap-8 flex-shrink-0 h-full">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 bg-saturn-accent rounded flex items-center justify-center text-black font-bold shadow-lg shadow-saturn-accent/20">A</div>
          <span className="font-rajdhani font-bold text-xl tracking-tighter text-white">ADMIN PANEL</span>
        </div>

        <nav className="flex flex-col gap-2">
          <button 
            type="button"
            onClick={() => setActiveTab('games')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'games' ? 'bg-saturn-accent text-black scale-105' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}
          >
            <Gamepad2 className="w-4 h-4" /> GAMES
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab('users')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'users' ? 'bg-saturn-accent text-black scale-105' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}
          >
            <Users className="w-4 h-4" /> USERS
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'orders' ? 'bg-saturn-accent text-black scale-105' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}
          >
            <ShoppingBag className="w-4 h-4" /> ORDERS
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow p-12 overflow-y-auto h-full">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold font-rajdhani tracking-tighter uppercase text-white">{activeTab} MANAGEMENT</h1>
            <p className="text-white/40 text-sm">Welcome back Station Commander, {currentUser.name}</p>
          </div>
          {activeTab === 'games' && (
            <button 
              onClick={() => setShowAddModal(true)}
              className="btn-primary flex items-center gap-2 group hover:scale-105 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" /> ADD NEW GAME
            </button>
          )}
        </header>

        {activeTab === 'games' && (
          <div className="grid grid-cols-1 gap-4 pb-12">
            {games.map(game => (
              <motion.div 
                layout 
                key={game.id} 
                className="glass-card flex items-center gap-6 p-4 border-white/5 hover:border-white/10 transition-colors"
              >
                <img src={game.image} className="w-20 h-12 object-cover rounded bg-white/5" alt="" />
                <div className="flex-grow">
                  <h3 className="font-bold font-rajdhani text-white uppercase text-lg">{game.title}</h3>
                  <span className="text-[10px] text-saturn-accent font-black uppercase tracking-[0.2em]">{game.category}</span>
                </div>
                <div className="text-right px-8 border-x border-white/5 min-w-[120px]">
                  <span className="text-sm font-extrabold block text-white">₱{game.price.toLocaleString()}</span>
                  <span className="text-[9px] text-white/20 uppercase font-black tracking-widest">Store Price</span>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      setEditingGame({...game});
                      setShowEditModal(true);
                    }}
                    className="p-3 border border-white/10 rounded-lg transition-all text-white/40 hover:text-white hover:bg-white/5 active:scale-90"
                    title="Edit Asset"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(game.id, game.title)}
                    className="p-3 border border-white/10 rounded-lg transition-all text-white/40 hover:text-red-500 hover:bg-red-500/10 active:scale-90"
                    title="Decommission Asset"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'users' && (
          <div className="glass-card overflow-hidden border-white/5 shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead className="bg-white/5 text-[10px] font-black text-white/40 uppercase tracking-[0.2em] leading-none">
                <tr>
                  <th className="px-8 py-5">Commander Identifier</th>
                  <th className="px-8 py-5">Frequency (Email)</th>
                  <th className="px-8 py-5">Clearance Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map(user => (
                  <tr key={user.id} className="text-sm hover:bg-white/[0.02] transition-colors group">
                    <td className="px-8 py-5 font-bold text-white group-hover:text-saturn-accent transition-colors">
                      {user.name.toUpperCase()}
                    </td>
                    <td className="px-8 py-5 text-white/40 font-mono text-xs">{user.email}</td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1.5 rounded-sm text-[10px] font-black uppercase tracking-widest shadow-lg ${(user.role || 'user') === 'admin' ? 'bg-saturn-accent text-black shadow-saturn-accent/20' : 'bg-white/5 text-white/60'}`}>
                        {user.role || 'user'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="glass-card overflow-hidden border-white/5 shadow-2xl">
            {orders.length === 0 ? (
              <div className="text-center py-32 bg-white/[0.02] rounded-3xl border border-dashed border-white/10 shadow-inner">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingBag className="w-10 h-10 text-white/10" />
                </div>
                <h3 className="text-xl font-bold font-rajdhani text-white/40 uppercase tracking-tighter">No space traffic recorded</h3>
                <p className="text-white/20 text-xs mt-2 font-bold tracking-widest uppercase">The commerce frequency is quiet</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead className="bg-white/5 text-[10px] font-black text-white/40 uppercase tracking-[0.2em] leading-none">
                  <tr>
                    <th className="px-8 py-5">Order ID</th>
                    <th className="px-8 py-5">Commander / Buyer</th>
                    <th className="px-8 py-5">Intel / Asset Acquired</th>
                    <th className="px-8 py-5">Method</th>
                    <th className="px-8 py-5 text-right">Total Transferred</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {orders.map(order => (
                    <tr key={order.id} className="text-sm hover:bg-white/[0.02] transition-colors group">
                      <td className="px-8 py-5 font-mono text-xs text-white/40 group-hover:text-white transition-colors">
                        #SAT-{order.id.toString().slice(-6)}
                      </td>
                      <td className="px-8 py-5">
                        <div className="font-bold text-white">{order.customerName}</div>
                        <div className="text-[10px] text-white/40">{order.customerEmail}</div>
                      </td>
                      <td className="px-8 py-5">
                        <ul className="text-xs text-white/60 space-y-1">
                          {order.items.map((item, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-saturn-accent rounded-full"></div>
                              {item.title}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-8 py-5">
                        <span className="px-3 py-1.5 rounded-sm text-[10px] font-black uppercase tracking-widest bg-white/5 text-saturn-accent border border-saturn-accent/20">
                          {order.method}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right font-bold text-lg text-saturn-accent">
                        ₱{order.total.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
