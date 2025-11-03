// "use client"

// import React, { useState, useMemo } from "react"
// import {
//   ChevronDown,
//   ChevronUp,
//   Package,
//   User,
//   MapPin,
//   Phone,
//   Mail,
//   Calendar,
//   CreditCard,
//   Search,
//   Filter,
//   ArrowUpDown,
//   ArrowUp,
//   ArrowDown,
//   ChevronLeft,
//   ChevronRight,
//   Gift
// } from "lucide-react"
// import Image from "next/image"
// import {
//   OrderFilterState,
//   OrderLineItem,
//   OrderPack,
//   Order,
//   SortState
// } from "@/types/order"

// const AdminOrdersTable: React.FC = () => {
//   const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set())
//   const [expandedPacks, setExpandedPacks] = useState<Set<string>>(new Set())
//   const [currentPage, setCurrentPage] = useState(1)
//   const [itemsPerPage] = useState(20)
//   const [showFilters, setShowFilters] = useState(false)

//   const [filters, setFilters] = useState<OrderFilterState>({
//     search: "",
//     status: "",
//     dateFrom: "",
//     dateTo: "",
//     minAmount: "",
//     maxAmount: "",
//     itemType: ""
//   })

//   const [sort, setSort] = useState<SortState>({
//     field: "date",
//     direction: "desc"
//   })

//   // Données d'exemple statiques pour éviter l'hydratation mismatch
//   const generateOrders = useMemo((): Order[] => {
//     const baseItems: OrderLineItem[] = [
//       {
//         id: "1",
//         name: "Bobines de fil multicolores",
//         quantity: 2,
//         price: 25.0,
//         image:
//           "https://static.mapetitemercerie.com/98636-large_default/poincon-pour-pose-rivets-oeillets-boutons-couture-loisirs.jpg",
//         type: "product"
//       },
//       {
//         id: "2",
//         name: "Ciseaux de couture professionnels",
//         quantity: 1,
//         price: 45.5,
//         image:
//           "https://static.mapetitemercerie.com/241747-large_default/ciseaux-classic-cranteurs-23-cm-droitier-fiskars.jpg",
//         type: "product"
//       },
//       {
//         id: "pack-1",
//         name: "Pack Débutant Couture",
//         quantity: 1,
//         price: 89.99,
//         discountPrice: 89.99,
//         image:
//           "https://static.mapetitemercerie.com/99298-large_default/kit-de-11-fils-a-coudre-guetermann-accessoires.jpg",
//         type: "pack",
//         items: [
//           {
//             id: "p1",
//             name: "Kit aiguilles assorties",
//             quantity: 1,
//             price: 18.33,
//             image:
//               "https://static.mapetitemercerie.com/99298-large_default/kit-de-11-fils-a-coudre-guetermann-accessoires.jpg"
//           },
//           {
//             id: "p2",
//             name: "Fils colorés x5",
//             quantity: 5,
//             price: 15.0,
//             image:
//               "https://static.mapetitemercerie.com/98636-large_default/poincon-pour-pose-rivets-oeillets-boutons-couture-loisirs.jpg"
//           },
//           {
//             id: "p3",
//             name: "Dé à coudre",
//             quantity: 1,
//             price: 8.99,
//             image:
//               "https://static.mapetitemercerie.com/241747-large_default/ciseaux-classic-cranteurs-23-cm-droitier-fiskars.jpg"
//           }
//         ]
//       }
//     ]

//     const baseOrder: Order = {
//       id: "1",
//       orderNumber: "CMD-2025-001",
//       customerName: "Ahmed Ben Ali",
//       customerEmail: "ahmed@email.com",
//       customerPhone: "+212 661 234 567",
//       customerAddress: "Rue Hassan II, Quartier Gueliz, Marrakech",
//       orderDate: new Date("2025-01-20"),
//       status: "pending",
//       total: 160.49,
//       paymentMethod: "Carte bancaire",
//       shippingMethod: "Livraison standard",
//       items: baseItems,
//       coupon: "yassine",
//       notes: "Commande mixte : produits + pack débutant"
//     }

//     // Générer des commandes avec des données déterministes
//     const additionalOrders: Order[] = []
//     const statuses: Order["status"][] = [
//       "pending",
//       "confirmed",
//       "rejected",
//       "processing",
//       "shipped",
//       "delivered"
//     ]
//     const paymentMethods = ["Virement bancaire", "À la livraison", "Chèque"]
//     const customerNames = [
//       "Fatima Zahra",
//       "Youssef Amine",
//       "Aicha Bennani",
//       "Omar Cherif",
//       "Khadija Amrani",
//       "Rachid Tazi",
//       "Nadia El Fassi"
//     ]

//     // Utiliser un seed déterministe pour éviter les différences serveur/client
//     const deterministicData = [
//       {
//         hasProducts: true,
//         hasPacks: true,
//         numProducts: 2,
//         numPacks: 1,
//         statusIndex: 0,
//         paymentIndex: 1,
//         customerIndex: 0,
//         price1: 25.5,
//         price2: 45.0,
//         packPrice: 75.99
//       },
//       {
//         hasProducts: true,
//         hasPacks: false,
//         numProducts: 1,
//         numPacks: 0,
//         statusIndex: 1,
//         paymentIndex: 0,
//         customerIndex: 1,
//         price1: 30.0,
//         price2: 0,
//         packPrice: 0
//       },
//       {
//         hasProducts: false,
//         hasPacks: true,
//         numProducts: 0,
//         numPacks: 1,
//         statusIndex: 2,
//         paymentIndex: 2,
//         customerIndex: 2,
//         price1: 0,
//         price2: 0,
//         packPrice: 89.99
//       },
//       {
//         hasProducts: true,
//         hasPacks: true,
//         numProducts: 3,
//         numPacks: 2,
//         statusIndex: 3,
//         paymentIndex: 3,
//         customerIndex: 3,
//         price1: 15.75,
//         price2: 22.3,
//         packPrice: 95.5
//       },
//       {
//         hasProducts: true,
//         hasPacks: false,
//         numProducts: 2,
//         numPacks: 0,
//         statusIndex: 4,
//         paymentIndex: 4,
//         customerIndex: 4,
//         price1: 18.99,
//         price2: 67.25,
//         packPrice: 0
//       }
//     ]

//     for (let i = 2; i <= 25; i++) {
//       const dataIndex = (i - 2) % deterministicData.length
//       const data = deterministicData[dataIndex]
//       const items: OrderLineItem[] = []

//       // Ajouter des produits individuels
//       if (data.hasProducts) {
//         for (let j = 0; j < data.numProducts; j++) {
//           items.push({
//             id: `item-${i}-${j}`,
//             name: `Produit ${j + 1}`,
//             quantity: j + 1,
//             price: j === 0 ? data.price1 : data.price2,
//             image: baseItems[j % 2].image,
//             type: "product"
//           })
//         }
//       }

