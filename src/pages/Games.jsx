import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import GameCard from '../components/GameCard';
import { useStore } from '../context/StoreContext';
import { Search, Filter } from 'lucide-react';

const Games = () => {
  const { games } = useStore();
  const location = useLocation();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('search');
    if (q) setSearch(q);
  }, [location.search]);

  const filteredGames = games.filter(g => {
    const matchesFilter = filter === 'all' || g.category === filter;
    const matchesSearch = g.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const categories = [
    { id: 'all', name: 'ALL GAMES' },
    { id: 'trending', name: 'TRENDING' },
    { id: 'popular', name: 'POPULAR' },
    { id: 'bestselling', name: 'BEST SELLING' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div>
          <h1 className="text-4xl font-bold font-rajdhani tracking-tighter">DISCOVER GAMES</h1>
          <p className="text-white/40">Browse our extensive library of titles</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:border-saturn-accent transition-all w-full sm:w-64"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-white/40" />
          </div>
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-sm hover:bg-white/10 transition-all">
            <Filter className="w-4 h-4" />
            FILTER
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-8 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setFilter(c.id)}
            className={`whitespace-nowrap px-6 py-2 rounded-full font-bold text-xs tracking-widest transition-all ${filter === c.id ? 'bg-saturn-accent text-black' : 'bg-white/5 text-white/40 hover:text-white'}`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
      
      {filteredGames.length === 0 && (
        <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
          <p className="text-white/20 text-xl font-bold font-rajdhani">NO GAMES FOUND</p>
        </div>
      )}
    </div>
  );
};

export default Games;
