import {axios} from "../Api/client"
import { Field, Form , Formik} from "formik"
import { useEffect, useState } from "react"
import {useLocation} from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import CardDetail from "./Table"
const initialValue = {
  email: '',
  name: '',
  lastname: '',
  address: '',
  city: '',
  country: '',
  state: '',
  postalcode : '',
  phone: ''

}

const Cart = () => {

  const {state} = useLocation()
  const [cartData, setCartData] = useState();
  let price = 0;

  
  useEffect(() => {
    axios
    .post("http://127.0.0.1:8000/api/core/getCart/", {
      email: jwtDecode(state?.email).email,
    })
    .then(
      (res) => setCartData(res.data.items),
    );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  return (
    <div className="bg-background/25 ">
        <div className=" md:grid grid-cols-2 px-1 w-full mx-3 ">
          {/* form */}
          <div className="md:col-span-1 pl-3 md:pl-7 pt-20">
            <h1 className="font-bold text-2xl ">Contact Information</h1>
            <Formik 
            initialValues={initialValue}
            >
            <Form>
             {/* //? email */}
              <div className=" md:w-96 pt-5 ">
                <label htmlFor="email" className="customizeLabel">Email Address</label>
                 <Field type="email" name="email" id="email" className="border-gray-400 rounded w-full focus:ring-primary focus:border-primary"/>
              </div>

                  <h1 className="font-bold text-xl pb-10 pt-16">Shipping Information</h1>

              {/* name and last name  */}
              <div className="flex space-x-10 ">

                <div>
                <label htmlFor="name">Name</label>
                <Field type="text" name="name" id="name" className="border-gray-400 rounded w-full focus:ring-primary focus:border-primary"/>
                </div>

                  <div>
                <label htmlFor="lastname">Last Name</label>
                <Field type="text" name="lastname" id="lastname" className="border-gray-400 rounded w-full focus:ring-primary focus:border-primary"/>
                  </div>
                  
              </div>

              {/* address */}
              <div className="md:w-96 pt-10">
              <label htmlFor="address">Address</label>
                <Field type="text" name="address" id="address" className="border-gray-400 rounded w-full focus:ring-primary focus:border-primary"/>
              </div>

             
              {/* city and country  */}
              <div className="flex space-x-10 pt-10">
                <div>
                <label htmlFor="city">City</label>
                <Field type="text" name="city" id="city" className="border-gray-400 rounded w-full focus:ring-primary focus:border-primary"/>
                </div>

                  <div>
                <label htmlFor="country">Country</label>
                <Field type="text" name="country" id="country" className="border-gray-400 rounded w-full focus:ring-primary focus:border-primary"/>
                  </div>
              </div>

              {/* state and postal code  */}
              <div className="flex space-x-10 pt-10">
                <div>
                <label htmlFor="state">State/Province</label>
                <Field type="text" name="state" id="state" className="border-gray-400 rounded w-full focus:ring-primary focus:border-primary"/>
                </div>

                  <div>
                <label htmlFor="postalcode">Postal Code</label>
                <Field type="text" name="postalcode" id="postalcode" className="border-gray-400 rounded w-full focus:ring-primary focus:border-primary"/>
                  </div>
              </div>

              
              {/* phone */}
              <div className="md:w-96 pt-10">
              <label htmlFor="phone">Address</label>
                <Field type="text" name="phone" id="phone" className="border-gray-400 rounded w-full focus:ring-primary focus:border-primary"/>
              </div>

                {/* //? Payment  */}
                <div className=" py-20 space-y-5">
                  <h1 className="font-bold text-xl ">Payment</h1>

                  <div className="md:w-96 ">
                    <label htmlFor="cardnumber">Card Number</label>
                    <Field type="text" name="cardnumber" id="cardnumber" className="border-gray-400 rounded w-full focus:ring-primary focus:border-primary"/>
                  </div>

                  <div className="md:w-96">
                  <label htmlFor="cardname">Name on card</label>
                    <Field type="text" name="cardname" id="cardname" className="border-gray-400 rounded w-full focus:ring-primary focus:border-primary"/>
                  </div>

                  <div className=" flex space-x-10 pt-4">
                  <div>
                  <label htmlFor="cardnumber">Expiration Date(MM/YY)</label>
                    <Field type="month" name="expiration" id="cardnumber" className="border-gray-400 rounded w-full focus:ring-primary focus:border-primary "/>
                  </div>

                    <div className="md:w-32">
                    <label htmlFor="phone">CVC</label>
                    <Field type="text" name="cardnumber" id="cardnumber" className="border-gray-400 rounded w-full focus:ring-primary focus:border-primary"/>
                    </div>             
            
                  </div>
              </div>
            </Form>
            </Formik>

          </div>

          {/* order summary */}
          <div className="col-span-1 pt-20 mx-2 md:mx-10 ">
            <h1 className="font-semibold text-xl pb-5">Order Summary</h1>
              <div className="divide-y-2  space-y-4 border-2 border-gray-400 rounded-md p-4 shadow-md bg-white">
                {/* cart Data */}
                {cartData?.length &&  cartData?.map((data) => ((
                  price += parseInt(data.product.price) * data.quantity,
                  <CardDetail key={data.product.id} info={data} style={{height: "h-24" , width: "w-24", padding : 'pl-7' , imageMargin : 'ml-3', priceVisibility : false, deleteVisbile : false}}/>
               )))}

                    {/* accounting  */}
                    <div className="space-y-5 p-5">
                      <div className="flex justify-between">
                        <p>Subtotal:</p>
                        <p className="font-semibold">${price}.00</p>
                      </div>

                      <div className="flex justify-between">
                        <p>Shipping:</p>
                        <p className="font-semibold">$5.00</p>
                      </div>

                      <div className="flex justify-between">
                        <p>Taxes:</p>
                        <p className="font-semibold">$5.00</p>
                      </div>
                  </div>

                    {/* total */}
                    <div className="flex justify-between p-5">
                      <p className="capitalize">total : </p>
                      <p className="font-bold">${price+10}.00</p>
                    </div>

                      {/* //? why not mx-auto */}
                  <div className="flex justify-center py-3">
                     <button className="border bg-primary text-white rounded w-96 h-8  hover:bg-white hover:text-primary hover:border-secondary hover:border hover:scale-105">Check Out </button>
                  </div>
                    
                 
                </div>

          </div>
        </div>
    </div>
  )
}

export default Cart