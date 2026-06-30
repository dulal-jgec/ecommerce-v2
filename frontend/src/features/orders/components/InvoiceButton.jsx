// src/features/orders/components/InvoiceButton.jsx
import React, { useState } from 'react';
import { Download, Printer, FileText, Loader, Check } from 'lucide-react';

const InvoiceButton = ({ 
  orderId, 
  order, 
  onDownload, 
  onPrint,
  variant = 'primary' // primary | secondary | outline
}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      if (onDownload) {
        await onDownload(orderId);
      } else {
        // Default download - generate invoice data
        await generateAndDownloadInvoice(order);
      }
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error downloading invoice:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    if (onPrint) {
      onPrint(orderId);
    } else {
      window.print();
    }
  };

  const generateAndDownloadInvoice = (orderData) => {
    // Create invoice HTML
    const invoiceHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice #${orderData?.id || orderId}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; }
          .header { display: flex; justify-content: space-between; border-bottom: 2px solid #10b981; padding-bottom: 20px; }
          .company { font-size: 24px; font-weight: bold; color: #10b981; }
          .invoice-title { font-size: 20px; color: #1f2937; }
          .details { display: flex; justify-content: space-between; margin-top: 30px; }
          .section { margin-top: 30px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
          th { background-color: #f3f4f6; font-weight: 600; }
          .total { font-size: 18px; font-weight: bold; text-align: right; margin-top: 20px; }
          .footer { margin-top: 40px; text-align: center; color: #9ca3af; font-size: 12px; border-top: 1px solid #e5e7eb; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="company">ShopLy</div>
            <div style="color: #6b7280; font-size: 14px;">123, Tech Park, Bangalore</div>
            <div style="color: #6b7280; font-size: 14px;">support@shoply.com | +91 98765 43210</div>
          </div>
          <div style="text-align: right;">
            <div class="invoice-title">INVOICE</div>
            <div style="color: #6b7280; font-size: 14px;">#${orderData?.id || orderId}</div>
            <div style="color: #6b7280; font-size: 14px;">Date: ${new Date().toLocaleDateString()}</div>
          </div>
        </div>

        <div class="details">
          <div>
            <h3>Bill To:</h3>
            <p style="margin: 5px 0;"><strong>${orderData?.shippingAddress?.fullName || 'Customer'}</strong></p>
            <p style="margin: 5px 0; color: #6b7280;">${orderData?.shippingAddress?.street || ''}</p>
            <p style="margin: 5px 0; color: #6b7280;">${orderData?.shippingAddress?.city || ''}, ${orderData?.shippingAddress?.state || ''}</p>
            <p style="margin: 5px 0; color: #6b7280;">${orderData?.shippingAddress?.phone || ''}</p>
          </div>
          <div>
            <h3>Order Details:</h3>
            <p style="margin: 5px 0; color: #6b7280;">Status: ${orderData?.status || 'Confirmed'}</p>
            <p style="margin: 5px 0; color: #6b7280;">Payment: ${orderData?.paymentStatus || 'Pending'}</p>
          </div>
        </div>

        <div class="section">
          <h3>Items</h3>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${orderData?.items?.map((item, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${item.productName}</td>
                  <td>${item.quantity}</td>
                  <td>₹${item.price}</td>
                  <td>₹${item.price * item.quantity}</td>
                </tr>
              `).join('') || '<tr><td colspan="5">No items</td></tr>'}
            </tbody>
          </table>
        </div>

        <div class="total">
          <p>Subtotal: ₹${orderData?.subtotal?.toLocaleString() || 0}</p>
          ${orderData?.shippingCost ? `<p>Shipping: ₹${orderData.shippingCost}</p>` : ''}
          ${orderData?.discount ? `<p>Discount: -₹${orderData.discount}</p>` : ''}
          <p style="font-size: 24px; color: #10b981;">Total: ₹${orderData?.total?.toLocaleString() || 0}</p>
        </div>

        <div class="footer">
          <p>Thank you for shopping with ShopLy!</p>
          <p>This is a system generated invoice.</p>
        </div>
      </body>
      </html>
    `;

    // Create download
    const blob = new Blob([invoiceHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Invoice_${orderData?.id || orderId}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Variant styles
  const styles = {
    primary: 'bg-emerald-600 text-white hover:bg-emerald-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    outline: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50',
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleDownload}
        disabled={loading}
        className={`
          flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all
          ${styles[variant] || styles.primary}
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        {loading ? (
          <Loader size={16} className="animate-spin" />
        ) : success ? (
          <Check size={16} className="text-white" />
        ) : (
          <Download size={16} />
        )}
        {loading ? 'Generating...' : success ? 'Downloaded!' : 'Download Invoice'}
      </button>

      <button
        onClick={handlePrint}
        className="p-2.5 border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition"
        title="Print Invoice"
      >
        <Printer size={18} />
      </button>
    </div>
  );
};

export default InvoiceButton;