import useFetch from "./hooks/useFetch";
import React from "react";
import "./index.css"; 
import "./App.css"; 

function App() {
  const { data, loading, error } = useFetch("https://api.escuelajs.co/api/v1/products");

  if (loading) return <p className="loading text-blue-500">Loading...</p>;
  if (error) return <p className="error text-red-500">Error: {error}</p>;

  return (
    <div className=" main p-4 max-w-7xl mx-auto">
   

      <h1 className="text-2xl font-normal text-sm line-clamp-1 name  mb-4 text-center">Product</h1>
      <div className=" Product grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {data.map((product) => (
          <div
            key={product.id}
            className="product-card w-[300px] h-[320px] border border-gray-300 rounded shadow p-2 flex flex-col"
          >
            <img
              src={product.images[0]}
              alt={product.title}
              className="product-image w-full h-[150px] object-cover rounded"
            />
            <h2 className="title  mt-2 font-bold text-sm line-clamp-1">{product.title}</h2>
            <p className="price text-sm font-semibold mt-auto">₹ {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
