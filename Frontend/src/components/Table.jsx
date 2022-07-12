import {RiDeleteBin6Fill} from 'react-icons/ri'

const CardDetail = ({info, style}) => {


  return (
        <div className="flex justify-between pt-3 first:pt-1 ">
        <div className='flex grow'>
      <img src={`http://127.0.0.1:8000${info.product?.images[0].thumbnail}`} alt="desktop" className={` ${style.height} ${style.width} rounded-md  ${style.imageMargin} `}/>
      <div className={`text-sm pt-1 pl-2 ${style.padding} ${style.hover} !grow `}>
      <h1 className="font-bold text-sm grow">{info.product.title}</h1>
      <p className="block">{info.product.memory} RAM</p>
      <p>{info.product.storage}{info.product.storageType}</p>
      <p hidden={style.priceVisibility} className="font-semibold text-md pt-3">{info.product.price}<span>$</span></p>
      </div>
      </div>
      {/* icon */}
      <div hidden={style.deleteVisible} className="pr-5">
          <RiDeleteBin6Fill size={20} className="hover:text-primary"/>
       {/* //todo the spacing is not properly done */}
          <select name="quantity" id="quantity" className='rounded mt-7 focus:ring-primary focus:border-primary ' >
            <option value={info.quantity}>{info.quantity}</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>
         

      </div>
      </div>
  )
}

export default CardDetail