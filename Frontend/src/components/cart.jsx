import {axios} from "../Api/client"
import { Field, Form , Formik} from "formik"
import { useEffect } from "react"

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

  useEffect(() => {
    // axios.post()
  })

  return (
    <div className="bg-gray-50">
        <div className="grid grid-cols-2 px-1 ">
          {/* form */}
          <div className="col-span-1 pl-7 pt-20 ">
            <h1 className="font-bold text-2xl ">Contact Information</h1>
            <Formik 
            initialValues={initialValue}
            >
            <Form>
             {/* //? email */}
              <div className=" w-96 pt-5 ">
                <label htmlFor="email" className="customizeLabel">Email Address</label>
                 <Field type="email" name="email" id="email" className="customizeForm"/>
              </div>

                  <h1 className="font-bold text-xl pb-10 pt-16">Shipping Information</h1>

              {/* name and last name  */}
              <div className="flex space-x-10 ">

                <div>
                <label htmlFor="name">Name</label>
                <Field type="text" name="name" id="name" className="customizeForm"/>
                </div>

                  <div>
                <label htmlFor="lastname">Last Name</label>
                <Field type="text" name="lastname" id="lastname" className="customizeForm"/>
                  </div>
                  
              </div>

              {/* address */}
              <div className="w-96 pt-10">
              <label htmlFor="address">Address</label>
                <Field type="text" name="address" id="address" className="customizeForm"/>
              </div>

             
              {/* city and country  */}
              <div className="flex space-x-10 pt-10">
                <div>
                <label htmlFor="city">City</label>
                <Field type="text" name="city" id="city" className="customizeForm"/>
                </div>

                  <div>
                <label htmlFor="country">Country</label>
                <Field type="text" name="country" id="country" className="customizeForm"/>
                  </div>
              </div>

              {/* state and postal code  */}
              <div className="flex space-x-10 pt-10">
                <div>
                <label htmlFor="state">State/Province</label>
                <Field type="text" name="state" id="state" className="customizeForm"/>
                </div>

                  <div>
                <label htmlFor="postalcode">Postal Code</label>
                <Field type="text" name="postalcode" id="postalcode" className="customizeForm"/>
                  </div>
              </div>

              
              {/* phone */}
              <div className="w-96 pt-10">
              <label htmlFor="phone">Address</label>
                <Field type="text" name="phone" id="phone" className="customizeForm"/>
              </div>

                {/* //? Payment  */}
                <div className=" py-20 space-y-5">
                  <h1 className="font-bold text-xl ">Payment</h1>

                  <div className="w-96 ">
                    <label htmlFor="cardnumber">Card Number</label>
                    <Field type="text" name="cardnumber" id="cardnumber" className="customizeForm"/>
                  </div>

                  <div className="w-96">
                  <label htmlFor="cardname">Name on card</label>
                    <Field type="text" name="cardname" id="cardname" className="customizeForm"/>
                  </div>

                  <div className=" flex space-x-10 pt-4">
                  <div>
                  <label htmlFor="cardnumber">Expiration Date(MM/YY)</label>
                    <Field type="month" name="expiration" id="cardnumber" className="customizeForm"/>
                  </div>

                    <div className="w-32">
                    <label htmlFor="phone">CVC</label>
                    <Field type="text" name="cardnumber" id="cardnumber" className="customizeForm"/>
                    </div>             
            
                  </div>
              </div>
            </Form>
            </Formik>

          </div>

          {/* order summary */}
          <div className="col-span- pt-20 bg-white">


          </div>
        </div>
    </div>
  )
}

export default Cart