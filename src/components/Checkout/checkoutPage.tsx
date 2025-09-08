'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import CheckoutForm from '@/components/Checkout/CheckoutForm'
import CartSummary from '@/components/Checkout/CartSummary'
import { ShoppingBag, Lock, Truck } from 'lucide-react'
import { CartItem, CheckoutFormData } from '@/types/type'

// Données d'exemple du panier
const initialCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Ciseaux de couture professionnels',
    price: 29.99,
    quantity: 1,
    image: '✂️',
    category: 'Outils'
  },
  {
    id: '2',
    name: 'Bobines de fil coloré (x12)',
    price: 24.50,
    quantity: 2,
    image: '🧵',
    category: 'Fils'
  },
  {
    id: '3',
    name: 'Épingles à tête colorée (x100)',
    price: 8.90,
    quantity: 1,
    image: '📍',
    category: 'Épingles'
  },
  {
    id: '4',
    name: 'Mètre ruban flexible',
    price: 12.30,
    quantity: 1,
    image: '📏',
    category: 'Mesure'
  }
]

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  // Calculs du panier
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal >= 75 ? 0 : 6.90
  const total = subtotal + shipping

  // Gestion des quantités
  const updateQuantity = (id: string, newQuantity: number): void => {
    if (newQuantity <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== id))
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      )
    }
  }

  const removeItem = (id: string): void => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const handleCheckout = async (formData: CheckoutFormData): Promise<void> => {
    setIsProcessing(true)
    
    try {
      // Simulation de traitement
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Commande confirmée:', { formData, cartItems, total })
      alert(`Merci ${formData.customerName} ! Votre commande de ${total.toFixed(2)}€ sera livrée à ${formData.city}.`)
      
    } catch (error) {
      console.error('Erreur lors du traitement:', error)
      alert('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-orange-100 p-3 rounded-full">
                <ShoppingBag className="text-orange-600" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Finaliser ma commande</h1>
                <p className="text-gray-600">Quelques informations et c&apos;est parti !</p>
              </div>
            </div>
          </motion.div>
        </div>
      </header>


      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Formulaire de commande */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <CheckoutForm 
              onSubmit={handleCheckout} 
              isProcessing={isProcessing}
              total={total}
            />
          </motion.div>

          {/* Résumé du panier */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <CartSummary 
              items={cartItems}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
              subtotal={subtotal}
              shipping={shipping}
              total={total}
            />
          </motion.div>
        </div>
      </main>
    </div>
  )
}
