"use client"
import {useState, } from 'react'
import {Str1} from "./index"

const StartShipment = ({
  startModal,
  setStartModal,
  startShipment
}) => {

  const [getProduct, setGetProduct] = useState<any>({
    receiver: "",
    index: ""
  })

  const startShipping = ()=>{
    startShipment(getProduct)
  }


  return startModal ? (
    <div className='fixed inset-0 z-10 overflow-y-auto'>
      <div className='fixed inset-0 w-full bg-black opacity' onClick={()=>setStartModal(false)}>
      </div>

      <div className='flex items-center min-h-screen px-4 py-8'>
        <div className='relative w-full max-w-lg p-4 mx-auto bg-white rounded shadow-lg'>
          <div className='flex justify-end'>
            <button className='p-2 text-gray-400 rounded-md hover:bg-gray-100' onClick={()=>setStartModal(false)}>
                <Str1 />
            </button>
          </div>

          <div className='max-w-sm mx-auto py-3 space-y-3 text-center'>
            <h4 className='text-lg font-medium text-gray-800'>Start the shipping</h4>

            <form onSubmit={(e: any)=>e.preventDefault()}>
              <div className='relative mt-3'>
                <input 
                type='text'
                placeholder='receiver'
                className='w-full pl-5 pr-3 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg' onChange={(e: any)=>setGetProduct({...getProduct, receiver: e.target.value})}/>
              </div>

              <div className='relative mt-3'>
                <input 
                type='text'
                placeholder='id'
                className='w-full pl-5 pr-3 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg'
                onChange={(e: any)=>setGetProduct({
                  ...getProduct, index: e.target.value
                })}
                />
              </div>

      {/* //         <button onClick={()=>getshipmentData()} 
      //           className='block w-full mt-3 py-3 px-3 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2'>
      // Get Details
      //         </button> */}

      <button 
      onClick={()=>startShipping()}
       className='block w-full mt-3 py-3 px-3 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2'>
        get Details
      </button>
            </form>


          </div>
        </div>
      </div>
    </div>
  ) : ( " ")
}

export default StartShipment