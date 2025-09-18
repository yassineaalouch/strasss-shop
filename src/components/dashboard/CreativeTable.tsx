// 'use client';

// import React, { useState, useMemo } from 'react';
// import { 
//   Search, 
//   Plus, 
//   Eye, 
//   Edit, 
//   Trash2, 
//   ChevronDown, 
//   ChevronUp,
//   MoreVertical,
//   Grid,
//   List
// } from 'lucide-react';
// import { BaseEntity, CreativeTableProps, TableAction, TableColumn } from '@/types/type';

// const CreativeTable: React.FC<CreativeTableProps> = ({
//   data,
//   title,
//   subtitle,
//   columns = [],
//   actions = [],
//   onAdd,
//   onSearch,
//   onSort,
//   loading = false,
//   emptyMessage = "Aucun élément trouvé",
//   showSearch = true,
//   showAddButton = true
// }) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sortField, setSortField] = useState<string>('');
//   const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
//   const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
//   const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

//   // Actions par défaut
//   const defaultActions: TableAction[] = [
//     {
//       type: 'view',
//       label: 'Voir',
//       icon: <Eye className="w-4 h-4" />,
//       className: 'text-blue-600 hover:text-blue-800',
//       onClick: (item) => console.log('Voir:', item)
//     },
//     {
//       type: 'edit',
//       label: 'Modifier',
//       icon: <Edit className="w-4 h-4" />,
//       className: 'text-green-600 hover:text-green-800',
//       onClick: (item) => console.log('Modifier:', item)
//     },
//     {
//       type: 'delete',
//       label: 'Supprimer',
//       icon: <Trash2 className="w-4 h-4" />,
//       className: 'text-red-600 hover:text-red-800',
//       onClick: (item) => console.log('Supprimer:', item)
//     }
//   ];

//   const finalActions = actions.length > 0 ? actions : defaultActions;

//   // Filtrage et tri des données
//   const filteredAndSortedData = useMemo(() => {
//     const filtered = data.filter(item =>
//       item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.id.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     if (sortField) {
//       filtered.sort((a, b) => {
//         const aValue = (a as any)[sortField];
//         const bValue = (b as any)[sortField];
        
//         if (sortDirection === 'asc') {
//           return aValue > bValue ? 1 : -1;
//         } else {
//           return aValue < bValue ? 1 : -1;
//         }
//       });
//     }

//     return filtered;
//   }, [data, searchQuery, sortField, sortDirection]);

//   const handleSearch = (query: string) => {
//     setSearchQuery(query);
//     onSearch?.(query);
//   };

//   const handleSort = (field: string) => {
//     const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
//     setSortField(field);
//     setSortDirection(newDirection);
//     onSort?.(field, newDirection);
//   };

//   const toggleSelectItem = (id: string) => {
//     const newSelected = new Set(selectedItems);
//     if (newSelected.has(id)) {
//       newSelected.delete(id);
//     } else {
//       newSelected.add(id);
//     }
//     setSelectedItems(newSelected);
//   };

//   const toggleSelectAll = () => {
//     if (selectedItems.size === filteredAndSortedData.length) {
//       setSelectedItems(new Set());
//     } else {
//       setSelectedItems(new Set(filteredAndSortedData.map(item => item.id)));
//     }
//   };

//   // Colonnes par défaut
//   const defaultColumns: TableColumn[] = [
//     {
//       key: 'id',
//       label: 'ID',
//       sortable: true,
//       render: (item) => (
//         <span className="font-mono text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
//           {item.id.slice(0, 8)}...
//         </span>
//       )
//     },
//     {
//       key: 'name',
//       label: 'Nom',
//       sortable: true,
//       render: (item) => (
//         <div className="font-medium text-gray-900">{item.name}</div>
//       )
//     }
//   ];

//   const finalColumns = columns.length > 0 ? columns : defaultColumns;

//   if (loading) {
//     return <TableSkeleton />;
//   }

//   return (
//     <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//       {/* En-tête du tableau */}
//       <div className="bg-gradient-to-r from-firstColor to-firstColor/80 p-6 text-white">
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//           <div>
//             <h2 className="text-2xl font-bold">{title}</h2>
//             {subtitle && <p className="text-white/80 mt-1">{subtitle}</p>}
//           </div>
          
