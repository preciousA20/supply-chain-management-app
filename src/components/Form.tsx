"use client"
import { useState } from 'react'
import Image from 'next/image'

const Form = ({
  setCreateShipmentModel,
  createShipmentModel,
  createShipment
}:any) => {

  const [shipment, setShipment] = useState<any>({
    receiver: "",
    pickupTime: "",
    distance: "",
    price: ""
  })

  const createItem = async()=>{
    try {
      await createShipment(shipment)
    } catch (error: any) {
      if(error) return alert(error.message)
    }
  }

  return createShipmentModel ? (
    <div className='fixed inset-0 z-10 overflow-y-auto'>
      <div className='fixed inset-0 w-full h-full bg-black opacity-40' onClick={()=>setCreateShipmentModel(false)}>
      </div>

      <div className='flex items-center min-h-screen px-4 py-8'>
        <div className='relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg'>
          <div className='flex justify-end'>
            <button className='p-2 text-gray-800 rounded-md hover:bg-gray-600' onClick={()=>setCreateShipmentModel(false)}>

            Close Modal

            </button>
          </div>

          <div className='max-w-sm mx-auto py-3 space-y-3 text-center'>
            <h4 className='text-lg font-medium text-gray-800'>
              Track product, Create Shipment
            </h4>
            <p className='text-[15px] text-gray-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium dignissimos vel ipsum eos aut optio! Quisquam eaque blanditiis accusantium dignissimos similique exercitationem? Consectetur aliquid suscipit delectus doloremque explicabo nesciunt praesentium.
            </p>

            <form onSubmit={(e: any)=>e.preventDefault()}>
              <div className='relative mt-3'>
                <input 
                  type='text'
                  placeholder='receiver'
                  className='w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg
                  '
                  onChange={(e: any)=>setShipment({...shipment, receiver: e.target.value})}
                />
              </div>


              <div className='relative mt-3'>
                <input 
                  type='date'
                  placeholder='pick up time'
                  className='w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg
                  '
                  onChange={(e: any)=>setShipment({...shipment, pickupTime: e.target.value})}
                />
              </div>


              <div className='relative mt-3'>
                <input 
                  type='text'
                  placeholder='distance in kilometer'
                  className='w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg
                  '
                  onChange={(e: any)=>setShipment({...shipment, distance: e.target.value})}
                />
              </div>


              <div className='relative mt-3'>
                <input 
                  type='text'
                  placeholder='price'
                  className='w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg
                  '
                  onChange={(e: any)=>setShipment({...shipment, price: e.target.value})}
                />
              </div>

              <button className='block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2' onClick={()=>createItem()}>
                Create Shipment
              </button>
            </form>

          </div>

        </div>
      </div>

    </div>
  ) : (" ")
}

export default Form