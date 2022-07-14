  import  { useEffect, useState } from "react";
  import Card from "../common/card";
  import { baseAxios, getTokens,  } from "../Api/client";
  import {  BsSearch } from "react-icons/bs";
  import Navbar from "../common/navbar";

const Products = () => {
  const [data, setData] = useState();
  const [authenticated] = useState(getTokens());
 
  useEffect(() => {
    baseAxios
      .get("http://127.0.0.1:8000/api/core/getProducts/")
      .then((res) => setData(res.data));
  }, []);

  return (
    <div>
      {/* navbar  */}
          <Navbar/>

      {/* body  */}

      {/* //* input */}
      <div>
        <form>
          <div className="flex justify-end items-center mr-24 mt-8 relative">
            <BsSearch className="h-4 w-4 absolute right-60" />
            <input
              type="text"
              className="pl-7 customizeForm w-64"
              placeholder="Search for products"
            />
          </div>
        </form>
      </div>
      {/* card  */}
      <div className="pl-8  ">
        <h1 className="font-bold text-3xl pl-10 ">Top Deals</h1>
        <div className="flex space-x-10 pt-8 ">
          {data ? (
            data.map((info) => (
              <Card key={info.id} authenticated={authenticated} info={info} />
            ))
          ) : (
            <h2>Loading</h2>
          )}
        </div>
      </div>

      {/* footer */}
    </div>
  );
};

export default Products;
