import { getProductById } from "@/app/utils/productUtils";
import { getUserFromServer } from "@/app/utils/getUserFromServer";

export default async function ProductDetailPage({ params }) {
  const { productId } = await params;
  const product = await getProductById(productId);

  const user = await getUserFromServer();
  

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-8 text-center">
        <img
          src="/images/fallBackImage.png" // Use a fun illustration (e.g., empty box, magnifying glass)
          alt="No Product Found"
          className="h-64 mb-6"
        />
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">
          Oops! Product not found
        </h1>
        <p className="text-gray-600 mb-6">
          The product you're looking for might have been removed, renamed, or is
          temporarily unavailable.
        </p>
        <div className="flex gap-4">
          <a
            href="/"
            className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
          >
            Back to Home
          </a>
          <a
            href="/categories"
            className="border border-black text-black px-6 py-2 rounded-full hover:bg-black hover:text-white transition"
          >
            Browse Products
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-12">
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
        <div className=" h-[400px] bg-white rounded-xl flex items-center justify-center p-4 overflow-hidden group">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-110 cursor-zoom-in"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {product.name}
          </h1>
          <p className="text-gray-700 text-sm mb-1">Size: {product.size}</p>
          <p className="text-gray-700 text-sm mb-1">
            For: {product.target_audience}
          </p>
          <p className="text-green-600 font-semibold text-2xl mb-4">
            ₹ {parseFloat(product.price).toFixed(2)}
          </p>

          <p className="text-gray-600 text-base mb-4">
            {product.description || "No description available."}
          </p>

          {user?.role === "buyer" && (
            <button className="w-40 bg-black text-white py-3 rounded hover:bg-gray-800">
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
