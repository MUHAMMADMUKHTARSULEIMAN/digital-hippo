"use client";

import { ShoppingCart } from "lucide-react";
import { Separator } from "./ui/separator";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import { ScrollArea } from "./ui/scroll-area";
import CartItem from "./CartItem";
import { useEffect, useState } from "react";

const Cart = () => {
  const {items} = useCart()
  const itemCount = items.length
  const cartTotal = items.reduce((total, {product}) => total + product.price, 0)
  const fee = 1;
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <Sheet>
      <SheetTrigger className="group -m-2 p-2 flex items-center">
        <ShoppingCart className="h-6 w-6 flex-shrink-0 text-muted-foreground group-hover:text-accent-foreground" aria-hidden="true"/>
        <span className="ml-2 text-sm font-medium text-muted-foreground group-hover:text-accent-foreground">
          {isMounted ? itemCount : 0}
        </span>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Cart ({isMounted ? itemCount : 0})</SheetTitle>
        </SheetHeader>
        { isMounted && itemCount > 0 ? (
          <>
          <div className="flex w-full flex-col pr-6">
            {/* To-do: cart logic */}
            <ScrollArea>
              {isMounted && items.map(({product}) => (
                <CartItem product={product} key={product.id} />
              ))}
            </ScrollArea>
          </div>
          <div className="space-y-4 pr-6">
            <Separator />
            <div className="space-y-1.5 text-sm">
              <div className="flex">
                <span className="flex-1">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex">
                <span className="flex-1">Transaction Fee</span>
                <span>{formatPrice(fee)}</span>
              </div>
              <div className="flex">
                <span className="flex-1">Total</span>
                <span>{formatPrice(cartTotal + fee)}</span>
              </div>
            </div>
            <SheetFooter>
              <SheetTrigger asChild>
                <Link href={"/cart"} className={buttonVariants({className: "w-full",})}>Continue to Checkout </Link>
              </SheetTrigger>
            </SheetFooter>
          </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1" aria-hidden="true">
            <div className="relative h-60 w-60 mb-4 text-muted-foreground">
              <Image src="/hippo-empty-cart.png" fill alt="Empty shopping cart"/>
            </div>
            <div className="font-semibold text-xl">
              Your cart is empty.
            </div>
            <SheetTrigger asChild>
              <Link
              href={"/products"}
              className={buttonVariants({variant: "link", size: "sm", className: "text-sm text-muted-foreground"})}>
                Add items to your cart to checkout.
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default Cart;