import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PageView } from '../types';
import {
  ArrowLeft,
  CheckCircle2,
  Truck,
  CreditCard,
  Banknote,
  Smartphone,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

interface CheckoutPageProps {
  setCurrentPage: (page: PageView) => void;
  setLastOrderId: (id: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  setCurrentPage,
  setLastOrderId
}) => {
  const {
    cart,
    cartSubtotal,
    discountAmount,
    createOrder,
    user,
    showToast
  } = useStore();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Delivery info
  const [fullName, setFullName] = useState<string>(user?.displayName || '');
  const [phone, setPhone] = useState<string>('017');
  const [email, setEmail] = useState<string>(user?.email || '');
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('Dhaka');
  const [postalCode, setPostalCode] = useState<string>('1205');
  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('standard');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery' | 'Card' | 'Mobile Payment'>('Cash on Delivery');
  const [mobileAccount, setMobileAccount] = useState<'bkash' | 'nagad' | 'rocket'>('bkash');
  const [transactionId, setTransactionId] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const shippingFee = deliveryMethod === 'express' ? 120 : (cartSubtotal >= 5000 ? 0 : 60);
  const orderTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const districts = [
    'Dhaka',
    'Chattogram',
    'Sylhet',
    'Rajshahi',
    'Khulna',
    'Barishal',
    'Rangpur',
    'Mymensingh',
    'Cumilla',
    'Gazipur',
    'Narayanganj',
    'Bogura'
  ];

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !address.trim() || !city.trim()) {
      showToast('Please fill in all delivery details', 'error');
      return;
    }
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handlePlaceOrder = async () => {
    setSubmitting(true);
    try {
      const orderId = await createOrder({
        userId: user?.uid,
        customerName: fullName,
        customerPhone: phone,
        customerEmail: email,
        address,
        city,
        postalCode,
        deliveryMethod,
        items: cart,
        subtotal: cartSubtotal,
        shippingFee,
        discount: discountAmount,
        total: orderTotal,
        paymentMethod
      });

      setLastOrderId(orderId);
      showToast('Order placed successfully!', 'success');
      setCurrentPage('order-success');
    } catch (err) {
      console.error('Error placing order:', err);
      showToast('Could not complete order. Please retry.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-6">
      {/* Top Header */}
      <div className="flex items-center gap-3 pb-2 border-b border-[#ECE7DF]">
        <button
          onClick={() => {
            if (step === 3) setStep(2);
            else if (step === 2) setStep(1);
            else setCurrentPage('cart');
          }}
          aria-label="Back"
          className="p-2 rounded-xl hover:bg-[#EFECE6] text-[#1C2A20] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1C2A20]">
            Checkout
          </h1>
          <p className="text-xs text-[#6B7280]">
            Complete your artisanal leather order
          </p>
        </div>
      </div>

      {/* 3-Step Indicator (Matches reference screenshot 7) */}
      <div className="flex items-center justify-between max-w-sm mx-auto px-4 py-3">
        <div className="flex flex-col items-center gap-1">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              step >= 1 ? 'bg-[#1C2A20] text-white' : 'bg-[#EFECE6] text-[#6B7280]'
            }`}
          >
            1
          </div>
          <span className="text-[11px] font-medium text-[#1C2A20]">Delivery</span>
        </div>

        <div className={`flex-1 h-0.5 mx-2 ${step >= 2 ? 'bg-[#1C2A20]' : 'bg-[#EFECE6]'}`} />

        <div className="flex flex-col items-center gap-1">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              step >= 2 ? 'bg-[#1C2A20] text-white' : 'bg-[#EFECE6] text-[#6B7280]'
            }`}
          >
            2
          </div>
          <span className="text-[11px] font-medium text-[#1C2A20]">Payment</span>
        </div>

        <div className={`flex-1 h-0.5 mx-2 ${step === 3 ? 'bg-[#1C2A20]' : 'bg-[#EFECE6]'}`} />

        <div className="flex flex-col items-center gap-1">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              step === 3 ? 'bg-[#1C2A20] text-white' : 'bg-[#EFECE6] text-[#6B7280]'
            }`}
          >
            3
          </div>
          <span className="text-[11px] font-medium text-[#1C2A20]">Review</span>
        </div>
      </div>

      {/* Step 1: Delivery Information Form */}
      {step === 1 && (
        <form onSubmit={handleStep1Submit} className="space-y-5 bg-white border border-[#ECE8E1] rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xs">
          <h2 className="font-serif-luxury text-xl font-bold text-[#1C2A20]">
            Delivery Information
          </h2>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-[#4A5568] mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Tanvir Hasan"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#ECE8E1] bg-[#F7F5F0] text-sm text-[#1C2A20] focus:outline-none focus:border-[#1C2A20]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#4A5568] mb-1">
                  Phone Number (Bangladesh) *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="017XXXXXXXX"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#ECE8E1] bg-[#F7F5F0] text-sm text-[#1C2A20] focus:outline-none focus:border-[#1C2A20]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#4A5568] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#ECE8E1] bg-[#F7F5F0] text-sm text-[#1C2A20] focus:outline-none focus:border-[#1C2A20]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#4A5568] mb-1">
                Full Street Address *
              </label>
              <textarea
                required
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House 12, Road 8, Block C, Dhanmondi, Dhaka"
                className="w-full px-3.5 py-2 rounded-xl border border-[#ECE8E1] bg-[#F7F5F0] text-sm text-[#1C2A20] focus:outline-none focus:border-[#1C2A20]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#4A5568] mb-1">
                  City / District *
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#ECE8E1] bg-[#F7F5F0] text-sm text-[#1C2A20] focus:outline-none focus:border-[#1C2A20]"
                >
                  {districts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#4A5568] mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="1205"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#ECE8E1] bg-[#F7F5F0] text-sm text-[#1C2A20] focus:outline-none focus:border-[#1C2A20]"
                />
              </div>
            </div>
          </div>

          {/* Delivery Method Selector (Matches reference screenshot 7) */}
          <div className="pt-3 space-y-2.5">
            <span className="block text-xs font-semibold uppercase tracking-wider text-[#8B5E34]">
              Delivery Method
            </span>

            <div
              onClick={() => setDeliveryMethod('standard')}
              className={`cursor-pointer flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                deliveryMethod === 'standard'
                  ? 'border-[#1C2A20] bg-[#FAF8F5]'
                  : 'border-[#ECE8E1] hover:border-[#D1C9BE]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    deliveryMethod === 'standard'
                      ? 'border-[#1C2A20] bg-[#1C2A20]'
                      : 'border-gray-400'
                  }`}
                >
                  {deliveryMethod === 'standard' && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#1C2A20]">
                    Standard Delivery
                  </h4>
                  <p className="text-xs text-[#6B7280]">3–5 business days</p>
                </div>
              </div>
              <span className="text-sm font-bold text-[#1C2A20]">
                {cartSubtotal >= 5000 ? 'FREE' : '৳60'}
              </span>
            </div>

            <div
              onClick={() => setDeliveryMethod('express')}
              className={`cursor-pointer flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                deliveryMethod === 'express'
                  ? 'border-[#1C2A20] bg-[#FAF8F5]'
                  : 'border-[#ECE8E1] hover:border-[#D1C9BE]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    deliveryMethod === 'express'
                      ? 'border-[#1C2A20] bg-[#1C2A20]'
                      : 'border-gray-400'
                  }`}
                >
                  {deliveryMethod === 'express' && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#1C2A20]">
                    Express Delivery
                  </h4>
                  <p className="text-xs text-[#6B7280]">1–2 business days</p>
                </div>
              </div>
              <span className="text-sm font-bold text-[#1C2A20]">৳120</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-[#1C2A20] hover:bg-[#2B3E30] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-all mt-4"
          >
            <span>Continue to Payment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}

      {/* Step 2: Payment Method */}
      {step === 2 && (
        <form onSubmit={handleStep2Submit} className="space-y-5 bg-white border border-[#ECE8E1] rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xs">
          <h2 className="font-serif-luxury text-xl font-bold text-[#1C2A20]">
            Select Payment Option
          </h2>

          <div className="space-y-3">
            {/* Cash on Delivery */}
            <div
              onClick={() => setPaymentMethod('Cash on Delivery')}
              className={`cursor-pointer p-4 rounded-2xl border transition-all flex items-start gap-3 ${
                paymentMethod === 'Cash on Delivery'
                  ? 'border-[#1C2A20] bg-[#FAF8F5]'
                  : 'border-[#ECE8E1] hover:border-[#D1C9BE]'
              }`}
            >
              <div className="p-2 rounded-xl bg-[#E8F0EA] text-[#22502F] mt-0.5">
                <Banknote className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-[#1C2A20]">Cash on Delivery</h4>
                  <span className="text-xs font-semibold text-[#8B5E34]">Available nationwide</span>
                </div>
                <p className="text-xs text-[#6B7280] mt-1">
                  Pay securely with cash upon delivery right at your doorstep.
                </p>
              </div>
            </div>

            {/* Mobile Payment (bKash / Nagad / Rocket) */}
            <div
              onClick={() => setPaymentMethod('Mobile Payment')}
              className={`cursor-pointer p-4 rounded-2xl border transition-all flex items-start gap-3 ${
                paymentMethod === 'Mobile Payment'
                  ? 'border-[#1C2A20] bg-[#FAF8F5]'
                  : 'border-[#ECE8E1] hover:border-[#D1C9BE]'
              }`}
            >
              <div className="p-2 rounded-xl bg-[#FFF3E0] text-[#E65100] mt-0.5">
                <Smartphone className="w-5 h-5" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-[#1C2A20]">Mobile Banking (bKash / Nagad)</h4>
                  <span className="text-xs font-semibold text-[#22502F]">Instant</span>
                </div>
                <p className="text-xs text-[#6B7280]">
                  Send payment to our merchant number <span className="font-semibold text-[#1C2A20]">01712-345678</span> and enter your TrxID below.
                </p>

                {paymentMethod === 'Mobile Payment' && (
                  <div className="pt-2 space-y-2">
                    <div className="flex gap-2">
                      {(['bkash', 'nagad', 'rocket'] as const).map((acc) => (
                        <button
                          type="button"
                          key={acc}
                          onClick={() => setMobileAccount(acc)}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase ${
                            mobileAccount === acc
                              ? 'bg-[#1C2A20] text-white'
                              : 'bg-[#ECE8E1] text-[#4A5568]'
                          }`}
                        >
                          {acc}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Enter TrxID / Transaction ID"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#ECE8E1] rounded-xl bg-white"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Card Payment */}
            <div
              onClick={() => setPaymentMethod('Card')}
              className={`cursor-pointer p-4 rounded-2xl border transition-all flex items-start gap-3 ${
                paymentMethod === 'Card'
                  ? 'border-[#1C2A20] bg-[#FAF8F5]'
                  : 'border-[#ECE8E1] hover:border-[#D1C9BE]'
              }`}
            >
              <div className="p-2 rounded-xl bg-[#EDE9FE] text-[#6D28D9] mt-0.5">
                <CreditCard className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-[#1C2A20]">Debit / Credit Card</h4>
                <p className="text-xs text-[#6B7280] mt-1">
                  Supports Visa, MasterCard, and American Express. Secure 256-bit encryption.
                </p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-[#1C2A20] hover:bg-[#2B3E30] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-all mt-4"
          >
            <span>Review Order</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}

      {/* Step 3: Review & Place Order */}
      {step === 3 && (
        <div className="space-y-5 bg-white border border-[#ECE8E1] rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xs">
          <h2 className="font-serif-luxury text-xl font-bold text-[#1C2A20]">
            Review & Confirm Order
          </h2>

          {/* Delivery & Payment Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[#F7F5F0] text-xs space-y-1">
            <div>
              <span className="font-semibold uppercase tracking-wider text-[#8B5E34]">
                Shipping Address
              </span>
              <p className="font-medium text-[#1C2A20] mt-1">{fullName}</p>
              <p className="text-[#6B7280]">{phone}</p>
              <p className="text-[#6B7280]">{address}, {city} - {postalCode}</p>
            </div>
            <div>
              <span className="font-semibold uppercase tracking-wider text-[#8B5E34]">
                Payment & Method
              </span>
              <p className="font-medium text-[#1C2A20] mt-1">{paymentMethod}</p>
              <p className="text-[#6B7280]">{deliveryMethod === 'express' ? 'Express Delivery' : 'Standard Delivery'}</p>
            </div>
          </div>

          {/* Order Items List */}
          <div className="divide-y divide-[#ECE7DF] max-h-60 overflow-y-auto">
            {cart.map((item) => (
              <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <img src={item.image} alt="" className="w-10 h-10 rounded-lg object-cover bg-white" />
                  <div>
                    <h5 className="font-semibold text-[#1C2A20]">{item.name}</h5>
                    <p className="text-[#6B7280]">Qty: {item.quantity} | {item.color}</p>
                  </div>
                </div>
                <span className="font-bold text-[#1C2A20]">
                  ৳{(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div className="pt-3 border-t border-[#ECE7DF] space-y-1.5 text-xs text-[#4A5568]">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-semibold text-[#1C2A20]">৳{cartSubtotal.toLocaleString()}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-[#22502F]">
                <span>Discount:</span>
                <span className="font-semibold">-৳{discountAmount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery Fee:</span>
              <span className="font-semibold text-[#1C2A20]">
                {shippingFee === 0 ? 'FREE' : `৳${shippingFee}`}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold text-[#1C2A20] pt-2 border-t border-[#ECE7DF]">
              <span>Final Total:</span>
              <span>৳{orderTotal.toLocaleString()}</span>
            </div>
          </div>

          <button
            id="confirm-place-order-btn"
            onClick={handlePlaceOrder}
            disabled={submitting}
            className="w-full py-4 rounded-full bg-[#1C2A20] hover:bg-[#2B3E30] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            {submitting ? (
              <span>Placing Order in Firestore...</span>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm & Place Order (৳{orderTotal.toLocaleString()})</span>
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 text-xs text-[#6B7280]">
            <ShieldCheck className="w-4 h-4 text-[#8B5E34]" />
            <span>Order directly recorded in SR Leather Firestore system</span>
          </div>
        </div>
      )}
    </div>
  );
};
