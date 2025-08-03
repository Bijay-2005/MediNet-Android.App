import { useState, useCallback } from "react";
import { CartItem, HealthPackage } from "@/types";
import { toast } from "@/hooks/use-toast";

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((healthPackage: HealthPackage) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.package.id === healthPackage.id);
      
      if (existingItem) {
        toast({
          title: "Item already in cart",
          description: `${healthPackage.name} is already in your cart.`,
        });
        return prevItems;
      }

      toast({
        title: "Added to cart",
        description: `${healthPackage.name} has been added to your cart.`,
      });

      return [...prevItems, { package: healthPackage, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((packageId: string) => {
    setCartItems(prevItems => {
      const item = prevItems.find(item => item.package.id === packageId);
      if (item) {
        toast({
          title: "Removed from cart",
          description: `${item.package.name} has been removed from your cart.`,
        });
      }
      return prevItems.filter(item => item.package.id !== packageId);
    });
  }, []);

  const updateQuantity = useCallback((packageId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(packageId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.package.id === packageId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  }, []);

  const getTotalItems = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((total, item) => total + (item.package.price * item.quantity), 0);
  }, [cartItems]);

  const isInCart = useCallback((packageId: string) => {
    return cartItems.some(item => item.package.id === packageId);
  }, [cartItems]);

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isInCart,
  };
};