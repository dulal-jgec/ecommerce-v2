// src/features/admin/components/ReportsTable.jsx
import React from 'react';
import { Eye, Download, Mail, Calendar, Database } from 'lucide-react';

const ReportsTable = ({ reports }) => {
  const getStatusBadge = (status) => {
    const styles = {
      'Ready': 'bg-emerald-50 text-emerald-700',
      'Processing': 'bg-yellow-50 text-yellow-700',
      'Failed': 'bg-red-50 text-red-700',
    };
    return (
      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${styles[status] || 'bg-gray-50 text-gray-700'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Generated</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {reports.map((report) => {
            const Icon = report.icon;
            return (
              <tr key={report.id} className="hover:bg-gray-50/50 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${report.color} text-white`}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-800">{report.title}</p>
                      <p className="text-xs text-gray-400">{report.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 capitalize">{report.type}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{report.lastGenerated}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{report.size}</td>
                <td className="px-6 py-4">{getStatusBadge(report.status)}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-indigo-600">
                      <Eye size={16} />
                    </button>
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-blue-600">
                      <Download size={16} />
                    </button>
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-emerald-600">
                      <Mail size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsTable;