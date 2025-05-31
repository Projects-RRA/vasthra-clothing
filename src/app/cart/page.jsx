"use client";
import PrivateRoute from "@/app/components/core/private-route";
import CartPage from "@/app/cart/components/cart";

export default function Home() {
  return (
    <>
      <div>
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        </main>
      </div>
    </>
  );
}
