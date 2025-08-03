import { useState } from "react"
import { Minus, Plus, Trash2, CreditCard } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
  dosage?: string
}

interface CartSheetProps {
  children: React.ReactNode
  cartItems: CartItem[]
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemoveItem: (id: string) => void
  onCheckout: () => void
}

export function CartSheet({ 
  children, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout 
}: CartSheetProps) {
  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            Shopping Cart
            <Badge variant="secondary">{totalItems} items</Badge>
          </SheetTitle>
          <SheetDescription>
            Review your selected medicines before checkout
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-1 -mx-6 px-6 h-[400px]">
          <div className="space-y-4 py-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Your cart is empty</p>
                <p className="text-sm text-muted-foreground mt-2">Add some medicines to get started</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <Card key={item.id} className="p-3">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-3">
                      {item.image && (
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-8 h-8 object-cover rounded"
                          />
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.name}</h4>
                        {item.dosage && (
                          <p className="text-xs text-muted-foreground">{item.dosage}</p>
                        )}
                        <p className="text-sm font-semibold text-primary">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 w-7 p-0"
                          onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 w-7 p-0"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                          onClick={() => onRemoveItem(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </ScrollArea>

        {cartItems.length > 0 && (
          <SheetFooter className="flex-col space-y-4">
            <Separator />
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal ({totalItems} items)</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivery Fee</span>
                <span>$2.99</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${(totalAmount + 2.99).toFixed(2)}</span>
              </div>
            </div>

            <Button 
              className="w-full gap-2 bg-cyan-400 hover:bg-cyan-500 text-white" 
              size="lg"
              onClick={onCheckout}
              disabled={cartItems.length === 0}
            >
              <CreditCard className="h-4 w-4" />
              Proceed to Checkout
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}