// src/features/orders/pages/OrderDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShoppingBag, 
  Package, 
  Truck, 
  Check, 
  Clock, 
  X,
  Download,
  Printer,
  ChevronRight
} from 'lucide-react';
import { getOrderDetails, cancelOrder } from '../services/orderService';
import OrderStatusBadge from '../components/OrderStatusBadge';
import OrderTimeline from '../components/OrderTimeline';
import ShippingDetails from '../components/ShippingDetails';
import ConfirmModal from '../../admin/components/ConfirmModal';
const OrderDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    loadOrder();
  }, [id]);

  const loadOrder = async () => {
    setLoading(true);
    try {
      const data = await getOrderDetails(id);
      setOrder(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    try {
      await cancelOrder(id);
      setShowCancelModal(false);
      loadOrder();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
            <Package size={48} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-xl font-bold text-gray-800">Order Not Found</h2>
            <p className="text-gray-500 mt-2">{error || 'The order you are looking for does not exist.'}</p>
            <Link to="/orders" className="inline-block mt-4 text-emerald-600 font-medium hover:underline">
              Back to Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const canCancel = ['PENDING', 'PROCESSING'].includes(order.status);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Link to="/orders" className="p-2 hover:bg-gray-100 rounded-xl transition">
              <ArrowLeft size={20} className="text-gray-600" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Order #{order.id}</h1>
              <p className="text-sm text-gray-500">
                Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-xl transition text-gray-400 hover:text-gray-600">
              <Printer size={18} />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition">
              <Download size={16} />
              Invoice
            </button>
            {canCancel && (
              <button
                onClick={() => setShowCancelModal(true)}
                className="px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition"
              >
                Cancel Order
              </button>
            )}
          </div>
        </div>

        {/* Order Status Banner */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <OrderStatusBadge status={order.status} />
              <span className="text-sm text-gray-500">
                Order {order.status === 'DELIVERED' ? 'completed' : 'in progress'}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              Total: <span className="font-bold text-gray-800">₹{order.total?.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Order Items</h3>
              <div className="space-y-4">
                {order.items?.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0">
                    <img
                      src={item.image || '/images/placeholder.png'}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover bg-gray-100"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      {item.variant && (
                        <p className="text-xs text-gray-400">Variant: {item.variant}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">₹{item.price}</p>
                      <p className="text-xs text-gray-500">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-gray-800">₹{order.subtotal?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-gray-800">₹{order.shippingCost || 0}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-sm text-emerald-600">
                    <span>Discount</span>
                    <span>-₹{order.discount}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-gray-800 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-emerald-600">₹{order.total?.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-800 mb-3">Payment Information</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500">Payment Method</p>
                  <p className="font-medium text-gray-800 capitalize">
                    {order.paymentMethod || 'Card'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Payment Status</p>
                  <span className={`font-medium ${order.paymentStatus === 'PAID' ? 'text-emerald-600' : 'text-yellow-600'}`}>
                    {order.paymentStatus || 'Pending'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Order Timeline */}
            <OrderTimeline
              status={order.status}
              createdAt={order.createdAt}
              updatedAt={order.updatedAt}
            />

            {/* Shipping Details */}
            <ShippingDetails
              address={order.shippingAddress}
              status={order.status}
              createdAt={order.createdAt}
            />
          </div>
        </div>
      </div>

      {/* Cancel Modal */}
      <ConfirmModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleCancelOrder}
        title="Cancel Order"
        message="Are you sure you want to cancel this order? This action cannot be undone."
        confirmText="Yes, Cancel Order"
        type="danger"
      />
    </div>
  );
};

export default OrderDetailsPage;