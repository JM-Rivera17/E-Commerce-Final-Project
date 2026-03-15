import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="text-saturn-accent font-black tracking-widest text-xs mb-4 block">SINCE 2026</span>
        <h1 className="text-6xl font-bold font-rajdhani mb-8 tracking-tighter">ABOUT SATURN</h1>
        
        <div className="glass-card p-8 md:p-12 text-lg text-white/70 space-y-8 leading-relaxed text-left">
          <p>
            Welcome to <span className="text-white font-bold">SATURN</span>, a premium ecosystem built for modern gamers. Our mission is to provide an ultra-fast, visually stunning, and user-centric platform for digital game distribution.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
            <div className="space-y-2">
              <h3 className="text-white font-bold font-rajdhani text-xl">THE VISION</h3>
              <p className="text-sm">To bridge the gap between players and the games they love through cutting-edge technology and design.</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-white font-bold font-rajdhani text-xl">THE COMMUNITY</h3>
              <p className="text-sm">A safe and inclusive space for gamers of all backgrounds to explore, collect, and compete.</p>
            </div>
          </div>


          <div className="pt-8 border-t border-white/5 flex flex-wrap gap-4 justify-between items-center text-sm font-bold uppercase tracking-widest text-white/20">
            <span>Progress Report 2 Project</span>
            <span>Developed by JOSE MARI RIVERA</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
