"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cartStore"
import { checkoutAction } from "./checkoutAction";

export default function CheckoutPage() {
    const { items, removeItem, addItem, clearCart } = useCartStore();
    const total = items.reduce(
        (acc, item) => acc + item.price * item.quantity, 0
    )

    if (total === 0 || items.length === 0) {
        return (
            <div>
                {""}
                <h1>Your Cart is Empty.</h1>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
            <Card className="max-w-md mx-auto mb-8">
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-x-4">
                        {items.map((item, key) => (
                            <li key={key} className="flex flex-col gap-2 border-b pb-2 mr-0">
                                <div className="flex justify-between">
                                    <span className="font-medium">{item.name}</span>
                                    <span className="font-semibold">
                                        {""}
                                        ${((item.price * item.quantity) / 100).toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm" onClick={() => removeItem(item.id)}>
                                        -
                                    </Button>
                                    <span className="text-lg font-semibold">{item.quantity}</span>
                                    <Button className="bg-black" size="sm" onClick={() => addItem({ ...item, quantity: 1 })}><span className="text-white">+</span></Button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-4 border-t pt-2 text-lg font-semibold">Total: ${(total / 100).toFixed(2)}</div>
                </CardContent>
            </Card>
            <form action={checkoutAction} className="max-w-xs mx-auto grid grid-rows-2 gap-4 mt-12">
                <input type="hidden" name="items" value={JSON.stringify(items)} />
                <Button type="submit" variant="default" className="w-full bg-black rounded-2xl">
                    <span className="text-white"> Proceed to Payment</span>
                </Button>
                <Button onClick={() => clearCart()} variant="default" className="w-full bg-amber-300 rounded-2xl">Clear Cart</Button>
            </form>
        </div>
    )
}