//           <div className="flex items-center space-x-4">
//             {/* Compteur */}
//             <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
//               <span className="text-sm font-medium">
//                 {filteredAndSortedData.length} élément(s)
//               </span>
//             </div>
            
//             {/* Bouton d'ajout */}
//             {showAddButton && onAdd && (
//               <button
//                 onClick={onAdd}
//                 className="bg-white text-firstColor px-4 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center space-x-2"
//               >
//                 <Plus className="w-4 h-4" />
//                 <span>Ajouter</span>
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Barre d'outils */}
//       <div className="border-b border-gray-200 p-4">
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//           {/* Recherche */}
//           {showSearch && (
//             <div className="relative flex-1 max-w-md">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//               <input
//                 type="text"
//                 placeholder="Rechercher..."
//                 value={searchQuery}
//                 onChange={(e) => handleSearch(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-firstColor focus:border-firstColor transition-colors"
//               />
//             </div>
//           )}

//           <div className="flex items-center space-x-3">
//             {/* Sélection multiple actions */}
//             {selectedItems.size > 0 && (
//               <div className="flex items-center space-x-2 bg-firstColor/10 text-firstColor px-3 py-1 rounded-lg">
//                 <span className="text-sm font-medium">
//                   {selectedItems.size} sélectionné(s)
//                 </span>
//                 <button className="text-red-600 hover:text-red-800">
//                   <Trash2 className="w-4 h-4" />
//                 </button>
//               </div>
//             )}

//             {/* Boutons de vue */}
//             <div className="flex border border-gray-300 rounded-lg overflow-hidden">
//               <button
//                 onClick={() => setViewMode('table')}
//                 className={`p-2 transition-colors ${
//                   viewMode === 'table' 
//                     ? 'bg-firstColor text-white' 
//                     : 'bg-white text-gray-600 hover:bg-gray-50'
//                 }`}
//               >
//                 <List className="w-4 h-4" />
//               </button>
//               <button
//                 onClick={() => setViewMode('grid')}
//                 className={`p-2 transition-colors ${
//                   viewMode === 'grid' 
//                     ? 'bg-firstColor text-white' 
//                     : 'bg-white text-gray-600 hover:bg-gray-50'
//                 }`}
//               >
//                 <Grid className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Contenu */}
//       {filteredAndSortedData.length === 0 ? (
//         <div className="text-center py-12">
//           <div className="text-gray-400 mb-4">
//             <Search className="w-16 h-16 mx-auto" />
//           </div>
//           <h3 className="text-lg font-medium text-gray-900 mb-2">
//             {emptyMessage}
//           </h3>
//           <p className="text-gray-500">
//             {searchQuery ? 'Essayez de modifier votre recherche' : 'Commencez par ajouter des éléments'}
//           </p>
//         </div>
//       ) : viewMode === 'table' ? (
//         <TableView 
//           data={filteredAndSortedData}
//           columns={finalColumns}
//           actions={finalActions}
//           selectedItems={selectedItems}
//           onSelectItem={toggleSelectItem}
//           onSelectAll={toggleSelectAll}
//           onSort={handleSort}
//           sortField={sortField}
//           sortDirection={sortDirection}
//         />
//       ) : (
//         <GridView 
//           data={filteredAndSortedData}
//           actions={finalActions}
//           selectedItems={selectedItems}
//           onSelectItem={toggleSelectItem}
//         />
//       )}
//     </div>
//   );
// };



// interface TableViewProps {
//   data: BaseEntity[];
//   columns: TableColumn[];
//   actions: TableAction[];
//   selectedItems: Set<string>;
//   onSelectItem: (id: string) => void;
//   onSelectAll: () => void;
//   onSort: (field: string) => void;
//   sortField: string;
//   sortDirection: 'asc' | 'desc';
// }

// const TableView: React.FC<TableViewProps> = ({
//   data,
//   columns,
//   actions,
//   selectedItems,
//   onSelectItem,
//   onSelectAll,
//   onSort,
//   sortField,
//   sortDirection
// }) => {
//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full">
//         <thead className="bg-gray-50">
//           <tr>
//             {/* Checkbox pour sélection */}
//             <th className="w-12 px-4 py-3">
//               <input
//                 type="checkbox"
//                 checked={selectedItems.size === data.length && data.length > 0}
//                 onChange={onSelectAll}
//                 className="rounded border-gray-300 text-firstColor focus:ring-firstColor"
//               />
//             </th>
            
