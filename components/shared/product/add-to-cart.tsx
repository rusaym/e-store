"use client";

import { Button } from "@/components/ui/button";
import { addItemToCart } from "@/lib/actions/cart.actions";
import { CartItem } from "@/types";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AddToCart = ({ item }: { item: CartItem }) => {
  const router = useRouter();

  async function handleAddToCart() {
    const res = await addItemToCart(item);

    if (!res.success) {
      toast.error("Error accured during adding to cart", {
        description: res.message,
      });
      return;
    }

    toast.success("Success", {
      description: `${item.name} added to cart`,
      action: {
        label: "Go to cart",
        onClick: () => router.push("/cart"),
      },
    });
  }
  return (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      <PlusIcon /> Add To Cart
    </Button>
  );
};

export default AddToCart;
