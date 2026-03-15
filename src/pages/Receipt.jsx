import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, Calendar, CreditCard, Package, Home, Receipt } from 'lucide-react';
import { motion } from 'framer-motion';

const ReceiptPage = () => {
  const [searchParams] = useSearchParams();

  // Read order data from URL params
  const orderId = searchParams.get('id') || 'N/A';
  const total = searchParams.get('total') || '0';
  const date = searchParams.get('date') || new Date().toISOString();
  const method = searchParams.get('method') || 'qr';
  const customer = searchParams.get('customer') || 'Commander';
  const rawItems = searchParams.get('items') || '[]';

  let items = [];
  try {
    items = JSON.parse(decodeURIComponent(rawItems));
  } catch {
    items = [];
  }

  const methodLabels = {
    qr: 'QR Code Scan',
    card: 'Credit / Debit Card',
    wallet: 'GCash / Maya'
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-[#08090d]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-20 h-20 bg-saturn-accent/20 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle2 className="w-10 h-10 text-saturn-accent" />
          </motion.div>
          <h1 className="text-3xl font-bold font-rajdhani tracking-tighter text-white">PAYMENT CONFIRMED</h1>
          <p className="text-white/40 text-sm mt-1">Your mission assets have been deployed</p>
        </div>

        {/* Receipt Card */}
        <div className="bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden">
          {/* Reference */}
          <div className="bg-saturn-accent/10 border-b border-saturn-accent/20 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Receipt className="w-4 h-4 text-saturn-accent" />
              <span className="text-[10px] font-black text-saturn-accent uppercase tracking-[0.2em]">Official Receipt</span>
            </div>
            <span className="font-mono text-xs text-white/60">#SAT-{orderId.toString().slice(-6)}</span>
          </div>

          <div className="p-6 space-y-6">
            {/* Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <label className="text-[10px] font-black text-white/30 uppercase tracking-widest block mb-1">Commander</label>
                <span className="font-bold text-white">{decodeURIComponent(customer)}</span>
              </div>
              <div>
                <label className="text-[10px] font-black text-white/30 uppercase tracking-widest block mb-1">Date</label>
                <div className="flex items-center gap-1 text-white/80">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(date).toLocaleDateString()}</span>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-white/30 uppercase tracking-widest block mb-1">Payment Method</label>
                <div className="flex items-center gap-1 text-white/80">
                  <CreditCard className="w-3 h-3" />
                  <span>{methodLabels[method] || method}</span>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-white/30 uppercase tracking-widest block mb-1">Status</label>
                <span className="text-green-400 font-bold text-xs flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Completed
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/5"></div>

            {/* Items */}
            <div>
              <label className="text-[10px] font-black text-white/30 uppercase tracking-widest block mb-3 flex items-center gap-2">
                <Package className="w-3 h-3" /> Assets Acquired
              </label>
              <div className="space-y-3">
                {items.length > 0 ? items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <div>
                      <p className="font-bold text-white">{item.title}</p>
                      <p className="text-[10px] text-white/30">Digital Key</p>
                    </div>
                    <span className="text-white/70">₱{Number(item.price).toLocaleString()}</span>
                  </div>
                )) : (
                  <p className="text-white/30 text-xs">No item details available</p>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px border-t border-dashed border-white/10"></div>

            {/* Total */}
            <div className="flex justify-between items-center">
              <span className="font-black text-white uppercase tracking-widest text-sm">Total Paid</span>
              <span className="text-2xl font-bold text-saturn-accent">₱{Number(total).toLocaleString()}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-white/[0.02] p-4 text-center border-t border-white/5">
            <p className="text-[9px] text-white/20 font-bold tracking-[0.3em] uppercase">
              Thank you, Commander. SATURN GAME STORE
            </p>
          </div>
        </div>

        {/* Back button */}
        <Link to="/" className="block mt-6">
          <button className="w-full flex items-center justify-center gap-2 border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all py-3 rounded-xl text-sm font-bold">
            <Home className="w-4 h-4" /> Return to Station
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default ReceiptPage;
