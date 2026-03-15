import React from 'react';
import Hero from '../components/Hero';
import GameCard from '../components/GameCard';
import { useStore } from '../context/StoreContext';
import { motion } from 'framer-motion';

const Home = () => {
  const { games } = useStore();
  const popular = games.filter(g => g.category === 'popular');

  return (
    <div>
      <Hero />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold font-rajdhani tracking-tighter">POPULAR GAMES</h2>
            <p className="text-white/40">Most played titles this month</p>
          </div>
          <button className="text-saturn-accent font-bold text-sm tracking-widest hover:underline transition-all">VIEW ALL</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popular.map((game, idx) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <GameCard game={game} />
            </motion.div>
          ))}
        </div>

        {/* Featured Banner */}
        <div className="mt-24 glass-card p-1 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-saturn-blue/20 to-saturn-purple/20 opacity-50 group-hover:opacity-100 transition-opacity" />
          <div className="relative bg-saturn-dark/40 backdrop-blur-xl p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center md:text-left">
              <span className="text-saturn-accent font-black text-xs tracking-[0.3em] uppercase mb-4 block">Special Offer</span>
              <h2 className="text-5xl font-bold font-rajdhani mb-4">JOIN THE SATURN ELITE</h2>
              <p className="text-white/60 mb-6 text-lg">Get early access to beta tests, exclusive in-game items, and 15% off on all new releases.</p>
              <button className="btn-primary">Become a Member</button>
            </div>
            <div className="w-full md:w-1/3 aspect-video overflow-hidden rounded-xl border border-white/10">
              <img src="/images/banner.jpg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Banner" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
