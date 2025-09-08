// hooks/useCart.ts
'use client';

import { CartItem } from '@/types/type';
import { useState, useEffect } from 'react';


export const useCart = () => {
  // Constante pour le seuil de livraison gratuite
  const FREE_SHIPPING_THRESHOLD = 1000; // DH

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Charger le panier depuis localStorage au démarrage
  useEffect(() => {
    const savedCart = localStorage.getItem('couture-cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Erreur lors du chargement du panier:', error);
      }
    }
  }, []);

  // Sauvegarder le panier dans localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem('couture-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Ajouter un article au panier
  const addItem = (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    setCartItems(currentItems => {
      const existingItem = currentItems.find(cartItem => 
        cartItem.id === item.id && 
        cartItem.color === item.color && 
        cartItem.size === item.size
      );

      if (existingItem) {
        return currentItems.map(cartItem =>
          cartItem.id === existingItem.id && 
          cartItem.color === existingItem.color && 
          cartItem.size === existingItem.size
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }

      return [...currentItems, { ...item, quantity }];
    });
  };

  // Mettre à jour la quantité d'un article
  const updateQuantity = (id: number, quantity: number, color?: string, size?: string) => {
    if (quantity <= 0) {
      removeItem(id, color, size);
      return;
    }

    setCartItems(currentItems =>
      currentItems.map(item =>
        item.id === id && item.color === color && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Supprimer un article du panier
  const removeItem = (id: number, color?: string, size?: string) => {
    setCartItems(currentItems =>
      currentItems.filter(item => 
        !(item.id === id && item.color === color && item.size === size)
      )
    );
  };

  // Vider le panier
  const clearCart = () => {
    setCartItems([]);
  };

  // Ouvrir/fermer le panier
  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Calculs
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);
  const progressPercentage = Math.min(100, (totalPrice / FREE_SHIPPING_THRESHOLD) * 100);
  const hasFreeShipping = totalPrice >= FREE_SHIPPING_THRESHOLD;

  return {
    // State
    cartItems,
    isCartOpen,
    FREE_SHIPPING_THRESHOLD,
    
    // Actions
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
    
    // Computed values
    totalItems,
    totalPrice,
    remainingForFreeShipping,
    progressPercentage,
    hasFreeShipping,
  };
};