'use client';

import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, Truck } from 'lucide-react';
import { SideCartProps } from '@/types/type';
import Link from 'next/link';
import Image from 'next/image';
import { FREE_SHIPPING_THRESHOLD } from '@/data';




const SideCart: React.FC<SideCartProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem
}) => {
  // Variable pour le seuil de livraison gratuite
  // Calcul du total
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Calcul du montant restant pour la livraison gratuite
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);

  // Pourcentage de progression vers la livraison gratuite
  const progressPercentage = Math.min(100, (totalPrice / FREE_SHIPPING_THRESHOLD) * 100);

  const handleQuantityChange = (id: string, change: number) => {
    const item = items.find(item => item.id === id);
    if (item) {
      const newQuantity = Math.max(0, item.quantity + change);
      if (newQuantity === 0) {
        onRemoveItem(id);
      } else {
        onUpdateQuantity(id, newQuantity);
      }
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0  z-100 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Side Cart */}
      <div className={`
        fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-110
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-firstColor text-white p-4 flex items-center justify-between">
            <div className="flex items-center">
              <ShoppingBag size={24} className="mr-3" />
              <div>
                <h2 className="text-lg font-semibold">Mon Panier</h2>
                <p className="text-orange-100 text-sm">
                  {items.length} article{items.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-secondColor rounded-full transition-colors duration-200"
            >
              <X size={20} />
            </button>
          </div>

          {/* Progress Bar for Free Shipping */}
          {totalPrice < FREE_SHIPPING_THRESHOLD && (
            <div className="bg-orange-50 p-4 border-b">
              <div className="mb-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 flex items-center">
                    <Truck size={16} className="mr-1" />
                    Livraison gratuite
                  </span>
                  <span className="text-secondColor font-medium">
                    {remainingForFreeShipping} DH restants
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-firstColor h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                Ajoutez {remainingForFreeShipping} DH pour bénéficier de la livraison gratuite !
              </p>
            </div>
          )}

          {/* Free Shipping Achieved */}
          {totalPrice >= FREE_SHIPPING_THRESHOLD && (
            <div className="bg-green-50 p-4 border-b">
              <div className="flex items-center text-green-700">
                <Truck size={20} className="mr-2" />
                <div>
                  <p className="font-medium">🎉 Livraison gratuite activée !</p>
                  <p className="text-sm">Votre commande sera livrée gratuitement.</p>
                </div>
              </div>
            </div>
          )}

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ShoppingBag size={64} className="mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">Votre panier est vide</h3>
                <p className="text-sm text-center px-4">
                  Découvrez nos magnifiques accessoires de couture et commencez vos créations !
                </p>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-gray-100 rounded-lg mr-4 flex items-center justify-center overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}       // largeur en pixels (correspond à w-20)
                        height={80}      // hauteur en pixels (correspond à h-20)
                        className="object-cover w-full h-full"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 mb-1 line-clamp-2">
                        {item.name}
                      </h4>
                      {(item.color || item.size) && (
                        <div className="text-xs text-gray-500 mb-2">
                          {item.color && <span>Couleur: {item.color}</span>}
                          {item.color && item.size && <span className="mx-1">•</span>}
                          {item.size && <span>Taille: {item.size}</span>}
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => handleQuantityChange(item.id, -1)}
                            className="p-1 hover:bg-gray-100 transition-colors duration-200"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-3 py-1 text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className="p-1 hover:bg-gray-100 transition-colors duration-200"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        {/* Price and Remove */}
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-secondColor">
                            {(item.price * item.quantity).toFixed(2)} DH
                          </span>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors duration-200"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t bg-white p-4">
              {/* Total */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-800">Total:</span>
                <span className="text-xl font-bold text-secondColor">
                  {totalPrice.toFixed(2)} DH
                </span>
              </div>

              {/* Shipping Info */}
              <div className="text-xs text-gray-500 mb-4 text-center">
                {totalPrice >= FREE_SHIPPING_THRESHOLD ? (
                  <span className="text-green-600">✓ Livraison gratuite incluse</span>
                ) : (
                  <span>Frais de livraison: 30 DH</span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 text-center">
                <Link
                  className="w-full bg-firstColor text-white py-3 rounded-lg font-semibold hover:bg-secondColor transition-colors duration-200"
                  href='/checkout'
                >
                  Valider la commande
                </Link>
                <Link
                  className="w-full bg-white text-firstColor border-2 border-firstColor py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors duration-200"
                  href='/shop'
                >
                  Continuer mes achats
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SideCart;