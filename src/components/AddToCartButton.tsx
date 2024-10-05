"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/use-cart";
import { Product } from "@/payload-types";

const AddToCartButton = ({product}: {product: Product}) => {
  const {addItem} = useCart()
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSuccess(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [isSuccess])
  return (
    <Button
    onClick={() => {
      addItem(product)
      setIsSuccess(true)
    }}
    className="w-full" size="lg"
    >
      {isSuccess ? "Added!" : "Add toCart"}
    </Button>
  )
}

export default AddToCartButton;