"use client";

import { Button } from "@/components/ui/button";
import { addItemToCart } from "@/lib/actions/cart.actions";
import { CartItem } from "@/types";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AddToCart({ item }: { item: CartItem }) {
  const router = useRouter();

  async function handleAddToCart() {
    const res = await addItemToCart(item);
    if (!res.success) {
      toast("Sorry, something went wrong(((", {
        description: res.message,
      });

      return;
    }

    // Handle success add to a cart
    toast("Congratulations!", {
      description: `${item.name} added to cart`,
      action: {
        label: "Go To Cart",
        onClick: () => router.push("/cart"),
      },
    });
  }

  return (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      <PlusIcon /> Add To Cart
    </Button>
  );
}
