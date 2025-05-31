"use client";
import PrivateRoute from "@/app/components/core/private-route";
import CheckoutPage from "@/app/checkout/components/checkout";


export default function Home() {
  return (
    <>
      <div>
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <PrivateRoute>
            <CheckoutPage />
          </PrivateRoute>
        </main>
      </div>
    </>
  );
}
