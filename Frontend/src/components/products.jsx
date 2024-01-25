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
      .get(`${process.env.REACT_APP_baseURL}core/getProducts/`)
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
          <div className="flex justify-end  items-center mr-24 mt-8 relative">
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
      <div className="pl-7 pt-8 md:pt-0 ">
        <h1 className="font-bold text-3xl pl-10 ">Top Deals</h1>
        <div className="md:flex md:space-x-10 pt-8 space-y-3 md:space-y-0">
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
