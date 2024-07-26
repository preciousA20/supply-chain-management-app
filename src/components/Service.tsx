import React from 'react'
import Image from 'next/image'

const Service = ({
        setOpenProfile,
        setCompleteModal,
        setGetModel,
        setStartModal
}) => {

  const team = [
    {avatar: "complete shipment"},
    {avatar: "get shipment"},
    {avatar: "start shipment"},
    {avatar: "User Profile"},
    {avatar: "shipment count"},
    {avatar: "Send"}
  ]

  const openModelBox = (text: number)=>{
    if(text === 1){
      setCompleteModal(true)
    }else if(text === 2){
      setGetModel(true)
    }else if(text === 3){
      setStartModal(true)
    }else if(text === 4){
      setOpenProfile(true)
    }
  }

  return (
    <section className='py-0 pb-14'>
      <div className='max-w-screen-xl mx-auto px-4 md:px-8'>
        <div className='mt-12'>
          <ul className='grid gap-8 sm:grid-cols-2 md:grid-cols-3'>
            {team.map((item: any, index: number)=>(
              <li key={index}>
                  <div onClick={()=>openModelBox(index + 1)} 
                    className='w-full h-60 sm:h-56'
                    >
                      <div className='text-bold font-bold text-center bg-gray-700 shadow-md rounded-xl hover:cursor-pointer h-[200px]'>{item.avatar}</div>
                  </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Service