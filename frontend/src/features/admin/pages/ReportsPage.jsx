// src/features/admin/pages/ReportsPage.jsx
import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter, 
  ChevronDown,
  BarChart3,
  PieChart,
  LineChart,
  Printer,
  Mail,
  FileSpreadsheet,
  FileJson,
  Eye,
  Clock,
  Database,
  Users,
  ShoppingBag,
  TrendingUp
} from 'lucide-react';

const ReportsPage = () => {
  const [reportType, setReportType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const reports = [
    {
      id: 1,
      title: 'Sales Report',
      description: 'Complete sales overview with revenue breakdown',
      type: 'sales',
      icon: BarChart3,
      color: 'from-blue-500 to-blue-600',
      lastGenerated: '25 Jun 2025',
      size: '2.4 MB',
      status: 'Ready'
    },
    {
      id: 2,
      title: 'Product Performance',
      description: 'Top selling products and category analysis',
      type: 'products',
      icon: PieChart,
      color: 'from-emerald-500 to-emerald-600',
      lastGenerated: '24 Jun 2025',
      size: '1.8 MB',
      status: 'Ready'
    },
    {
      id: 3,
      title: 'User Analytics',
      description: 'User growth, engagement and retention metrics',
      type: 'users',
      icon: LineChart,
      color: 'from-purple-500 to-purple-600',
      lastGenerated: '23 Jun 2025',
      size: '3.1 MB',
      status: 'Processing'
    },
    {
      id: 4,
      title: 'Seller Performance',
      description: 'Top sellers and revenue contribution analysis',
      type: 'sellers',
      icon: BarChart3,
      color: 'from-orange-500 to-orange-600',
      lastGenerated: '22 Jun 2025',
      size: '1.2 MB',
      status: 'Ready'
    },
    {
      id: 5,
      title: 'Inventory Report',
      description: 'Stock levels and inventory turnover analysis',
      type: 'inventory',
      icon: PieChart,
      color: 'from-red-500 to-red-600',
      lastGenerated: '21 Jun 2025',
      size: '0.9 MB',
      status: 'Ready'
    },
    {
      id: 6,
      title: 'Order Fulfillment',
      description: 'Order processing time and delivery performance',
      type: 'orders',
      icon: LineChart,
      color: 'from-teal-500 to-teal-600',
      lastGenerated: '20 Jun 2025',
      size: '2.1 MB',
      status: 'Failed'
    },
  ];

  const stats = [
    { label: 'Total Reports', value: '24', icon: FileText, color: 'bg-indigo-50 text-indigo-600' },
    { label: 'Ready', value: '18', icon: CheckCircle, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Processing', value: '4', icon: Clock, color: 'bg-yellow-50 text-yellow-600' },
    { label: 'Failed', value: '2', icon: AlertCircle, color: 'bg-red-50 text-red-600' },
  ];

  const filteredReports = reports.filter(r => {
    const matchesType = reportType === 'all' || r.type === reportType;
    const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         r.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getStatusBadge = (status) => {
    const styles = {
      Ready: 'bg-emerald-50 text-emerald-700',
      Processing: 'bg-yellow-50 text-yellow-700',
      Failed: 'bg-red-50 text-red-700'
    };
    return (
      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${styles[status] || 'bg-gray-50 text-gray-700'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
          <p className="text-gray-500 text-sm">Generate and export platform reports</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
            <FileText size={16} />
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${stat.color}`}>
                <stat.icon size={18} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-sm"
            />
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition appearance-none"
              >
                <option value="all">All Types</option>
                <option value="sales">Sales</option>
                <option value="products">Products</option>
                <option value="users">Users</option>
                <option value="sellers">Sellers</option>
                <option value="inventory">Inventory</option>
                <option value="orders">Orders</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            <button className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm hover:bg-gray-100 transition flex items-center gap-2">
              <Calendar size={16} />
              Date Range
            </button>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map((report) => {
          const Icon = report.icon;
          return (
            <div key={report.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${report.color} text-white`}>
                  <Icon size={20} />
                </div>
                {getStatusBadge(report.status)}
              </div>
              
              <h3 className="font-semibold text-gray-800 text-lg">{report.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{report.description}</p>
              
              <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {report.lastGenerated}
                </span>
                <span className="flex items-center gap-1">
                  <Database size={14} />
                  {report.size}
                </span>
              </div>

              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                <button className="flex-1 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition flex items-center justify-center gap-2">
                  <Download size={14} />
                  Download
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-xl transition text-gray-400 hover:text-gray-600">
                  <Eye size={18} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-xl transition text-gray-400 hover:text-gray-600">
                  <Mail size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredReports.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
          <FileText size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-600">No Reports Found</h3>
          <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
        </div>
      )}

      {/* Export Options */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Quick Export</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Export as PDF', icon: FileText, color: 'bg-red-50 text-red-600 hover:bg-red-100' },
            { label: 'Export as Excel', icon: FileSpreadsheet, color: 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' },
            { label: 'Export as CSV', icon: FileJson, color: 'bg-blue-50 text-blue-600 hover:bg-blue-100' },
            { label: 'Print Report', icon: Printer, color: 'bg-purple-50 text-purple-600 hover:bg-purple-100' },
          ].map((option, index) => (
            <button
              key={index}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition ${option.color}`}
            >
              <option.icon size={16} />
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Missing imports for stats
const CheckCircle = () => null;
const AlertCircle = () => null;

export default ReportsPage;