//             {/* Colonnes */}
//             {columns.map((column) => (
//               <th
//                 key={column.key}
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 {column.sortable ? (
//                   <button
//                     onClick={() => onSort(column.key)}
//                     className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
//                   >
//                     <span>{column.label}</span>
//                     {sortField === column.key && (
//                       sortDirection === 'asc' ? 
//                         <ChevronUp className="w-4 h-4" /> : 
//                         <ChevronDown className="w-4 h-4" />
//                     )}
//                   </button>
//                 ) : (
//                   column.label
//                 )}
//               </th>
//             ))}
            
//             {/* Actions */}
//             <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Actions
//             </th>
//           </tr>
//         </thead>
        
//         <tbody className="bg-white divide-y divide-gray-200">
//           {data.map((item, index) => (
//             <tr 
//               key={item.id}
//               className={`hover:bg-gray-50 transition-colors ${
//                 selectedItems.has(item.id) ? 'bg-firstColor/5' : ''
//               }`}
//             >
//               {/* Checkbox */}
//               <td className="px-4 py-4">
//                 <input
//                   type="checkbox"
//                   checked={selectedItems.has(item.id)}
//                   onChange={() => onSelectItem(item.id)}
//                   className="rounded border-gray-300 text-firstColor focus:ring-firstColor"
//                 />
//               </td>
              
//               {/* Données */}
//               {columns.map((column) => (
//                 <td key={column.key} className="px-6 py-4 whitespace-nowrap">
//                   {column.render ? 
//                     column.render(item) : 
//                     (item as any)[column.key]
//                   }
//                 </td>
//               ))}
              
//               {/* Actions */}
//               <td className="px-6 py-4 whitespace-nowrap text-right">
//                 <div className="flex items-center justify-end space-x-2">
//                   {actions.map((action, actionIndex) => (
//                     <button
//                       key={actionIndex}
//                       onClick={() => action.onClick(item)}
//                       className={`p-2 rounded-lg transition-colors ${
//                         action.className || 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
//                       }`}
//                       title={action.label}
//                     >
//                       {action.icon}
//                     </button>
//                   ))}
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// interface GridViewProps {
//   data: BaseEntity[];
//   actions: TableAction[];
//   selectedItems: Set<string>;
//   onSelectItem: (id: string) => void;
// }

// const GridView: React.FC<GridViewProps> = ({
//   data,
//   actions,
//   selectedItems,
//   onSelectItem
// }) => {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
//       {data.map((item) => (
//         <div
//           key={item.id}
//           className={`bg-white border-2 rounded-xl p-4 transition-all hover:shadow-lg ${
//             selectedItems.has(item.id) 
//               ? 'border-firstColor shadow-md' 
//               : 'border-gray-200 hover:border-gray-300'
//           }`}
//         >
//           {/* En-tête de la carte */}
//           <div className="flex items-start justify-between mb-3">
//             <input
//               type="checkbox"
//               checked={selectedItems.has(item.id)}
//               onChange={() => onSelectItem(item.id)}
//               className="rounded border-gray-300 text-firstColor focus:ring-firstColor"
//             />
//             <div className="relative">
//               <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
//                 <MoreVertical className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
          
//           {/* Contenu */}
//           <div className="mb-4">
//             <h3 className="font-semibold text-gray-900 mb-2 truncate" title={item.name}>
//               {item.name}
//             </h3>
//             <p className="text-sm text-gray-500 font-mono">
//               ID: {item.id.slice(0, 8)}...
//             </p>
//           </div>
          
//           {/* Actions */}
//           <div className="flex items-center justify-between pt-3 border-t border-gray-100">
//             {actions.slice(0, 3).map((action, index) => (
//               <button
//                 key={index}
//                 onClick={() => action.onClick(item)}
//                 className={`p-2 rounded-lg transition-colors ${
//                   action.className || 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
//                 }`}
//                 title={action.label}
//               >
//                 {action.icon}
//               </button>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// // ===== COMPOSANT SKELETON =====
// const TableSkeleton: React.FC = () => {
//   return (
//     <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//       {/* En-tête skeleton */}
//       <div className="bg-gray-200 p-6">
//         <div className="flex justify-between items-center">
//           <div className="space-y-2">
//             <div className="h-6 bg-gray-300 rounded w-48 animate-pulse"></div>
//             <div className="h-4 bg-gray-300 rounded w-32 animate-pulse"></div>
//           </div>
//           <div className="h-10 bg-gray-300 rounded w-24 animate-pulse"></div>
//         </div>
//       </div>
      
//       {/* Barre d'outils skeleton */}
//       <div className="border-b border-gray-200 p-4">
//         <div className="flex justify-between items-center">
//           <div className="h-10 bg-gray-200 rounded w-64 animate-pulse"></div>
//           <div className="flex space-x-2">
//             <div className="h-10 bg-gray-200 rounded w-20 animate-pulse"></div>
//             <div className="h-10 bg-gray-200 rounded w-16 animate-pulse"></div>
//           </div>
//         </div>
//       </div>
      
//       {/* Contenu skeleton */}
//       <div className="p-4 space-y-4">
//         {Array.from({ length: 5 }).map((_, index) => (
//           <div key={index} className="flex items-center space-x-4">
//             <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
//             <div className="flex-1 h-4 bg-gray-200 rounded animate-pulse"></div>
//             <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
//             <div className="flex space-x-2">
//               <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
//               <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
//               <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CreativeTable;


'use client';

import React, { useState, useMemo } from 'react';
import { Search, Eye, Edit, Trash2 } from 'lucide-react';
import { EntityTableAction, EntityTableProps } from '@/types/type';

const EntityTable: React.FC<EntityTableProps> = ({
  data,
  title,
  actions = [],
  onSearch,
  loading = false,
  emptyMessage = "Aucun élément trouvé"
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Actions par défaut
  const defaultActions: EntityTableAction[] = [
    {
      type: 'view',
      label: 'Voir',
      icon: <Eye className="w-4 h-4" />,
      className: 'text-blue-600 hover:text-blue-800 hover:bg-blue-50',
      onClick: (item) => console.log('Voir:', item)
    },
    {
      type: 'edit',
      label: 'Modifier',
      icon: <Edit className="w-4 h-4" />,
      className: 'text-green-600 hover:text-green-800 hover:bg-green-50',
      onClick: (item) => console.log('Modifier:', item)
    },
    {
      type: 'delete',
      label: 'Supprimer',
      icon: <Trash2 className="w-4 h-4" />,
      className: 'text-red-600 hover:text-red-800 hover:bg-red-50',
      onClick: (item) => console.log('Supprimer:', item)
    }
  ];

  const finalActions = actions.length > 0 ? actions : defaultActions;

  // Filtrage des données par nom
  const filteredData = useMemo(() => {
    return data.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  if (loading) {
    return <EntityTableSkeleton title={title} />;
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* En-tête */}
      <div className="bg-gradient-to-r from-firstColor to-firstColor/80 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">{title}</h2>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <span className="text-sm font-medium text-white">
              {filteredData.length} élément(s)
            </span>
          </div>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="border-b border-gray-200 p-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher par nom..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-firstColor focus:border-firstColor transition-colors text-gray-900 placeholder-gray-500"
          />
        </div>
      </div>

      {/* Contenu du tableau */}
      {filteredData.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {emptyMessage}
          </h3>
          <p className="text-gray-500">
            {searchQuery ? 'Aucun résultat pour votre recherche' : 'Aucun élément disponible'}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((item) => (
                <tr 
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* Nom */}
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10 bg-firstColor/10 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-firstColor font-semibold text-sm">
                          {item.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {item.name}
                        </div>
                        <div className="text-sm text-gray-500 font-mono">
                          ID: {item.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {finalActions.map((action, actionIndex) => (
                        <button
                          key={actionIndex}
                          onClick={() => action.onClick(item)}
                          className={`p-2 rounded-lg transition-all duration-200 ${
                            action.className || 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                          }`}
                          title={action.label}
                        >
                          {action.icon}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const EntityTableSkeleton: React.FC<{ title: string }> = () => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* En-tête skeleton */}
      <div className="bg-gray-200 p-6">
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-300 rounded w-48 animate-pulse"></div>
          <div className="h-6 bg-gray-300 rounded w-24 animate-pulse"></div>
        </div>
      </div>
      
      {/* Barre de recherche skeleton */}
      <div className="border-b border-gray-200 p-6">
        <div className="h-12 bg-gray-200 rounded-lg w-80 animate-pulse"></div>
      </div>
      
      {/* Contenu skeleton */}
      <div className="p-6">
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EntityTable;