//       // Ajouter des packs
//       if (data.hasPacks) {
//         for (let k = 0; k < data.numPacks; k++) {
//           const packPrice = data.packPrice + k * 10
//           items.push({
//             id: `pack-${i}-${k}`,
//             name: `Pack ${k === 0 ? "Débutant" : "Professionnel"}`,
//             quantity: 1,
//             price: packPrice,
//             discountPrice: Math.round(packPrice * 0.85 * 100) / 100,
//             image: baseItems[2].image,
//             type: "pack",
//             items: [
//               {
//                 id: `pp-${i}-${k}-1`,
//                 name: "Article pack 1",
//                 quantity: 2,
//                 price: 15.0,
//                 image: baseItems[0].image
//               },
//               {
//                 id: `pp-${i}-${k}-2`,
//                 name: "Article pack 2",
//                 quantity: 1,
//                 price: 25.0,
//                 image: baseItems[1].image
//               }
//             ]
//           })
//         }
//       }

//       // Si aucun item, ajouter au moins un produit
//       if (items.length === 0) {
//         items.push({
//           id: `default-${i}`,
//           name: "Produit par défaut",
//           quantity: 1,
//           price: 20.0,
//           image: baseItems[0].image,
//           type: "product"
//         })
//       }

//       const total = items.reduce((sum, item) => {
//         if (item.type === "pack" && item.discountPrice) {
//           return sum + item.discountPrice * item.quantity
//         }
//         return sum + item.price * item.quantity
//       }, 0)

//       additionalOrders.push({
//         id: i.toString(),
//         orderNumber: `CMD-2025-${i.toString().padStart(3, "0")}`,
//         customerName: customerNames[data.customerIndex],
//         customerEmail: `client${i}@email.com`,
//         customerPhone: `+212 661 ${(100 + i).toString()} ${(
//           200 + i
//         ).toString()}`,
//         customerAddress: `Adresse ${i}, Ville, Maroc`,
//         orderDate: new Date(2025, 0, (i % 20) + 1),
//         status: statuses[data.statusIndex],
//         total: Math.round(total * 100) / 100,
//         paymentMethod: paymentMethods[data.paymentIndex],
//         shippingMethod: "Livraison standard",
//         items: items,
//         coupon: "yassine",
//         notes: i % 4 === 0 ? "Note spéciale" : undefined
//       })
//     }

//     return [baseOrder, ...additionalOrders]
//   }, [])

//   const [orders, setOrders] = useState<Order[]>(generateOrders)

//   const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
//     setOrders((prev) =>
//       prev.map((order) =>
//         order.id === orderId ? { ...order, status: newStatus } : order
//       )
//     )
//   }

//   const updateOrderPaymentMethod = (
//     orderId: string,
//     newPaymentMethod: string
//   ) => {
//     setOrders((prev) =>
//       prev.map((order) =>
//         order.id === orderId
//           ? { ...order, paymentMethod: newPaymentMethod }
//           : order
//       )
//     )
//   }

//   const getStatusColor = (status: Order["status"]) => {
//     const colors = {
//       pending: "bg-yellow-100 text-yellow-800",
//       confirmed: "bg-blue-100 text-blue-800",
//       rejected: "bg-red-100 text-red-800",
//       processing: "bg-purple-100 text-purple-800",
//       shipped: "bg-orange-100 text-orange-800",
//       delivered: "bg-green-100 text-green-800",
//       cancelled: "bg-red-100 text-red-800"
//     }
//     return colors[status]
//   }

//   const filteredAndSortedOrders = useMemo(() => {
//     const result = orders.filter((order) => {
//       // Filtre de recherche
//       if (filters.search) {
//         const searchLower = filters.search.toLowerCase()
//         const matchesSearch =
//           order.orderNumber.toLowerCase().includes(searchLower) ||
//           order.customerName.toLowerCase().includes(searchLower) ||
//           order.customerEmail.toLowerCase().includes(searchLower) ||
//           order.items.some((item) =>
//             item.name.toLowerCase().includes(searchLower)
//           )
//         if (!matchesSearch) return false
//       }

//       // Filtre par statut
//       if (filters.status && order.status !== filters.status) return false

//       // Filtre par type d'articles
//       if (filters.itemType) {
//         if (
//           filters.itemType === "products" &&
//           !order.items.some((item) => item.type === "product")
//         )
//           return false
//         if (
//           filters.itemType === "packs" &&
//           !order.items.some((item) => item.type === "pack")
//         )
//           return false
//         if (
//           filters.itemType === "mixed" &&
//           !(
//             order.items.some((item) => item.type === "product") &&
//             order.items.some((item) => item.type === "pack")
//           )
//         )
//           return false
//       }

//       // Filtre par date
//       if (filters.dateFrom) {
//         const fromDate = new Date(filters.dateFrom)
//         if (order.orderDate < fromDate) return false
//       }
//       if (filters.dateTo) {
//         const toDate = new Date(filters.dateTo)
//         toDate.setHours(23, 59, 59, 999)
//         if (order.orderDate > toDate) return false
//       }

//       // Filtre par montant
//       if (filters.minAmount && order.total < parseFloat(filters.minAmount))
//         return false
//       if (filters.maxAmount && order.total > parseFloat(filters.maxAmount))
//         return false

//       return true
//     })

//     // Tri
//     result.sort((a, b) => {
//       let comparison = 0

//       switch (sort.field) {
//         case "date":
//           comparison = a.orderDate.getTime() - b.orderDate.getTime()
//           break
//         case "total":
//           comparison = a.total - b.total
//           break
//         case "customerName":
//           comparison = a.customerName.localeCompare(b.customerName)
//           break
//         case "orderNumber":
//           comparison = a.orderNumber.localeCompare(b.orderNumber)
//           break
//       }

//       return sort.direction === "asc" ? comparison : -comparison
//     })

//     return result
//   }, [orders, filters, sort])

//   const totalPages = Math.ceil(filteredAndSortedOrders.length / itemsPerPage)
//   const paginatedOrders = filteredAndSortedOrders.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   )

//   const toggleOrderDetails = (orderId: string) => {
//     const newExpanded = new Set(expandedOrders)
//     if (newExpanded.has(orderId)) {
//       newExpanded.delete(orderId)
//     } else {
//       newExpanded.add(orderId)
//     }
//     setExpandedOrders(newExpanded)
//   }

//   const togglePackDetails = (packId: string) => {
//     const newExpanded = new Set(expandedPacks)
//     if (newExpanded.has(packId)) {
//       newExpanded.delete(packId)
//     } else {
//       newExpanded.add(packId)
//     }
//     setExpandedPacks(newExpanded)
//   }

//   const handleSort = (field: SortState["field"]) => {
//     setSort((prev) => ({
//       field,
//       direction:
//         prev.field === field && prev.direction === "asc" ? "desc" : "asc"
//     }))
//   }

//   const formatDate = (date: Date) => {
//     return date.toLocaleDateString("fr-FR", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit"
//     })
//   }

//   const totalAmount = filteredAndSortedOrders.reduce(
//     (sum, order) => sum + order.total,
//     0
//   )

//   // Fonction pour obtenir les statistiques sur les types d'articles
//   const getItemTypeStats = (order: Order) => {
//     const productCount = order.items.filter(
//       (item) => item.type === "product"
//     ).length
//     const packCount = order.items.filter((item) => item.type === "pack").length
//     return { productCount, packCount }
//   }

