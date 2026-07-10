import React from "react";
import { 
  Edit, 
  Trash2, 
  FolderTree,
  Image as ImageIcon,
  Check,
  X,
  Package
} from "lucide-react";

const CategoryTable = ({ categories, onEdit, onDelete }) => {
  const getStatusBadge = (active) => {
    if (active !== false) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
          <Check size={12} />
          Active
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
        <X size={12} />
        Inactive
      </span>
    );
  };

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-50/50 to-purple-50/50 border-b border-gray-200/50">
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <FolderTree size={14} />
                  Category
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100/50">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-white/50 transition group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-white shadow-sm flex-shrink-0">
                      {category.imageUrl ? (
                        <img
                          src={category.imageUrl}
                          alt={category.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon size={20} className="text-gray-300" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-800 line-clamp-1">
                        {category.name}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {category.imageUrl ? (
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className="w-12 h-12 rounded-lg object-cover shadow-sm"
                    />
                  ) : (
                    <span className="text-sm text-gray-400">No image</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(category.active)}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onEdit && onEdit(category)}
                      className="p-2 hover:bg-indigo-50 rounded-xl transition text-gray-400 hover:text-indigo-600 group-hover:scale-110"
                      title="Edit Category"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => onDelete && onDelete(category)}
                      className="p-2 hover:bg-red-50 rounded-xl transition text-gray-400 hover:text-red-600 group-hover:scale-110"
                      title="Delete Category"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {categories.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-inner">
                      <FolderTree size={48} className="text-gray-300" />
                    </div>
                    <div>
                      <p className="text-gray-500 font-bold text-xl">No categories found</p>
                      <p className="text-sm text-gray-400 mt-1">Add your first category to get started</p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {categories.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-100/50 flex items-center justify-between bg-gradient-to-r from-gray-50/50 to-white/50">
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <FolderTree size={14} className="text-gray-400" />
            Showing <span className="font-semibold text-gray-700">{categories.length}</span> categories
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryTable;