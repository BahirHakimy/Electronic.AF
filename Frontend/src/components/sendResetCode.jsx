import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/authContext';

function Send() {
        const [value, setvalue] = useState({
            0: '',
            1: '',
            2: '',
            3: '',
            4: '',
            5: ''
        })

        const [error, setError] = useState({condition : false, message : ''})

          const {user, setUser} = useAuth();
          
          const refInput = useRef()

          const navigate = useNavigate();

        useEffect(() => {
            if(refInput.current.value === '') refInput.current.focus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[])

        const handleFocus = (e) => {
        
        //* if the first input is selected the return;
        if(e.target.name === '0') return;
        
        //* giving the focus to the first input if the value is empty 
        if(e.target.name !== '0' && refInput.current.value === '') refInput.current.focus();

        //* if the previousElement is empty shift the focus to it 
        // if(refInput.current[e.target.idx])
        //todo make the functionlity 
          }

          const handleKeyUp = e => {
            if (e.keyCode === 16 || e.keyCode === 9 || e.keyCode === 224 || e.keyCode === 18 || e.keyCode === 17) return;
          
             
            if(e.target.value.length > 1) splitNumber(e)
          }

          const handleSubmit = e => {
            e.preventDefault();
            let num = ''
            for (const item in value){
              num += value[item] + '';
            }
            setUser({...user, resetCode : refInput.current.value.concat('', num)})

            try{
              if(user.email){
              axios.post("http://127.0.0.1:8000/api/auth/checkResetCode/",{
              email: user.email,
              resetCode: refInput.current.value.concat('', num)
           }).then(res => {
             if(res.status === 202) navigate('/PasswordReset') 
           }).catch(e => {
             setError({condition : true , message : e.message})
           })
          }
          else{
            setError({condition: true , message : 'Email not available please enter your email again'})
          }
        } catch(e){
              console.log(e);
          }
            

          }
        
            const splitNumber = e =>  {
                // console.log(e.target);
                let data = e.data || e.target.value; // Chrome doesn't get the e.data, it's always empty, fallback to value then.
                if ( ! data ) return; // Shouldn't happen, just in case.
                if ( data.length === 1 ) return; // Here is a normal behavior, not a paste action.
              

                popuNext(e.target, data);
            }
      
                const popuNext = (el,data) => {
                    if(el.name === '0') setvalue({...value, [el.name] : data[0]})
                    el.value = data[0]; // Apply first item to first input
                    data = data.substring(1); // remove the first char.
                    setvalue({...value, [el.name] : el.value})
                    //* doing the same operation with the next element
                    if(el.nextElementSibling && data.length) {
                        popuNext(el.nextElementSibling, data)
                        el.nextElementSibling.focus()
                    }
                    
                }
            
      
       
    return (
        <div className='bg-background h-screen flex justify-center items-center' >
            <div className='bg-white grid grid-cols-1 items-center h-96 px-24 shadow-md '>
              {/* //* header section */}
              <div className=' capitalize mx-auto max-w-prose'>
                <h1 className='font-bold text-3xl  '>Enter the 6 digit number you recieved in your Email</h1>
                <span className='font-semibold text-gray-400 text-lg'>kindly check your spam folder if the you didn't recive the Security code</span>
              </div>
    
              {/* //* input section  */}
                <div className='mx-auto my-5' >
                <form onSubmit={handleSubmit}> 
                <input  name='0' type="number" ref={refInput} className='mx-2 rounded customNumberInput' maxLength={1} min={1} max={9} onKeyUp={handleKeyUp} onFocus={handleFocus} onInput={splitNumber}  required/>
                <input  name='1' type="number"  className='mx-2 rounded customNumberInput ' maxLength={1} min={1} max={9} onKeyUp={handleKeyUp} onFocus={handleFocus}   required  />
                <input  name='2' type="number"  className='mx-2 rounded customNumberInput ' maxLength={1} min={1} max={9} onKeyUp={handleKeyUp} onFocus={handleFocus}   required  />
                <input  name='3' type="number"  className='mx-2 rounded customNumberInput ' maxLength={1} min={1} max={9} onKeyUp={handleKeyUp} onFocus={handleFocus}   required  />
                <input  name='4' type="number"  className='mx-2 rounded customNumberInput ' maxLength={1} min={1} max={9} onKeyUp={handleKeyUp} onFocus={handleFocus}   required  />
                <input  name='5' type="number"  className='mx-2 rounded customNumberInput ' maxLength={1} min={1} max={9} onKeyUp={handleKeyUp} onFocus={handleFocus}   required  />
                <span className={`text-center text-red-500 ${error.condition ? 'block' : 'hidden'}`}>{error.message}</span>
                <button type="submit" className='w-96 block bg-primaryLight rounded-md mb-5 mt-10 ml-10 h-7 font-bold text-white text-xl'>Submit</button>
                </form>
                </div>
            </div>
    
        </div>  
      ) 
    }

export default Send