//   const renderOrderItem = (item: OrderLineItem) => {
//     if (item.type === "product") {
//       return (
//         <div
//           key={item.id}
//           className="flex items-center space-x-4 bg-white p-3 rounded-lg border"
//         >
//           <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
//             <Image
//               src={item.image}
//               alt={item.name}
//               width={100}
//               height={100}
//               className="w-full h-full object-cover"
//             />
//           </div>
//           <div className="flex-1 min-w-0">
//             <div className="flex items-center space-x-2">
//               <Package className="w-4 h-4 text-blue-500" />
//               <p className="text-sm font-medium text-gray-900 truncate">
//                 {item.name}
//               </p>
//             </div>
//             <p className="text-sm text-gray-500">Quantité: {item.quantity}</p>
//           </div>
//           <div className="text-right">
//             <p className="text-sm font-medium text-gray-900">
//               {(item.price * item.quantity).toFixed(2)} DH
//             </p>
//             <p className="text-xs text-gray-500">
//               {item.price.toFixed(2)} DH/unité
//             </p>
//           </div>
//         </div>
//       )
//     } else {
//       // Rendu pour les packs
//       const pack = item as OrderPack
//       const packTotal = pack.discountPrice
//         ? pack.discountPrice * pack.quantity
//         : pack.price * pack.quantity
//       const originalTotal = pack.price * pack.quantity
//       const savings = pack.discountPrice
//         ? originalTotal - pack.discountPrice * pack.quantity
//         : 0

//       return (
//         <div
//           key={pack.id}
//           className="bg-gradient-to-r from-purple-50 to-blue-50 p-3 rounded-lg border border-purple-200"
//         >
//           <div className="flex items-center space-x-4">
//             <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
//               <Image
//                 src={pack.image}
//                 alt={pack.name}
//                 width={100}
//                 height={100}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute top-1 right-1 bg-purple-500 text-white text-xs px-1 rounded">
//                 PACK
//               </div>
//             </div>
//             <div className="flex-1 min-w-0">
//               <div className="flex items-center space-x-2">
//                 <Gift className="w-4 h-4 text-purple-500" />
//                 <p className="text-sm font-medium text-gray-900 truncate">
//                   {pack.name}
//                 </p>
//               </div>
//               <p className="text-sm text-gray-500">Quantité: {pack.quantity}</p>
//               <p className="text-xs text-green-600">
//                 {pack.items.length} produits inclus
//                 {savings > 0 && ` • Économie: ${savings.toFixed(2)} DH`}
//               </p>
//             </div>
//             <div className="text-right">
//               <p className="text-sm font-medium text-gray-900">
//                 {packTotal.toFixed(2)} DH
//               </p>
//               {pack.discountPrice && (
//                 <p className="text-xs text-gray-500 line-through">
//                   {originalTotal.toFixed(2)} DH
//                 </p>
//               )}
//               <button
//                 onClick={() => togglePackDetails(pack.id)}
//                 className="text-xs text-purple-600 hover:text-purple-800 flex items-center"
//               >
//                 {expandedPacks.has(pack.id) ? "Masquer" : "Voir"} détails
//                 {expandedPacks.has(pack.id) ? (
//                   <ChevronUp className="w-3 h-3 ml-1" />
//                 ) : (
//                   <ChevronDown className="w-3 h-3 ml-1" />
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Détails du pack */}
//           {expandedPacks.has(pack.id) && (
//             <div className="mt-3 pt-3 border-t border-purple-200">
//               <h5 className="text-sm font-medium text-gray-800 mb-2">
//                 Contenu du pack:
//               </h5>
//               <div className="space-y-2">
//                 {pack.items.map((packItem) => (
//                   <div
//                     key={packItem.id}
//                     className="flex items-center justify-between bg-white p-2 rounded text-sm"
//                   >
//                     <div className="flex items-center space-x-2">
//                       <div className="w-8 h-8 bg-gray-100 rounded overflow-hidden">
//                         <Image
//                           src={packItem.image}
//                           alt={packItem.name}
//                           width={100}
//                           height={100}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                       <span className="text-gray-700">{packItem.name}</span>
//                       <span className="text-gray-500">
//                         ×{packItem.quantity}
//                       </span>
//                     </div>
//                     <span className="text-gray-600">
//                       {(packItem.price * packItem.quantity).toFixed(2)} DH
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       )
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//           {/* En-tête avec statistiques */}
//           <div className="bg-gray-50 px-6 py-4 border-b">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-800 flex items-center">
//                   <Package className="mr-3" size={28} />
//                   Gestion des Commandes
//                 </h1>
//                 <div className="text-sm text-gray-600 mt-1">
//                   {filteredAndSortedOrders.length} commandes • Total:{" "}
//                   {totalAmount.toFixed(2)} DH
//                 </div>
//               </div>
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//               >
//                 <Filter className="mr-2" size={16} />
//                 Filtres
//               </button>
//             </div>
//           </div>

//           {/* Filtres */}
//           {showFilters && (
//             <div className="bg-gray-50 border-b p-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Recherche
//                   </label>
//                   <div className="relative">
//                     <Search
//                       className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                       size={16}
//                     />
//                     <input
//                       type="text"
//                       placeholder="Nom, email, produit..."
//                       value={filters.search}
//                       onChange={(e) =>
//                         setFilters((prev) => ({
//                           ...prev,
//                           search: e.target.value
//                         }))
//                       }
//                       className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Statut
//                   </label>
//                   <select
//                     value={filters.status}
//                     onChange={(e) =>
//                       setFilters((prev) => ({
//                         ...prev,
//                         status: e.target.value
//                       }))
//                     }
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   >
//                     <option value="">Tous les statuts</option>
//                     <option value="pending">En attente</option>
//                     <option value="confirmed">Confirmée</option>
//                     <option value="rejected">Rejetée</option>
//                     <option value="processing">En traitement</option>
//                     <option value="shipped">Expédiée</option>
//                     <option value="delivered">Livrée</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Type d&apos;articles
//                   </label>
//                   <select
//                     value={filters.itemType}
//                     onChange={(e) =>
//                       setFilters((prev) => ({
//                         ...prev,
//                         itemType: e.target.value
//                       }))
//                     }
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   >
//                     <option value="">Tous les types</option>
//                     <option value="products">Produits uniquement</option>
//                     <option value="packs">Packs uniquement</option>
//                     <option value="mixed">Commandes mixtes</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Date de
//                   </label>
//                   <input
//                     type="date"
//                     value={filters.dateFrom}
//                     onChange={(e) =>
//                       setFilters((prev) => ({
//                         ...prev,
//                         dateFrom: e.target.value
//                       }))
//                     }
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Date à
//                   </label>
//                   <input
//                     type="date"
//                     value={filters.dateTo}
//                     onChange={(e) =>
//                       setFilters((prev) => ({
//                         ...prev,
//                         dateTo: e.target.value
//                       }))
//                     }
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Montant min (DH)
//                   </label>
//                   <input
//                     type="number"
//                     placeholder="0"
//                     value={filters.minAmount}
//                     onChange={(e) =>
//                       setFilters((prev) => ({
//                         ...prev,
//                         minAmount: e.target.value
//                       }))
//                     }
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Montant max (DH)
//                   </label>
//                   <input
//                     type="number"
//                     placeholder="1000"
//                     value={filters.maxAmount}
//                     onChange={(e) =>
//                       setFilters((prev) => ({
//                         ...prev,
//                         maxAmount: e.target.value
//                       }))
//                     }
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//               </div>

