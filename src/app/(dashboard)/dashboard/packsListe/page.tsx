// 'use client';

// import React, { useState } from 'react';
// import { BaseEntity, TableAction, TableColumn } from '@/types/type';
// import { Package, Palette, Layers } from 'lucide-react';
// import CreativeTable from '@/components/dashboard/CreativeTable';

// // Exemples d'entités
// interface Product extends BaseEntity {
//   price: number;
//   category: string;
//   stock: number;
// }

// interface Category extends BaseEntity {
//   description: string;
//   productCount: number;
// }

// interface Variant extends BaseEntity {
//   color: string;
//   size: string;
//   sku: string;
// }

// const ExampleUsage: React.FC = () => {
//   const [selectedTab, setSelectedTab] = useState<'products' | 'categories' | 'variants'>('products');

//   // Données d'exemple
//   const products: Product[] = [
//     { id: '1', name: 'iPhone 15 Pro', price: 1199, category: 'Smartphones', stock: 25 },
//     { id: '2', name: 'MacBook Air M2', price: 1299, category: 'Ordinateurs', stock: 12 },
//     { id: '3', name: 'AirPods Pro', price: 279, category: 'Audio', stock: 50 },
//   ];

//   const categories: Category[] = [
//     { id: '1', name: 'Smartphones', description: 'Téléphones intelligents', productCount: 15 },
//     { id: '2', name: 'Ordinateurs', description: 'Laptops et desktops', productCount: 8 },
//     { id: '3', name: 'Audio', description: 'Écouteurs et haut-parleurs', productCount: 22 },
//   ];

//   const variants: Variant[] = [
//     { id: '1', name: 'iPhone Noir 128Go', color: '#000000', size: '128Go', sku: 'IPH-BLK-128' },
//     { id: '2', name: 'iPhone Blanc 256Go', color: '#FFFFFF', size: '256Go', sku: 'IPH-WHT-256' },
//     { id: '3', name: 'iPhone Bleu 512Go', color: '#0066CC', size: '512Go', sku: 'IPH-BLU-512' },
//   ];

//   // Actions personnalisées
//   const productActions: TableAction[] = [
//     {
//       type: 'view',
//       label: 'Voir détails',
//       icon: <Package className="w-4 h-4" />,
//       className: 'text-blue-600 hover:bg-blue-50',
//       onClick: (item) => alert(`Voir produit: ${item.name}`)
//     },
//     {
//       type: 'edit',
//       label: 'Modifier',
//       icon: <Palette className="w-4 h-4" />,
//       className: 'text-green-600 hover:bg-green-50',
//       onClick: (item) => alert(`Modifier: ${item.name}`)
//     },
//     {
//       type: 'delete',
//       label: 'Supprimer',
//       icon: <Layers className="w-4 h-4" />,
//       className: 'text-red-600 hover:bg-red-50',
//       onClick: (item) => alert(`Supprimer: ${item.name}`)
//     }
//   ];

//   // Colonnes personnalisées pour les produits
//   const productColumns: TableColumn[] = [
//     {
//       key: 'name',
//       label: 'Produit',
//       sortable: true,
//       render: (item) => (
//         <div className="flex items-center">
//           <div className="w-8 h-8 bg-firstColor/10 rounded-lg flex items-center justify-center mr-3">
//             <Package className="w-4 h-4 text-firstColor" />
//           </div>
//           <span className="font-medium">{item.name}</span>
//         </div>
//       )
//     },
//     {
//       key: 'price',
//       label: 'Prix',
//       sortable: true,
//       render: (item) => (
//         <span className="font-semibold text-firstColor">
//           {(item as Product).price}€
//         </span>
//       )
//     },
//     {
//       key: 'stock',
//       label: 'Stock',
//       sortable: true,
//       render: (item) => {
//         const stock = (item as Product).stock;
//         return (
//           <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//             stock > 20 ? 'bg-green-100 text-green-800' :
//             stock > 5 ? 'bg-yellow-100 text-yellow-800' :
//             'bg-red-100 text-red-800'
//           }`}>
//             {stock} unités
//           </span>
//         );
//       }
//     }
//   ];

//   // Colonnes pour les variants
//   const variantColumns: TableColumn[] = [
//     {
//       key: 'name',
//       label: 'Variant',
//       sortable: true,
//       render: (item) => (
//         <div className="flex items-center">
//           <div 
//             className="w-6 h-6 rounded-full border-2 border-gray-300 mr-3"
//             style={{ backgroundColor: (item as Variant).color }}
//           />
//           <span className="font-medium">{item.name}</span>
//         </div>
//       )
//     },
//     {
//       key: 'sku',
//       label: 'SKU',
//       sortable: true,
//       render: (item) => (
//         <code className="bg-gray-100 px-2 py-1 rounded text-sm">
//           {(item as Variant).sku}
//         </code>
//       )
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Navigation des onglets */}
//         <div className="mb-6">
//           <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm">
//             {[
//               { key: 'products', label: 'Produits', icon: Package },
//               { key: 'categories', label: 'Catégories', icon: Layers },
//               { key: 'variants', label: 'Variants', icon: Palette }
//             ].map(({ key, label, icon: Icon }) => (
//               <button
//                 key={key}
//                 onClick={() => setSelectedTab(key as any)}
//                 className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
//                   selectedTab === key
//                     ? 'bg-firstColor text-white'
//                     : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
//                 }`}
//               >
//                 <Icon className="w-4 h-4" />
//                 <span>{label}</span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Tableaux */}
//         {selectedTab === 'products' && (
//           <CreativeTable
//             data={products}
//             title="Gestion des Produits"
//             subtitle="Gérez votre catalogue de produits"
//             columns={productColumns}
//             actions={productActions}
//             onAdd={() => alert('Ajouter un produit')}
//             onSearch={(query) => console.log('Recherche produits:', query)}
//           />
//         )}

//         {selectedTab === 'categories' && (
//           <CreativeTable
//             data={categories}
//             title="Gestion des Catégories"
//             subtitle="Organisez vos catégories de produits"
//             onAdd={() => alert('Ajouter une catégorie')}
//             onSearch={(query) => console.log('Recherche catégories:', query)}
//           />
//         )}

//         {selectedTab === 'variants' && (
//           <CreativeTable
//             data={variants}
//             title="Gestion des Variants"
//             subtitle="Gérez les différentes variantes de vos produits"
//             columns={variantColumns}
//             actions={productActions}
//             onAdd={() => alert('Ajouter un variant')}
//             onSearch={(query) => console.log('Recherche variants:', query)}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ExampleUsage

'use client';

import React from 'react';
import { BaseEntity, EntityTableAction } from '@/types/type';
import { Eye, Edit, Trash2 } from 'lucide-react';
import EntityTable from '@/components/dashboard/CreativeTable';

const SimpleTableExample: React.FC = () => {
  // Données d'exemple
  const products: BaseEntity[] = [
    { id: '1', name: 'iPhone 15 Pro Max' },
    { id: '2', name: 'MacBook Air M2' },
    { id: '3', name: 'AirPods Pro 2' },
    { id: '4', name: 'iPad Air' },
    { id: '5', name: 'Apple Watch Series 9' },
  ];

  const categories: BaseEntity[] = [
    { id: '1', name: 'Smartphones' },
    { id: '2', name: 'Ordinateurs' },
    { id: '3', name: 'Audio' },
    { id: '4', name: 'Tablettes' },
  ];

  const variants: BaseEntity[] = [
    { id: '1', name: 'iPhone Noir 128Go' },
    { id: '2', name: 'iPhone Blanc 256Go' },
    { id: '3', name: 'iPhone Bleu 512Go' },
    { id: '4', name: 'MacBook Silver 8GB' },
    { id: '5', name: 'MacBook Space Gray 16GB' },
  ];

  // Actions personnalisées
  const customActions: EntityTableAction[] = [
    {
      type: 'view',
      label: 'Voir détails',
      icon: <Eye className="w-4 h-4" />,
      className: 'text-blue-600 hover:text-blue-800 hover:bg-blue-50',
      onClick: (item) => alert(`Voir: ${item.name}`)
    },
    {
      type: 'edit',
      label: 'Modifier',
      icon: <Edit className="w-4 h-4" />,
      className: 'text-green-600 hover:text-green-800 hover:bg-green-50',
      onClick: (item) => alert(`Modifier: ${item.name}`)
    },
    {
      type: 'delete',
      label: 'Supprimer',
      icon: <Trash2 className="w-4 h-4" />,
      className: 'text-red-600 hover:text-red-800 hover:bg-red-50',
      onClick: (item) => {
        if (confirm(`Êtes-vous sûr de vouloir supprimer "${item.name}" ?`)) {
          alert(`Supprimé: ${item.name}`);
        }
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Tableau des Produits */}
        <EntityTable
          data={products}
          title="Produits"
          actions={customActions}
          onSearch={(query) => console.log('Recherche produits:', query)}
          emptyMessage="Aucun produit trouvé"
        />

        {/* Tableau des Catégories */}
        <EntityTable
          data={categories}
          title="Catégories"
          actions={customActions}
          onSearch={(query) => console.log('Recherche catégories:', query)}
          emptyMessage="Aucune catégorie trouvée"
        />

        {/* Tableau des Variants */}
        <EntityTable
          data={variants}
          title="Variants"
          actions={customActions}
          onSearch={(query) => console.log('Recherche variants:', query)}
          emptyMessage="Aucun variant trouvé"
        />
      </div>
    </div>
  );
};

export default SimpleTableExample;