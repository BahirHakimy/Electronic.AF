import { Link } from "react-router-dom"

const CardDetail = info => {


  return (
  
    <div className="">
          <Link to={`/cart`} >
        <div className="flex pt-1">
      <img src={`http://127.0.0.1:8000${info.product?.images[0].thumbnail}`} alt="desktop" className="w-16 h-16 rounded-md"/>
      <div className=" text-sm pt-1 pl-2 hover:bg-primary hover:grow hover:text-white ">
      <h1 className=" font-bold text-sm  grow ">{info.product.title}</h1>
      <p className="block">{info.product.memory} RAM</p>
      <p>{info.product.storage}{info.product.storageType}</p>
      </div>
      </div>

      </Link>

        </div>

  )
}

export default CardDetail