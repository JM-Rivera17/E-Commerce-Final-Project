import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Calendar, CheckCircle, Package } from 'lucide-react';
import { motion } from 'framer-motion';

const MyOrders = () => {
  const { orders, currentUser } = useStore();

  // Filter orders to only show those belonging to the current user
  const myOrders = orders.filter(order => order.userId === currentUser?.id);

  if (myOrders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-32 text-center">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-10 h-10 text-white/20" />
        </div>
        <h2 className="text-3xl font-bold font-rajdhani mb-2">NO MISSIONS COMPLETED</h2>
        <p className="text-white/40 mb-8">You haven't purchased any games yet. Start your journey today!</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-12">
        <Package className="w-10 h-10 text-saturn-accent" />
        <div>
          <h1 className="text-4xl font-bold font-rajdhani tracking-tighter uppercase">Mission History</h1>
          <p className="text-white/40 text-sm">Review your past acquisitions and deployments</p>
        </div>
      </div>

      <div className="space-y-8">
        {myOrders.sort((a, b) => b.id - a.id).map((order) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={order.id}
            className="glass-card overflow-hidden"
          >
            <div className="bg-white/5 p-6 flex flex-wrap justify-between items-center gap-4 border-b border-white/5">
              <div className="flex items-center gap-6">
                <div>
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest block mb-1">Order ID</label>
                  <span className="font-mono text-sm text-saturn-accent">#SAT-{order.id.toString().slice(-6)}</span>
                </div>
                <div>
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest block mb-1">Date</label>
                  <div className="flex items-center gap-2 text-sm text-white/80">
                    <Calendar className="w-3 h-3" />
                    {new Date(order.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest block mb-1">Status</label>
                  <span className="flex items-center gap-1.5 text-[10px] font-black text-green-400 uppercase tracking-widest">
                    <CheckCircle className="w-3 h-3" />
                    Completed
                  </span>
                </div>
                <div className="h-10 w-px bg-white/10 mx-2"></div>
                <div className="text-right">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest block mb-1">Total Assets</label>
                  <span className="text-xl font-bold text-white">₱{order.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 group">
                    <div className="w-16 h-10 rounded overflow-hidden flex-shrink-0">
                      <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt="" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold text-white group-hover:text-saturn-accent transition-colors">{item.title}</h4>
                      <div className="flex items-center gap-2 text-[10px] text-white/40 uppercase tracking-widest">
                        <span>Digital Key</span>
                        <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                        <span>{order.method === 'qr' ? 'QR Code' : order.method?.toUpperCase()}</span>
                      </div>
                    </div>
                    <span className="font-bold text-white/60">₱{item.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/[0.02] p-4 text-center border-t border-white/5">
              <p className="text-[9px] text-white/20 font-black tracking-[0.3em] uppercase">
                Keys have been transmitted to {order.customerEmail}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
