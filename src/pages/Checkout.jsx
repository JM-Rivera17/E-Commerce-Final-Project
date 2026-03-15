import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, CreditCard, Wallet, CheckCircle2, Copy, AlertCircle, Smartphone, ShieldCheck, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, createOrder, currentUser } = useStore();
  const navigate = useNavigate();
  const [method, setMethod] = useState('qr');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // GCash / Maya states
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpSending, setOtpSending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (!currentUser) navigate('/login');
  }, [currentUser, navigate]);

  // OTP countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  if (!currentUser) return null;

  const handleSendOtp = () => {
    if (!/^09\d{9}$/.test(mobileNumber)) {
      alert('Please enter a valid Philippine mobile number (e.g. 09xxxxxxxxx)');
      return;
    }
    setOtpSending(true);
    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);

    setTimeout(() => {
      setOtpSending(false);
      setOtpSent(true);
      setCountdown(60);
      // Show the OTP in an alert (simulating SMS)
      alert(`📱 Saturn Pay OTP Simulator\n\nYour OTP has been "sent" to ${mobileNumber}.\n\nOTP Code: ${otp}\n\n(In a real system, this would be sent via SMS)`);
    }, 1500);
  };

  const handleVerifyOtp = () => {
    if (otpValue === generatedOtp) {
      setOtpError('');
      handlePay();
    } else {
      setOtpError('Incorrect OTP. Please try again.');
    }
  };

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      createOrder({
        method: method,
        status: 'completed',
        customerName: currentUser?.name || 'Guest Commander',
        customerEmail: currentUser?.email || 'guest@saturn.com'
      });
      setIsProcessing(false);
      setIsCompleted(true);
    }, 2500);
  };

  if (isCompleted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 bg-saturn-accent/20 rounded-full flex items-center justify-center mb-6"
        >
          <CheckCircle2 className="w-12 h-12 text-saturn-accent" />
        </motion.div>
        <h2 className="text-4xl font-bold font-rajdhani mb-2">PAYMENT SUCCESSFUL</h2>
        <p className="text-white/60 mb-8 max-w-md">Your order has been confirmed. You will receive an email with your game keys shortly.</p>
        <button className="btn-primary" onClick={() => window.location.href = '/'}>Return Home</button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold font-rajdhani mb-8 tracking-tighter">CHECKOUT</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Summary */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold font-rajdhani mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-saturn-accent" />
              ORDER SUMMARY
            </h3>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <img src={item.image} className="w-16 h-16 object-cover rounded" alt={item.title} />
                  <div className="flex-grow">
                    <h4 className="font-bold">{item.title}</h4>
                    <p className="text-white/40 text-sm">Digital Key</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">₱{item.price.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-xl font-bold font-rajdhani mb-6">SELECT PAYMENT METHOD</h3>
            <div className="grid grid-cols-3 gap-4">
              <button 
                onClick={() => { setMethod('qr'); setOtpSent(false); setOtpValue(''); }}
                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${method === 'qr' ? 'bg-saturn-accent/10 border-saturn-accent text-saturn-accent' : 'bg-white/5 border-white/5 text-white/40 hover:border-white/20'}`}
              >
                <QrCode className="w-8 h-8" />
                <span className="text-xs font-bold">QR SCAN</span>
              </button>
              <button 
                onClick={() => { setMethod('card'); setOtpSent(false); setOtpValue(''); }}
                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${method === 'card' ? 'bg-saturn-accent/10 border-saturn-accent text-saturn-accent' : 'bg-white/5 border-white/5 text-white/40 hover:border-white/20'}`}
              >
                <CreditCard className="w-8 h-8" />
                <span className="text-xs font-bold">CARD</span>
              </button>
              <button 
                onClick={() => { setMethod('wallet'); setOtpSent(false); setOtpValue(''); }}
                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${method === 'wallet' ? 'bg-saturn-accent/10 border-saturn-accent text-saturn-accent' : 'bg-white/5 border-white/5 text-white/40 hover:border-white/20'}`}
              >
                <Wallet className="w-8 h-8" />
                <span className="text-xs font-bold">GCASH / MAYA</span>
              </button>
            </div>

            <div className="mt-8 p-6 bg-white/[0.02] border border-white/5 rounded-xl">
              <AnimatePresence mode="wait">
                {method === 'qr' && (
                  <motion.div
                    key="qr"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="bg-white p-4 rounded-xl mb-4 relative group">
                      <img 
                        src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=SATURN-ORDER-12345" 
                        alt="QR Code"
                        className="w-40 h-40 filter contrast-125"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm rounded-xl">
                        <span className="text-white text-xs font-bold">SCAN TO PAY</span>
                      </div>
                    </div>
                    <p className="text-sm text-white/70 mb-2">Scan this QR with GCash, Maya, or any Banking App</p>
                    <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full text-[10px] font-mono text-white/40">
                      REFERENCE: SAT-9942-PR32
                      <Copy className="w-3 h-3 cursor-pointer hover:text-white" />
                    </div>
                  </motion.div>
                )}

                {method === 'card' && (
                  <motion.div
                    key="card"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs text-white/40">CARD NUMBER</label>
                        <input className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-saturn-accent text-white" placeholder="•••• •••• •••• ••••" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-white/40">EXPIRY</label>
                        <input className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-saturn-accent text-white" placeholder="MM/YY" />
                      </div>
                    </div>
                    <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg flex gap-3 text-orange-400">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <p className="text-xs">You are about to pay ₱{total.toLocaleString()} for {cart.length} digital items.</p>
                    </div>
                  </motion.div>
                )}

                {method === 'wallet' && (
                  <motion.div
                    key="wallet"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    {/* Step 1: Enter mobile number */}
                    <div className="space-y-2">
                      <label className="text-xs font-black text-white/40 uppercase tracking-widest flex items-center gap-2">
                        <Smartphone className="w-3 h-3" /> GCash / Maya Mobile Number
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="tel"
                          maxLength={11}
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                          disabled={otpSent}
                          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-saturn-accent text-white disabled:opacity-50 font-mono tracking-widest"
                          placeholder="09xxxxxxxxx"
                        />
                        <button
                          onClick={handleSendOtp}
                          disabled={otpSending || (otpSent && countdown > 0)}
                          className="px-5 py-3 bg-saturn-accent text-black text-xs font-black rounded-lg hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                        >
                          {otpSending ? 'SENDING...' : otpSent && countdown > 0 ? `RESEND (${countdown}s)` : otpSent ? 'RESEND OTP' : 'SEND OTP'}
                        </button>
                      </div>
                      <p className="text-[10px] text-white/30 tracking-widest uppercase">Enter your registered GCash or Maya number</p>
                    </div>

                    {/* Step 2: Enter OTP */}
                    <AnimatePresence>
                      {otpSent && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-3"
                        >
                          <div className="h-px bg-white/5 my-2"></div>

                          <div className="p-4 bg-saturn-accent/10 border border-saturn-accent/20 rounded-lg flex gap-3">
                            <ShieldCheck className="w-5 h-5 shrink-0 text-saturn-accent" />
                            <div>
                              <p className="text-xs text-saturn-accent font-bold">OTP Sent!</p>
                              <p className="text-[10px] text-white/40 mt-1">A 6-digit code has been sent to your number. Enter it below to confirm payment.</p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-xs font-black text-white/40 uppercase tracking-widest">Enter OTP Code</label>
                            <input
                              type="text"
                              maxLength={6}
                              value={otpValue}
                              onChange={(e) => { setOtpValue(e.target.value.replace(/\D/g, '')); setOtpError(''); }}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-center text-2xl font-mono tracking-[0.4em] focus:outline-none focus:border-saturn-accent text-white"
                              placeholder="• • • • • •"
                            />
                            {otpError && (
                              <p className="text-xs text-red-400 flex items-center gap-1">
                                <X className="w-3 h-3" /> {otpError}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right: Payment Action */}
        <div className="space-y-6">
          <div className="glass-card p-6 sticky top-28">
            <h3 className="text-xl font-bold font-rajdhani mb-6">FINAL AMOUNT</h3>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-white/60">
                <span>Subtotal</span>
                <span>₱{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Tax (VAT)</span>
                <span>₱0.00</span>
              </div>
              <div className="h-px bg-white/10 my-4"></div>
              <div className="flex justify-between text-2xl font-bold text-saturn-accent">
                <span>TOTAL</span>
                <span>₱{total.toLocaleString()}</span>
              </div>
            </div>

            <button 
              onClick={method === 'wallet' ? handleVerifyOtp : handlePay}
              disabled={isProcessing || cart.length === 0 || (method === 'wallet' && (!otpSent || otpValue.length < 6))}
              className="w-full btn-primary py-4 text-lg font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                  />
                  PROCESSING...
                </>
              ) : method === 'wallet' ? (
                <><ShieldCheck className="w-5 h-5" /> VERIFY & PAY</>
              ) : (
                <>PAY NOW</>
              )}
            </button>
            <p className="text-[10px] text-white/30 text-center mt-4 uppercase tracking-widest">
              Secure SSL Encryption Protected
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
