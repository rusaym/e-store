"use client";

import { Button } from "@/components/ui/button";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { Cart, CartItem } from "@/types";
import { PlusIcon, MinusIcon, LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

const AddToCart = ({ item, cart }: { item: CartItem; cart?: Cart }) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  async function handleAddToCart() {
    startTransition(async () => {
      const res = await addItemToCart(item);

      if (!res.success) {
        toast.error("Error accured during adding to cart", {
          description: res.message,
        });
      } else
        toast.success("Success", {
          description: res.message,
          action: {
            label: "Go to cart",
            onClick: () => router.push("/cart"),
          },
        });
    });
  }
  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);
      console.log(res);
      if (res.success) {
        toast.success("Success", {
          description: res.message,
        });
      } else {
        toast.error("Error accured during removing from cart", {
          description: res.message,
        });
      }
    });
  };

  // Check if item is in cart
  const existItem =
    cart && cart.items.find((itm) => itm.productId === item.productId);

  return existItem ? (
    <div>
      <Button type="button" variant="outline" onClick={handleRemoveFromCart}>
        {isPending ? (
          <LoaderIcon className="w-4 h-4 animate-spin" />
        ) : (
          <MinusIcon className="h-4 w-4" />
        )}
      </Button>
      <span className="px-2">{existItem.qty}</span>
      <Button type="button" variant="outline" onClick={handleAddToCart}>
        {isPending ? (
          <LoaderIcon className="w-4 h-4 animate-spin" />
        ) : (
          <PlusIcon className="h-4 w-4" />
        )}
      </Button>
    </div>
  ) : (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      {isPending ? (
        <LoaderIcon className="w-4 h-4 animate-spin" />
      ) : (
        <PlusIcon className="h-4 w-4" />
      )}{" "}
      Add To Cart
    </Button>
  );
};

export default AddToCart;
