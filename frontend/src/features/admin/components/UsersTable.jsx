// src/features/admin/components/UsersTable.jsx
import React from 'react';
import { Eye, Edit, Trash2, Mail, Phone } from 'lucide-react';

const UsersTable = ({ users }) => {
  const getRoleBadge = (role) => {
    const styles = {
      'Admin': 'bg-red-50 text-red-700',
      'Seller': 'bg-purple-50 text-purple-700',
      'Buyer': 'bg-blue-50 text-blue-700',
    };
    return (
      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${styles[role] || 'bg-gray-50 text-gray-700'}`}>
        {role}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const styles = {
      'Active': 'bg-emerald-50 text-emerald-700',
      'Inactive': 'bg-red-50 text-red-700',
      'Pending': 'bg-yellow-50 text-yellow-700',
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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50/50 transition">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-semibold">
                    {user.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-800">{user.name}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-xs text-gray-400">{user.phone}</p>
                </div>
              </td>
              <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
              <td className="px-6 py-4">{getStatusBadge(user.status)}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{user.joined}</td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-indigo-600">
                    <Eye size={16} />
                  </button>
                  <button className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-blue-600">
                    <Edit size={16} />
                  </button>
                  <button className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-red-600">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;