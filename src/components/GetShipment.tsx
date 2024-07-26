"use client"
import {useState} from 'react'

const GetShipment = ({
  getModel,
  setGetModel,
  getShipment
}) => {

  const [index, setIndex] = useState()
  const [singleShipmentData, setSingleShipmentData] = useState<any>()

  const getshipmentData = async() =>{
    const getData = await getShipment(index)
    setSingleShipmentData(getData)
    console.log(getData)
  }

  const convertTime = (time: any)=>{
    const newTime = new Date(time)
    const dateTime = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(newTime)
    return dateTime
}


  return getModel ? (
    <div className='fixed inset-0 z-10 overflow-y-auto'>
      <div className='fixed inset-0 w-full h-full bg-black opacity-40' onClick={()=>setGetModel(false)}>
      </div>

      <div className='flex items-center min-h-screen px-4 py-8'>
        <div className='relativt w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-sm'>
          <div className='flex justify-end'>
            <button className='p-2 text-gray-400 rounded-md hover:bg-gray-100' onClick={()=>setGetModel(false)}>
               Close Modal
            </button>
          </div>

          <div className='max-w-sm mx-auto py-3 space-y-3 text-center'>
            <h4 className='text-lg font-medium text-gray-800'>Product Tracking Details</h4>

            <form onSubmit={(e: any)=>e.preventDefault()}>
              <div className='relative mt-3'>
                <input 
                type='number'
                placeholder='id'
                className='w-full pl-5 pr-3 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg' onChange={(e: any)=>setIndex(e.target.value)}/>
              </div>

              <button onClick={()=>getshipmentData()} 
                className='block w-full mt-3 py-3 px-3 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2'>
      Get Details
              </button>
            </form>

            {singleShipmentData === undefined ? ("") : (
              <div className='text-left'>
                  <p>Sender: {singleShipmentData?.sender?.slice(0, 25)}...</p>
                  <p>receiver: {singleShipmentData?.receiver?.slice(0, 25)}...</p>
                  <p>Pick up time: {convertTime(singleShipmentData?.pickupTime)}</p>

                  <p>Delivery Time: {convertTime(singleShipmentData?.deliveryTime)}</p>
                  <p>Distance: {singleShipmentData?.distance}</p>

                  <p>Price {singleShipmentData?.price}</p>

                  <p>Status: {singleShipmentData?.status}</p>

                  <p>
                    Paid: {" "}
                    {singleShipmentData?.isPaid ? "Paid" : "Not paid"}
                  </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  ) : ("")
}

export default GetShipment