//               <div className="flex justify-end mt-4">
//                 <button
//                   onClick={() => {
//                     setFilters({
//                       search: "",
//                       status: "",
//                       dateFrom: "",
//                       dateTo: "",
//                       minAmount: "",
//                       maxAmount: "",
//                       itemType: ""
//                     })
//                     setCurrentPage(1)
//                   }}
//                   className="px-4 py-2 text-gray-600 hover:text-gray-800"
//                 >
//                   Réinitialiser
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Tableau */}
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 border-b">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     <button
//                       onClick={() => handleSort("orderNumber")}
//                       className="flex items-center hover:text-gray-700"
//                     >
//                       Commande
//                       <ArrowUpDown className="ml-1" size={14} />
//                     </button>
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     <button
//                       onClick={() => handleSort("customerName")}
//                       className="flex items-center hover:text-gray-700"
//                     >
//                       Client
//                       <ArrowUpDown className="ml-1" size={14} />
//                     </button>
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     <button
//                       onClick={() => handleSort("date")}
//                       className="flex items-center hover:text-gray-700"
//                     >
//                       Date
//                       {sort.field === "date" &&
//                         (sort.direction === "asc" ? (
//                           <ArrowUp className="ml-1" size={14} />
//                         ) : (
//                           <ArrowDown className="ml-1" size={14} />
//                         ))}
//                     </button>
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Statut
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Articles
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     <button
//                       onClick={() => handleSort("total")}
//                       className="flex items-center hover:text-gray-700"
//                     >
//                       Total
//                       {sort.field === "total" &&
//                         (sort.direction === "asc" ? (
//                           <ArrowUp className="ml-1" size={14} />
//                         ) : (
//                           <ArrowDown className="ml-1" size={14} />
//                         ))}
//                     </button>
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {paginatedOrders.map((order) => {
//                   const { productCount, packCount } = getItemTypeStats(order)

//                   return (
//                     <React.Fragment key={order.id}>
//                       {/* Ligne principale de la commande */}
//                       <tr className="hover:bg-gray-50 transition-colors">
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center">
//                             <div>
//                               <div className="text-sm font-medium text-gray-900">
//                                 {order.orderNumber}
//                               </div>
//                               <div className="text-sm text-gray-500">
//                                 {order.items.length} article
//                                 {order.items.length > 1 ? "s" : ""}
//                               </div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center">
//                             <User className="mr-2 text-gray-400" size={16} />
//                             <div>
//                               <div className="text-sm font-medium text-gray-900">
//                                 {order.customerName}
//                               </div>
//                               <div className="text-sm text-gray-500">
//                                 {order.customerEmail}
//                               </div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center">
//                             <Calendar
//                               className="mr-2 text-gray-400"
//                               size={16}
//                             />
//                             <div className="text-sm text-gray-900">
//                               {formatDate(order.orderDate)}
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <select
//                             value={order.status}
//                             onChange={(e) =>
//                               updateOrderStatus(
//                                 order.id,
//                                 e.target.value as Order["status"]
//                               )
//                             }
//                             className={`px-2 py-1 text-xs font-semibold rounded-full border-0 ${getStatusColor(
//                               order.status
//                             )}`}
//                           >
//                             <option value="pending">En attente</option>
//                             <option value="confirmed">Confirmée</option>
//                             <option value="rejected">Rejetée</option>
//                             <option value="processing">En traitement</option>
//                             <option value="shipped">Expédiée</option>
//                             <option value="delivered">Livrée</option>
//                           </select>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center space-x-3">
//                             {productCount > 0 && (
//                               <div className="flex items-center text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
//                                 <Package className="w-3 h-3 mr-1" />
//                                 {productCount} produit
//                                 {productCount > 1 ? "s" : ""}
//                               </div>
//                             )}
//                             {packCount > 0 && (
//                               <div className="flex items-center text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
//                                 <Gift className="w-3 h-3 mr-1" />
//                                 {packCount} pack{packCount > 1 ? "s" : ""}
//                               </div>
//                             )}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm font-medium text-gray-900">
//                             {order.total.toFixed(2)} DH
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <button
//                             onClick={() => toggleOrderDetails(order.id)}
//                             className="text-gray-400 hover:text-gray-600"
//                           >
//                             {expandedOrders.has(order.id) ? (
//                               <ChevronUp size={20} />
//                             ) : (
//                               <ChevronDown size={20} />
//                             )}
//                           </button>
//                         </td>
//                       </tr>

//                       {/* Ligne des détails (déroulante) */}
//                       {expandedOrders.has(order.id) && (
//                         <tr>
//                           <td colSpan={7} className="px-0 py-0">
//                             <div className="bg-gray-50 border-l-4 border-blue-500">
//                               <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
//                                 {/* Informations client */}
//                                 <div className="space-y-4">
//                                   <h3 className="text-lg font-semibold text-gray-800 mb-4">
//                                     Informations Client
//                                   </h3>

//                                   <div className="space-y-3">
//                                     <div className="flex items-start">
//                                       <User
//                                         className="mr-3 text-gray-400 mt-1"
//                                         size={16}
//                                       />
//                                       <div>
//                                         <p className="text-sm font-medium text-gray-900">
//                                           {order.customerName}
//                                         </p>
//                                         <p className="text-sm text-gray-500">
//                                           Nom complet
//                                         </p>
//                                       </div>
//                                     </div>

//                                     <div className="flex items-start">
//                                       <Mail
//                                         className="mr-3 text-gray-400 mt-1"
//                                         size={16}
//                                       />
//                                       <div>
//                                         <p className="text-sm font-medium text-gray-900">
//                                           {order.customerEmail}
//                                         </p>
//                                         <p className="text-sm text-gray-500">
//                                           Email
//                                         </p>
//                                       </div>
//                                     </div>

//                                     <div className="flex items-start">
//                                       <Phone
//                                         className="mr-3 text-gray-400 mt-1"
//                                         size={16}
//                                       />
//                                       <div>
//                                         <p className="text-sm font-medium text-gray-900">
//                                           {order.customerPhone}
//                                         </p>
//                                         <p className="text-sm text-gray-500">
//                                           Téléphone
//                                         </p>
//                                       </div>
//                                     </div>

//                                     <div className="flex items-start">
//                                       <MapPin
//                                         className="mr-3 text-gray-400 mt-1"
//                                         size={16}
//                                       />
//                                       <div>
//                                         <p className="text-sm font-medium text-gray-900">
//                                           {order.customerAddress}
//                                         </p>
//                                         <p className="text-sm text-gray-500">
//                                           Adresse de livraison
//                                         </p>
//                                       </div>
//                                     </div>

//                                     <div className="flex items-start">
//                                       <CreditCard
//                                         className="mr-3 text-gray-400 mt-1"
//                                         size={16}
//                                       />
//                                       <div>
//                                         <select
//                                           value={order.paymentMethod}
//                                           onChange={(e) =>
//                                             updateOrderPaymentMethod(
//                                               order.id,
//                                               e.target.value
//                                             )
//                                           }
//                                           className="text-sm font-medium text-gray-900 border rounded px-2 py-1"
//                                         >
//                                           <option value="Carte bancaire">
//                                             Carte bancaire
//                                           </option>
//                                           <option value="PayPal">PayPal</option>
//                                           <option value="Virement bancaire">
//                                             Virement bancaire
//                                           </option>
//                                           <option value="À la livraison">
//                                             À la livraison
//                                           </option>
//                                           <option value="Chèque">Chèque</option>
//                                         </select>
//                                         <p className="text-sm text-gray-500">
//                                           Mode de paiement
//                                         </p>
//                                       </div>
//                                     </div>

//                                     {order.notes && (
//                                       <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
//                                         <p className="text-sm text-yellow-800">
//                                           <strong>Note:</strong> {order.notes}
//                                         </p>
//                                       </div>
//                                     )}
//                                   </div>
//                                 </div>

//                                 {/* Articles commandés */}
//                                 <div className="space-y-4">
//                                   <h3 className="text-lg font-semibold text-gray-800 mb-4">
//                                     Articles Commandés
//                                   </h3>

//                                   <div className="space-y-3 max-h-96 overflow-y-auto">
//                                     {order.items.map((item) =>
//                                       renderOrderItem(item)
//                                     )}
//                                   </div>

//                                   {/* Total de la commande */}
//                                   <div className="border-t pt-4">
//                                     <div className="flex justify-between items-center">
//                                       <span className="text-lg font-semibold text-gray-900">
//                                         Total de la commande:
//                                       </span>
//                                       <span className="text-xl font-bold text-blue-600">
//                                         {order.total.toFixed(2)} DH
//                                       </span>
//                                     </div>
//                                     <p className="text-sm text-gray-500 mt-1">
//                                       Livraison: {order.shippingMethod}
//                                     </p>

//                                     {/* Résumé des économies */}
//                                     {order.items.some(
//                                       (item) =>
//                                         item.type === "pack" &&
//                                         (item as OrderPack).discountPrice
//                                     ) && (
//                                       <div className="mt-2 p-2 bg-green-50 rounded">
//                                         <p className="text-sm text-green-700">
//                                           <strong>Économies réalisées:</strong>{" "}
//                                           {order.items
//                                             .reduce((savings, item) => {
//                                               if (item.type === "pack") {
//                                                 const pack = item as OrderPack
//                                                 if (pack.discountPrice) {
//                                                   return (
//                                                     savings +
//                                                     (pack.price -
//                                                       pack.discountPrice) *
//                                                       pack.quantity
//                                                   )
//                                                 }
//                                               }
//                                               return savings
//                                             }, 0)
//                                             .toFixed(2)}{" "}
//                                           DH grâce aux packs
//                                         </p>
//                                       </div>
//                                     )}
//                                   </div>

//                                   {/* Actions sur la commande */}
//                                   <div className="flex space-x-3 pt-4">
//                                     <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm">
//                                       Imprimer facture
//                                     </button>
//                                     <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm">
//                                       Contacter client
//                                     </button>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </td>
//                         </tr>
//                       )}
//                     </React.Fragment>
//                   )
//                 })}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
//               <div className="flex items-center text-sm text-gray-700">
//                 Affichage de {(currentPage - 1) * itemsPerPage + 1} à{" "}
//                 {Math.min(
//                   currentPage * itemsPerPage,
//                   filteredAndSortedOrders.length
//                 )}{" "}
//                 sur {filteredAndSortedOrders.length} commandes
//               </div>

//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={() =>
//                     setCurrentPage((prev) => Math.max(prev - 1, 1))
//                   }
//                   disabled={currentPage === 1}
//                   className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <ChevronLeft className="mr-1" size={16} />
//                   Précédent
//                 </button>

//                 <div className="flex items-center space-x-1">
//                   {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                     let pageNum
//                     if (totalPages <= 5) {
//                       pageNum = i + 1
//                     } else if (currentPage <= 3) {
//                       pageNum = i + 1
//                     } else if (currentPage >= totalPages - 2) {
//                       pageNum = totalPages - 4 + i
//                     } else {
//                       pageNum = currentPage - 2 + i
//                     }

//                     return (
//                       <button
//                         key={pageNum}
//                         onClick={() => setCurrentPage(pageNum)}
//                         className={`px-3 py-2 text-sm font-medium rounded-md ${
//                           currentPage === pageNum
//                             ? "bg-blue-500 text-white"
//                             : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
//                         }`}
//                       >
//                         {pageNum}
//                       </button>
//                     )
//                   })}
//                 </div>

//                 <button
//                   onClick={() =>
//                     setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                   }
//                   disabled={currentPage === totalPages}
//                   className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Suivant
//                   <ChevronRight className="ml-1" size={16} />
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AdminOrdersTable
"use client"

import React, { useState, useMemo, useEffect } from "react"
import {
  ChevronDown,
  ChevronUp,
  Package,
  User,
  MapPin,
  Phone,
  Calendar,
  CreditCard,
  Search,
  Filter,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Gift,
  Loader2,
  Plus
} from "lucide-react"
import Image from "next/image"
import {
  OrderFilterState,
  OrderLineItem,
  OrderPack,
  Order,
  SortState,
  OrderItem
} from "@/types/order"
import { CreateOrderModal } from "@/components/dashboard/CreateOrderModal"
import { useToast } from "@/components/ui/Toast"
import { PackProduct } from "@/types/pack"

const AdminOrdersTable: React.FC = () => {
  const { showToast } = useToast()
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set())
  const [expandedPacks, setExpandedPacks] = useState<Set<string>>(new Set())
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(30)
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState<Order[]>([])
  const [totalOrders, setTotalOrders] = useState(0)
  const [showCreateOrderModal, setShowCreateOrderModal] = useState(false)

  const [filters, setFilters] = useState<OrderFilterState>({
    search: "",
    status: "",
    dateFrom: "",
    dateTo: "",
    minAmount: "",
    maxAmount: "",
    itemType: ""
  })

  const [sort, setSort] = useState<SortState>({
    field: "date",
    direction: "desc"
  })

  // Charger les commandes depuis l'API avec pagination et filtres
  useEffect(() => {
    fetchOrders()
  }, [currentPage, filters])

  // Fetch orders with server-side pagination and filtering
  const fetchOrders = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      params.set("page", currentPage.toString())
      params.set("limit", itemsPerPage.toString())
      
      if (filters.search) params.set("search", filters.search)
      if (filters.status) params.set("status", filters.status)
      if (filters.dateFrom) params.set("dateFrom", filters.dateFrom)
      if (filters.dateTo) params.set("dateTo", filters.dateTo)
      if (filters.minAmount) params.set("minAmount", filters.minAmount)
      if (filters.maxAmount) params.set("maxAmount", filters.maxAmount)
      if (filters.itemType) params.set("itemType", filters.itemType)

      const response = await fetch(`/api/orders?${params.toString()}`)
      const data = await response.json()
      
      if (data.success) {
        // Transformer les données de la base de données en format Order
        const transformedOrders = data.orders.map(
          (order: any): Order => ({
            _id: order._id,
            orderNumber: order.orderNumber,
            customerName: order.customerName,
            customerPhone: order.customerPhone,
            customerAddress: order.customerAddress,
            orderDate: new Date(order.orderDate || order.createdAt),
            status: order.status,
            total: order.total,
            paymentMethod: order.paymentMethod,
            shippingMethod: order.shippingMethod,
            items: order.items.map((item: OrderLineItem): OrderLineItem => {
              if (item.type === "pack") {
                return {
                  id: item.id,
                  name: item.name,
                  quantity: item.quantity,
                  price: item.price,
                  discountPrice: item.discountPrice,
                  image: item.image,
                  type: "pack",
                  items: (item as any).items?.map((packItem: any) => ({
                    id: packItem.id,
                    name: packItem.name,
                    quantity: packItem.quantity,
                    price: packItem.price,
                    image: packItem.image
                  })) || []
                } as OrderPack
              } else {
                return {
                  id: item.id,
                  name: item.name,
                  quantity: item.quantity,
                  price: item.price,
                  image: item.image,
                  discount: item.discount,
                  characteristic: item.characteristic,
                  type: "product"
                } as OrderItem
              }
            }),
            coupon: order.coupon,
            notes: order.notes
          })
        )
        setOrders(transformedOrders)
        setTotalOrders(data.pagination?.total || transformedOrders.length)
      } else {
        showToast(data.message || "Erreur lors du chargement des commandes", "error")
      }
    } catch (error) {
      showToast("Erreur lors du chargement des commandes", "error")
    } finally {
      setLoading(false)
    }
  }

  // const fetchOrders = async () => {
  //   try {
  //     setLoading(true)
  //     const response = await fetch("/api/orders")
  //     const data = await response.json()

  //     if (data.success) {
  //       // Transformer les données de la base de données en format Order
  //       const transformedOrders = data.orders.map(
  //         (order: OrderDocument): Order => ({
  //           id: order._id,
  //           orderNumber: `CMD-${new Date(
  //             order.orderDate
  //           ).getFullYear()}-${order._id.slice(-4).toUpperCase()}`,
  //           customerName: order.customerName,
  //           customerEmail: "", // Vous devrez peut-être ajouter ce champ dans votre modèle
  //           customerPhone: order.customerPhone,
  //           customerAddress: order.customerAddress,
  //           orderDate: new Date(order.orderDate),
  //           status: mapStatus(order.status),
  //           total: order.total,
  //           paymentMethod: "Non spécifié", // Vous devrez peut-être ajouter ce champ
  //           shippingMethod: "Livraison standard", // Vous devrez peut-être ajouter ce champ
  //           items: order.items.map((item) => ({
  //             id: item.id,
  //             name: item.name,
  //             quantity: item.quantity,
  //             price: item.price,
  //             image: item.image || "/default-product.jpg",
  //             type: "product" as const
  //           })),
  //           coupon: order.coupon ? "Avec coupon" : "Sans coupon",
  //           notes: `Commande de ${order.items.length} article(s)`
  //         })
  //       )

  //       setOrders(transformedOrders)
  //     }
  //   } catch (error) {
  //     console.error("Erreur lors du chargement des commandes:", error)
  //     alert("Erreur lors du chargement des commandes")
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // Fonction pour mapper les statuts de votre base de données vers les statuts de l'interface
  // Fonction pour mapper les statuts de l'interface vers ceux de la base de données

  const mapStatusToDB = (status: Order["status"]): string => {
    // Fix: Map confirmed to "confirmed", not "processing"
    const statusMap: { [key: string]: string } = {
      "pending": "pending",
      "confirmed": "confirmed",
      "rejected": "rejected",
      "processing": "processing",
      "shipped": "shipped",
      "delivered": "delivered",
      "cancelled": "cancelled"
    }
    return statusMap[status] || "pending"
  }

  const updateOrderStatus = async (
    orderId: string,
    newStatus: Order["status"]
  ) => {
    try {
      const dbStatus = mapStatusToDB(newStatus)

      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: dbStatus })
      })

      const data = await response.json()

      if (data.success) {
        // Mettre à jour l'état local
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        )
      } else {
        showToast("Erreur lors de la mise à jour du statut", "error")
      }
    } catch (error) {
      showToast("Erreur lors de la mise à jour du statut", "error")
    }
  }

  const updateOrderPaymentMethod = async (
    orderId: string,
    newPaymentMethod: string
  ) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ paymentMethod: newPaymentMethod })
      })

      const data = await response.json()

      if (data.success) {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId
              ? { ...order, paymentMethod: newPaymentMethod }
              : order
          )
        )
        showToast("Mode de paiement mis à jour", "success")
      } else {
        showToast(data.message || "Erreur lors de la mise à jour du mode de paiement", "error")
      }
    } catch (error) {
      showToast("Erreur lors de la mise à jour du mode de paiement", "error")
    }
  }

  const getStatusColor = (status: Order["status"]) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800",
      rejected: "bg-red-100 text-red-800",
      processing: "bg-purple-100 text-purple-800",
      shipped: "bg-orange-100 text-orange-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800"
    }
    return colors[status]
  }

  // Server-side filtering - no need for client-side filtering anymore
  // Orders are already filtered and paginated by the server
  const paginatedOrders = orders

  const totalPages = Math.ceil(totalOrders / itemsPerPage)

  // Update page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [filters.search, filters.status, filters.dateFrom, filters.dateTo, filters.minAmount, filters.maxAmount, filters.itemType])

  const toggleOrderDetails = (orderId: string) => {
    const newExpanded = new Set(expandedOrders)
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId)
    } else {
      newExpanded.add(orderId)
    }
    setExpandedOrders(newExpanded)
  }

  const togglePackDetails = (packId: string) => {
    const newExpanded = new Set(expandedPacks)
    if (newExpanded.has(packId)) {
      newExpanded.delete(packId)
    } else {
      newExpanded.add(packId)
    }
    setExpandedPacks(newExpanded)
  }

  const handleSort = (field: SortState["field"]) => {
    setSort((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === "asc" ? "desc" : "asc"
    }))
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  // Calculate total amount from current page orders (server-side calculates total from all orders)
  const pageTotalAmount = orders.reduce(
    (sum, order) => sum + order.total,
    0
  )

  // Fonction pour obtenir les statistiques sur les types d'articles
  const getItemTypeStats = (order: Order) => {
    const productCount = order.items.filter(
      (item) => item.type === "product"
    ).length
    const packCount = order.items.filter((item) => item.type === "pack").length
    return { productCount, packCount }
  }

  const renderOrderItem = (item: OrderLineItem) => {
    if (item.type === "product") {
      return (
        <div
          key={item.id}
          className="flex items-center space-x-4 bg-white p-3 rounded-lg border"
        >
          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={item.image}
              alt={item.name}
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <Package className="w-4 h-4 text-blue-500" />
              <p className="text-sm font-medium text-gray-900 truncate">
                {item.name}
              </p>
            </div>
            <p className="text-sm text-gray-500">Quantité: {item.quantity}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">
              {(item.price * item.quantity).toFixed(2)} DH
            </p>
            <p className="text-xs text-gray-500">
              {item.price.toFixed(2)} DH/unité
            </p>
          </div>
        </div>
      )
    } else {
      // Rendu pour les packs
      const pack = item as OrderPack
      const packTotal = pack.discountPrice
        ? pack.discountPrice * pack.quantity
        : pack.price * pack.quantity
      const originalTotal = pack.price * pack.quantity
      const savings = pack.discountPrice
        ? originalTotal - pack.discountPrice * pack.quantity
        : 0

      return (
        <div
          key={pack.id}
          className="bg-gradient-to-r from-purple-50 to-blue-50 p-3 rounded-lg border border-purple-200"
        >
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
              <Image
                src={pack.image}
                alt={pack.name}
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-1 right-1 bg-purple-500 text-white text-xs px-1 rounded">
                PACK
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <Gift className="w-4 h-4 text-purple-500" />
                <p className="text-sm font-medium text-gray-900 truncate">
                  {pack.name}
                </p>
              </div>
              <p className="text-sm text-gray-500">Quantité: {pack.quantity}</p>
              <p className="text-xs text-green-600">
                {pack.items.length} produits inclus
                {savings > 0 && ` • Économie: ${savings.toFixed(2)} DH`}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {packTotal.toFixed(2)} DH
              </p>
              {pack.discountPrice && (
                <p className="text-xs text-gray-500 line-through">
                  {originalTotal.toFixed(2)} DH
                </p>
              )}
              <button
                onClick={() => togglePackDetails(pack.id)}
                className="text-xs text-purple-600 hover:text-purple-800 flex items-center"
              >
                {expandedPacks.has(pack.id) ? "Masquer" : "Voir"} détails
                {expandedPacks.has(pack.id) ? (
                  <ChevronUp className="w-3 h-3 ml-1" />
                ) : (
                  <ChevronDown className="w-3 h-3 ml-1" />
                )}
              </button>
            </div>
          </div>

          {/* Détails du pack */}
          {expandedPacks.has(pack.id) && (
            <div className="mt-3 pt-3 border-t border-purple-200">
              <h5 className="text-sm font-medium text-gray-800 mb-2">
                Contenu du pack:
              </h5>
              <div className="space-y-2">
                {pack.items.map((packItem) => (
                  <div
                    key={packItem.id}
                    className="flex items-center justify-between bg-white p-2 rounded text-sm"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gray-100 rounded overflow-hidden">
                        <Image
                          src={packItem.image}
                          alt={packItem.name}
                          width={100}
                          height={100}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-gray-700">{packItem.name}</span>
                      <span className="text-gray-500">
                        ×{packItem.quantity}
                      </span>
                    </div>
                    <span className="text-gray-600">
                      {(packItem.price * packItem.quantity).toFixed(2)} DH
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2
            className="animate-spin mx-auto mb-4 text-blue-500"
            size={48}
          />
          <p className="text-gray-600">Chargement des commandes...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <CreateOrderModal
        isOpen={showCreateOrderModal}
        onClose={() => setShowCreateOrderModal(false)}
        onOrderCreated={() => {
          fetchOrders()
          setShowCreateOrderModal(false)
        }}
      />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* En-tête avec statistiques */}
          <div className="bg-gray-50 px-6 py-4 border-b">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                  <Package className="mr-3" size={28} />
                  Gestion des Commandes
                </h1>
                <div className="text-sm text-gray-600 mt-1">
                  {totalOrders} commandes au total
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowCreateOrderModal(true)}
                  className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium transition-colors"
                >
                  <Plus className="mr-2" size={16} />
                  Créer une commande
                </button>
                <button
                  onClick={fetchOrders}
                  className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  <Package className="mr-2" size={16} />
                  Actualiser
                </button>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  <Filter className="mr-2" size={16} />
                  Filtres
                </button>
              </div>
            </div>
          </div>

          {/* Filtres */}
          {showFilters && (
            <div className="bg-gray-50 border-b p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recherche
                  </label>
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={16}
                    />
                    <input
                      type="text"
                      placeholder="Nom, email, produit..."
                      value={filters.search}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          search: e.target.value
                        }))
                      }
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Statut
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        status: e.target.value
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Tous les statuts</option>
                    <option value="pending">En attente</option>
                    <option value="confirmed">Confirmée</option>
                    <option value="rejected">Rejetée</option>
                    <option value="processing">En traitement</option>
                    <option value="shipped">Expédiée</option>
                    <option value="delivered">Livrée</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type d&apos;articles
                  </label>
                  <select
                    value={filters.itemType}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        itemType: e.target.value
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Tous les types</option>
                    <option value="products">Produits uniquement</option>
                    <option value="packs">Packs uniquement</option>
                    <option value="mixed">Commandes mixtes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date de
                  </label>
                  <input
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        dateFrom: e.target.value
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date à
                  </label>
                  <input
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        dateTo: e.target.value
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Montant min (DH)
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={filters.minAmount}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        minAmount: e.target.value
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Montant max (DH)
                  </label>
                  <input
                    type="number"
                    placeholder="1000"
                    value={filters.maxAmount}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        maxAmount: e.target.value
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => {
                    setFilters({
                      search: "",
                      status: "",
                      dateFrom: "",
                      dateTo: "",
                      minAmount: "",
                      maxAmount: "",
                      itemType: ""
                    })
                    setCurrentPage(1)
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Réinitialiser
                </button>
              </div>
            </div>
          )}

          {/* Tableau */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort("orderNumber")}
                      className="flex items-center hover:text-gray-700"
                    >
                      Commande
                      <ArrowUpDown className="ml-1" size={14} />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort("customerName")}
                      className="flex items-center hover:text-gray-700"
                    >
                      Client
                      <ArrowUpDown className="ml-1" size={14} />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort("date")}
                      className="flex items-center hover:text-gray-700"
                    >
                      Date
                      {sort.field === "date" &&
                        (sort.direction === "asc" ? (
                          <ArrowUp className="ml-1" size={14} />
                        ) : (
                          <ArrowDown className="ml-1" size={14} />
                        ))}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Articles
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort("total")}
                      className="flex items-center hover:text-gray-700"
                    >
                      Total
                      {sort.field === "total" &&
                        (sort.direction === "asc" ? (
                          <ArrowUp className="ml-1" size={14} />
                        ) : (
                          <ArrowDown className="ml-1" size={14} />
                        ))}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedOrders.map((order) => {
                  const { productCount, packCount } = getItemTypeStats(order)

                  return (
                    <React.Fragment key={order._id}>
                      {/* Ligne principale de la commande */}
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {order.orderNumber}
                              </div>
                              <div className="text-sm text-gray-500">
                                {order.items.length} article
                                {order.items.length > 1 ? "s" : ""}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <User className="mr-2 text-gray-400" size={16} />
                            <div className="text-sm font-medium text-gray-900">
                              {order.customerName}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Calendar
                              className="mr-2 text-gray-400"
                              size={16}
                            />
                            <div className="text-sm text-gray-900">
                              {formatDate(order.orderDate)}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              updateOrderStatus(
                                order._id,
                                e.target.value as Order["status"]
                              )
                            }
                            className={`px-2 py-1 text-xs font-semibold rounded-full border-0 ${getStatusColor(
                              order.status
                            )}`}
                          >
                            <option value="pending">En attente</option>
                            <option value="confirmed">Confirmée</option>
                            <option value="rejected">Rejetée</option>
                            <option value="processing">En traitement</option>
                            <option value="shipped">Expédiée</option>
                            <option value="delivered">Livrée</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            {productCount > 0 && (
                              <div className="flex items-center text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                <Package className="w-3 h-3 mr-1" />
                                {productCount} produit
                                {productCount > 1 ? "s" : ""}
                              </div>
                            )}
                            {packCount > 0 && (
                              <div className="flex items-center text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                                <Gift className="w-3 h-3 mr-1" />
                                {packCount} pack{packCount > 1 ? "s" : ""}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {order.total.toFixed(2)} DH
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => toggleOrderDetails(order._id)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            {expandedOrders.has(order._id) ? (
                              <ChevronUp size={20} />
                            ) : (
                              <ChevronDown size={20} />
                            )}
                          </button>
                        </td>
                      </tr>

                      {/* Ligne des détails (déroulante) */}
                      {expandedOrders.has(order._id) && (
                        <tr>
                          <td colSpan={7} className="px-0 py-0">
                            <div className="bg-gray-50 border-l-4 border-blue-500">
                              <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Informations client */}
                                <div className="space-y-4">
                                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                    Informations Client
                                  </h3>

                                  <div className="space-y-3">
                                    <div className="flex items-start">
                                      <User
                                        className="mr-3 text-gray-400 mt-1"
                                        size={16}
                                      />
                                      <div>
                                        <p className="text-sm font-medium text-gray-900">
                                          {order.customerName}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                          Nom complet
                                        </p>
                                      </div>
                                    </div>

                                    <div className="flex items-start">
                                      <Phone
                                        className="mr-3 text-gray-400 mt-1"
                                        size={16}
                                      />
                                      <div>
                                        <p className="text-sm font-medium text-gray-900">
                                          {order.customerPhone}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                          Téléphone
                                        </p>
                                      </div>
                                    </div>

                                    <div className="flex items-start">
                                      <MapPin
                                        className="mr-3 text-gray-400 mt-1"
                                        size={16}
                                      />
                                      <div>
                                        <p className="text-sm font-medium text-gray-900">
                                          {order.customerAddress}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                          Adresse de livraison
                                        </p>
                                      </div>
                                    </div>

                                    <div className="flex items-start">
                                      <CreditCard
                                        className="mr-3 text-gray-400 mt-1"
                                        size={16}
                                      />
                                      <div>
                                        <select
                                          value={order.paymentMethod}
                                          onChange={(e) =>
                                            updateOrderPaymentMethod(
                                              order._id,
                                              e.target.value
                                            )
                                          }
                                          className="text-sm font-medium text-gray-900 border rounded px-2 py-1"
                                        >
                                          <option value="Carte bancaire">
                                            Carte bancaire
                                          </option>
                                          <option value="PayPal">PayPal</option>
                                          <option value="Virement bancaire">
                                            Virement bancaire
                                          </option>
                                          <option value="À la livraison">
                                            À la livraison
                                          </option>
                                          <option value="Chèque">Chèque</option>
                                        </select>
                                        <p className="text-sm text-gray-500">
                                          Mode de paiement
                                        </p>
                                      </div>
                                    </div>

                                    {order.notes && (
                                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                        <p className="text-sm text-yellow-800">
                                          <strong>Note:</strong> {order.notes}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Articles commandés */}
                                <div className="space-y-4">
                                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                    Articles Commandés
                                  </h3>

                                  <div className="space-y-4 max-h-96 overflow-y-auto">
                                    {/* Section Produits */}
                                    {order.items.filter((item) => item.type === "product").length > 0 && (
                                      <div>
                                        <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                          <Package size={16} />
                                          Produits ({order.items.filter((item) => item.type === "product").length})
                                        </h4>
                                        <div className="space-y-2">
                                          {order.items
                                            .filter((item) => item.type === "product")
                                            .map((item) => renderOrderItem(item))}
                                        </div>
                                      </div>
                                    )}

                                    {/* Section Packs */}
                                    {order.items.filter((item) => item.type === "pack").length > 0 && (
                                      <div>
                                        <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                          <Gift size={16} />
                                          Packs ({order.items.filter((item) => item.type === "pack").length})
                                        </h4>
                                        <div className="space-y-2">
                                          {order.items
                                            .filter((item) => item.type === "pack")
                                            .map((item) => renderOrderItem(item))}
                                        </div>
                                      </div>
                                    )}
                                  </div>

                                  {/* Total de la commande */}
                                  <div className="border-t pt-4">
                                    <div className="flex justify-between items-center">
                                      <span className="text-lg font-semibold text-gray-900">
                                        Total de la commande:
                                      </span>
                                      <span className="text-xl font-bold text-blue-600">
                                        {order.total.toFixed(2)} DH
                                      </span>
                                    </div>
                                    {order.coupon && (
                                      <div className="flex justify-between items-center">
                                        <span className="text-lg font-semibold text-gray-900">
                                          COUPON:
                                        </span>
                                        <span className="text-xl font-bold text-blue-600">
                                          {order.coupon?.value} DH
                                        </span>
                                      </div>
                                    )}
                                    <p className="text-sm text-gray-500 mt-1">
                                      Livraison: {order.shippingMethod}
                                    </p>

                                    {/* Résumé des économies */}
                                    {order.items.some(
                                      (item) =>
                                        item.type === "pack" &&
                                        (item as OrderPack).discountPrice
                                    ) && (
                                      <div className="mt-2 p-2 bg-green-50 rounded">
                                        <p className="text-sm text-green-700">
                                          <strong>Économies réalisées:</strong>{" "}
                                          {order.items
                                            .reduce((savings, item) => {
                                              if (item.type === "pack") {
                                                const pack = item as OrderPack
                                                if (pack.discountPrice) {
                                                  return (
                                                    savings +
                                                    (pack.price -
                                                      pack.discountPrice) *
                                                      pack.quantity
                                                  )
                                                }
                                              }
                                              return savings
                                            }, 0)
                                            .toFixed(2)}{" "}
                                          DH grâce aux packs
                                        </p>
                                      </div>
                                    )}
                                  </div>

                                  {/* Actions sur la commande */}
                                  <div className="flex space-x-3 pt-4">
                                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm">
                                      Imprimer facture
                                    </button>
                                    <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm">
                                      Contacter client
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
              <div className="flex items-center text-sm text-gray-700">
                Affichage de {(currentPage - 1) * itemsPerPage + 1} à{" "}
                {Math.min(
                  currentPage * itemsPerPage,
                  totalOrders
                )}{" "}
                sur {totalOrders} commandes
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="mr-1" size={16} />
                  Précédent
                </button>

                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (currentPage <= 3) {
                      pageNum = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = currentPage - 2 + i
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-2 text-sm font-medium rounded-md ${
                          currentPage === pageNum
                            ? "bg-blue-500 text-white"
                            : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Suivant
                  <ChevronRight className="ml-1" size={16} />
                </button>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminOrdersTable
