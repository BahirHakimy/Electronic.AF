import { useEffect, useState } from "react";
import Card from "../common/card";
import { baseAxios, getTokens } from "../Api/client";
import Navbar from "../common/navbar";

const Products = () => {
  const [products, setProducts] = useState();
  const authenticated = getTokens();

  useEffect(() => {
    baseAxios
      .get(`${process.env.REACT_APP_baseURL}core/getProducts/`)
      .then((res) => setProducts(res.data));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="pt-24 px-24 ">
        <h1 className="font-bold text-[2.5rem]">Top Deals</h1>
        <div className="flex  gap-8 pt-8">
          {products ? (
            products.map((info) => (
              <Card key={info.id} authenticated={authenticated} info={info} />
            ))
          ) : (
            <div className="grid grid-cols-5  gap-4 ">
              {Array.from({ length: 5 }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white animate-pulse shadow-lg px-3 py-5 max-w-fit "
                >
                  <div className="bg-gray-500 h-24 w-40 rounded mt- "></div>
                  <div className="flex space-x-4 mt-2">
                    <div className="bg-gray-500 h-3 w-14 rounded-sm"></div>
                    <div className="bg-gray-500 h-3 w-14 rounded-sm"></div>
                  </div>
                  <div className="bg-gray-500 h-3 w-32 mt-2 rounded-sm"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
