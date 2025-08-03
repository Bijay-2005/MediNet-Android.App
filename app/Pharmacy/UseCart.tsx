import { useState } from 'react'
import { CartItem } from './CartSheet'

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // Sample items for demonstration
    {
      id: '1',
      name: 'Paracetamol 500mg',
      price: 8.99,
      quantity: 2,
      dosage: '500mg - 20 tablets'
    },
    {
      id: '2', 
      name: 'Vitamin D3',
      price: 15.50,
      quantity: 1,
      dosage: '1000 IU - 60 capsules'
    },
    {
      id: '3',
      name: 'Ibuprofen 400mg',
      price: 12.75,
      quantity: 1,
      dosage: '400mg - 30 tablets'
    }
  ])

  const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === newItem.id)
      if (existingItem) {
        return prev.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...newItem, quantity: 1 }]
    })
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const clearCart = () => {
    setCartItems([])
  }

  return {
    cartItems,
    addToCart,
    updateQuantity,
    removeItem,
    getTotalItems,
    getTotalAmount,
    clearCart
  }
}