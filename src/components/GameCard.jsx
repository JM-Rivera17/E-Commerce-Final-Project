import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Info, Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const GameCard = ({ game }) => {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const isWishlisted = wishlist.find(item => item.id === game.id);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="glass-card group flex flex-col h-full"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img 
          src={game.image} 
          alt="" 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={(e) => {
            e.target.src = 'https://placehold.co/600x400/161821/ffffff?text=' + game.title;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-saturn-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              const added = addToCart(game);
              if (added) {
                alert(`🚀 ${game.title} has been added to your cart!`);
              } else {
                alert(`🛰️ ${game.title} is already in your cart.`);
              }
            }}
            className="p-3 bg-saturn-accent text-black rounded-full hover:scale-110 transition-transform shadow-lg shadow-saturn-accent/20"
            title="Add to Cart"
          >
            <Plus className="w-5 h-5" />
          </button>
          <button 
            onClick={() => toggleWishlist(game)}
            className={`p-3 rounded-full hover:scale-110 transition-transform backdrop-blur-sm ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white/10 text-white'}`}
            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>
        {game.category === 'trending' && (
          <span className="absolute top-3 left-3 bg-saturn-accent text-black text-[10px] font-black px-2 py-0.5 rounded tracking-widest uppercase">
            Trending
          </span>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold font-rajdhani text-white mb-1 line-clamp-1">{game.title}</h3>
        <p className="text-white/40 text-xs mb-4 line-clamp-2">{game.description}</p>
        
        <div className="mt-auto flex items-center justify-between">
          <span className={`text-sm font-bold ${game.isFree ? 'text-saturn-accent' : 'text-white'}`}>
            {game.isFree ? 'FREE TO PLAY' : `₱${game.price.toLocaleString()}`}
          </span>
          <div className="flex -space-x-1">
            <div className="w-6 h-6 rounded-full border-2 border-saturn-card bg-saturn-blue"></div>
            <div className="w-6 h-6 rounded-full border-2 border-saturn-card bg-saturn-purple"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GameCard;
