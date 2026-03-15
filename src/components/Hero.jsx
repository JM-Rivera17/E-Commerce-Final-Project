import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { heroSlides } from '../data/games';

const Hero = () => {
  const featured = heroSlides;
  const [current, setCurrent] = React.useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % featured.length);
  const prev = () => setCurrent((prev) => (prev - 1 + featured.length) % featured.length);

  React.useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [featured.length]);

  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-black">
      <AnimatePresence mode='wait'>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-gradient-to-r from-saturn-blue/20 to-saturn-purple/20 opacity-40 mix-blend-overlay"
          />
          <img 
            src={featured[current].image} 
            alt={featured[current].title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-saturn-dark via-transparent to-transparent" />
          
          <div className="absolute inset-0 flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="max-w-2xl"
            >
              <h1 className="text-6xl md:text-8xl font-bold font-rajdhani leading-none mb-4 tracking-tighter">
                {featured[current].title}
              </h1>
              <p className="text-white/70 text-lg md:text-xl mb-8 leading-relaxed line-clamp-2 md:line-clamp-none">
                {featured[current].desc}
              </p>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold font-rajdhani text-saturn-accent">
                   {featured[current].price}
                </span>
                <button className="btn-primary px-8 py-3 text-lg">Buy Now</button>
                <button className="btn-outline px-8 py-3 text-lg">View Details</button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Hero Controls */}
      <div className="absolute bottom-10 right-10 flex items-center gap-4 z-20">
        <button onClick={prev} className="p-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-white transition-all">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex gap-2">
          {featured.map((_, i) => (
            <button 
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full transition-all ${current === i ? 'bg-saturn-accent w-8' : 'bg-white/20'}`}
            />
          ))}
        </div>
        <button onClick={next} className="p-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-white transition-all">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* No decorative text overlay to avoid clashing with image-based titles */}
    </div>
  );
};

export default Hero;
