import { Field, Form, Formik } from 'formik'
import React, { useEffect, useRef } from 'react'


  const initialValues = {
     '0': '',
    '1': '',
    '2': '',
    '3': '',
    '4': '',
    '5': ''
    }
 
const SendResetCode = () => {
  
        const refInput = useRef([])

        useEffect(() => {
            if(refInput.current[0].value === '') refInput.current[0].focus();
        },[])

          const CustomInputComponent = (props) => (
            <input type="number" ref={e => refInput.current[props.name] = e} className='mx-2 rounded' maxLength={1} min={1} max={9} onKeyUp={handleKeyUp} onFocus={handleFocus} onInput={e => props.name === '0' ? splitNumber(e) : null }  required value={initialValues[props]} {...props} />
            );
            
              
            const handleFocus = (e) => {
              //* if the first input is selected the return;
              if(e.target.name === 'number1') return;
              
              //* giving the focus to the first input if the value is empty 
              if(e.target.name !== 'number1' && refInput.current[0].value === '') refInput.current[0].focus();

              //* if the previousElement is empty shift the focus to it 
              // if(refInput.current[e.target.idx])
              //todo make the functionlity 
                }

                const handleKeyUp = e => {
                  if (e.keyCode === 16 || e.keyCode === 9 || e.keyCode === 224 || e.keyCode === 18 || e.keyCode === 17) return;
                  if(e.target.value.length > 1) splitNumber(e)
                }
       
            const splitNumber = e =>  {
              let data = e.data || e.target.value; // Chrome doesn't get the e.data, it's always empty, fallback to value then.
              if ( ! data ) return; // Shouldn't happen, just in case.
              if ( data.length === 1 ) return; // Here is a normal behavior, not a paste action.
              
              popuNext(e.target, data);
            }
            
            const popuNext = (el,data) => {
             
              initialValues[el.name] = data[0]; // Apply first item to first input
              data = data.substring(1); // remove the first char.
              //* doing the same operation with the next element
              if(el.nextElementSibling && data.length) popuNext(el.nextElementSibling, data)
              console.log(initialValues);
            }
            
            
            
            function onSubmit(){}
  return (
    <div className='bg-background h-screen' >
        
        <div className='bg-white grid grid-cols-1 '>
          {/* //* header section */}
          <div className=' text-3xl capitalize mx-auto max-w-2xl'>
            <h1 className='font-bold '>Enter the 6 digit number you recieved in your Email</h1>
            <span className='font-semibold text-gray-400'>kindly check your spam folder if the you didn't recive the Security code</span>
          </div>

          {/* //* input section  */}
            <div className='mx-auto' >
            <Formik 
            initialValues={initialValues}
            onSubmit={onSubmit}
            >
                <Form>
                    <Field as={CustomInputComponent} name="0"  />
                    <Field as={CustomInputComponent} name="1" />
                    <Field as={CustomInputComponent} name="2" />
                    <span className='text-4xl w-full mt-4'>-</span>
                    <Field as={CustomInputComponent} name="3"   />
                    <Field as={CustomInputComponent} name="4"  />
                    <Field as={CustomInputComponent} name="5"  />
                </Form>
            </Formik>    
            </div>
        </div>

    </div>
  )
}

export default SendResetCode