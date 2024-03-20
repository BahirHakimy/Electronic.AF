import { useEffect, useState } from "react";
import Card from "../common/card";
import { baseAxios, getTokens } from "../Api/client";
import { BsSearch } from "react-icons/bs";
import Navbar from "../common/navbar";

const Products = () => {
  const [products, setProducts] = useState();
  const authenticated = getTokens();

  useEffect(() => {
    baseAxios
      .get(`${process.env.REACT_APP_baseURL}core/getProducts/`)
      .then((res) => setProducts(res.products));
  }, []);

  return (
    <div>
      {/* navbar  */}
      <Navbar />

      {/* body  */}

      {/* card  */}
      <div className="pl-7 pt-8 md:pt-0 ">
        <h1 className="font-bold text-3xl pl-10 ">Top Deals</h1>
        <div className="md:flex md:space-x-10 pt-8 space-y-3 md:space-y-0">
          {products ? (
            products.map((info) => (
              <Card key={info.id} authenticated={authenticated} info={info} />
            ))
          ) : (
            <div className="flex space-x-2">
              {Array.from({ length: 5 }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white animate-pulse shadow-lg px-2 py-4 max-w-fit "
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

      {/* footer */}
    </div>
  );
};

export default Products;
