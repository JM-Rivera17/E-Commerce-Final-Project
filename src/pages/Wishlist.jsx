import React from 'react';
import { useStore } from '../context/StoreContext';
import GameCard from '../components/GameCard';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishlist } = useStore();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart className="w-10 h-10 text-white/20" />
        </div>
        <h2 className="text-3xl font-bold font-rajdhani mb-2">WISHLIST IS EMPTY</h2>
        <p className="text-white/40 mb-8">Save some games to your orbit to see them here.</p>
        <Link to="/games" className="btn-primary">Explore Games</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold font-rajdhani mb-12 tracking-tighter">WISHLIST</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
