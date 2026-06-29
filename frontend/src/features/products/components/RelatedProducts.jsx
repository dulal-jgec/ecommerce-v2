// // src/features/products/components/RelatedProducts.jsx
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Star, ShoppingCart } from "lucide-react";
// import getProductsByCategory from "../services/productService";

// const RelatedProducts = ({ category, currentProductId }) => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadRelated = async () => {
//       try {
//         if (!category) return;
//         const data = await getProductsByCategory(category);
//         setProducts(data.filter((p) => p.id !== currentProductId).slice(0, 4));
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadRelated();
//   }, [category, currentProductId]);

//   if (loading) {
//     return (
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//         {[...Array(4)].map((_, i) => (
//           <div
//             key={i}
//             className="h-64 bg-gray-200 rounded-2xl animate-pulse"
//           ></div>
//         ))}
//       </div>
//     );
//   }

//   if (products.length === 0) {
//     return null;
//   }

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">You May Also Like</h2>
//         <Link
//           to="/shop"
//           className="text-indigo-600 font-medium hover:text-indigo-700 transition text-sm"
//         >
//           View All →
//         </Link>
//       </div>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
//         {products.map((product) => (
//           <div
//             key={product.id}
//             className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
//           >
//             <Link to={`/product/${product.id}`}>
//               <div className="h-48 bg-gray-50 p-4 flex items-center justify-center">
//                 <img
//                   src={
//                     product.images?.[0]?.imageUrl || "/images/placeholder.png"
//                   }
//                   alt={product.name}
//                   className="h-32 object-contain group-hover:scale-105 transition-transform duration-300"
//                 />
//               </div>
//             </Link>
//             <div className="p-4">
//               <Link to={`/product/${product.id}`}>
//                 <h3 className="font-semibold text-sm text-gray-800 hover:text-indigo-600 transition line-clamp-1">
//                   {product.name}
//                 </h3>
//               </Link>
//               <div className="flex items-center gap-1 mt-1">
//                 <Star size={12} className="fill-yellow-400 text-yellow-400" />
//                 <span className="text-xs font-medium">
//                   {product.averageRating || 0}
//                 </span>
//               </div>
//               <div className="flex items-center gap-2 mt-2">
//                 <span className="text-lg font-bold text-gray-800">
//                   ₹{product.price?.toLocaleString()}
//                 </span>
//                 {product.originalPrice && (
//                   <span className="text-xs text-gray-400 line-through">
//                     ₹{product.originalPrice?.toLocaleString()}
//                   </span>
//                 )}
//               </div>
//               <button className="w-full mt-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-medium hover:bg-indigo-700 transition flex items-center justify-center gap-1">
//                 <ShoppingCart size={14} />
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RelatedProducts;
import React from 'react'

const RelatedProducts = () => {
  return (
    <div>
      Baad main 
    </div>
  )
}

export default RelatedProducts

