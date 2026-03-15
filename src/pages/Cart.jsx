import React, { useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, currentUser } = useStore();
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-10 h-10 text-white/20" />
        </div>
        <h2 className="text-3xl font-bold font-rajdhani mb-2">YOUR CART IS EMPTY</h2>
        <p className="text-white/40 mb-8">Looks like you haven't added any games yet.</p>
        <Link to="/games" className="btn-primary">Browse Games</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold font-rajdhani mb-12 tracking-tighter">YOUR SHOPPING CART</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="glass-card p-4 flex gap-6 group">
              <div className="w-32 h-20 shrink-0 overflow-hidden rounded-lg">
                <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-bold font-rajdhani">{item.title}</h3>
                <p className="text-white/40 text-xs">Digital Download</p>
              </div>
              <div className="text-right flex flex-col justify-between">
                <span className="font-bold text-saturn-accent">₱{item.price.toLocaleString()}</span>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-white/20 hover:text-red-500 transition-colors self-end"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6 border-saturn-accent/20">
            <h3 className="text-xl font-bold font-rajdhani mb-6 uppercase tracking-wider">Order Summary</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-white/60">
                <span>Items ({cart.length})</span>
                <span>₱{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>VAT</span>
                <span>₱0.00</span>
              </div>
              <div className="h-px bg-white/10 my-4"></div>
              <div className="flex justify-between text-xl font-bold text-white">
                <span>Total</span>
                <span className="text-saturn-accent">₱{total.toLocaleString()}</span>
              </div>
            </div>
            
            <Link to="/checkout" className="w-full btn-primary py-4 flex items-center justify-center gap-2 group">
              PROCEED TO CHECKOUT
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="p-4 bg-white/5 rounded-xl border border-white/5">
            <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-widest">
              By proceeding, you agree to the Saturn Terms of Service and Privacy Policy. All digital sales are final once content is accessed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
