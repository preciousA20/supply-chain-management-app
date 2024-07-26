"use client"
import {useState, useEffect} from 'react'
import Image from 'next/image'
import { ethers } from "ethers"
import { Str1} from './index'

const Profile  = ({
  openProfile,
  setOpenProfile,
  currentUser,
  getShipmentsCount
}) => {
  const [count, setCount]=useState<number>()
  const [balance, setBalance]=useState<string>()


  useEffect(()=>{
    const getShipmentsData = getShipmentsCount()
    return async () =>{
      const allData = await getShipmentsData
      setCount(allData)

     
      // const bal = signer.getBalance()
      // console.log(bal)
      // const address = await signer.getAddress()
      // console.log(address)
      // const ethereumBalance = await provider.getBalance(currentUser)
      // console.log(ethereumBalance)
      // setBalance(ethers.utils.formatEther(ethereumBalance.toString()))
    }
  },[])



 // console.log(balance)
  return openProfile ? (
    <div className='fixed inset-0 z-10 overflow-y-auto'>
     <div className='fixed inset-0 w-full bg-black opacity' onClick={()=>setOpenProfile(false)}>
      </div>

      <div className='flex items-center min-h-screen px-4 py-8'>
        <div className='relative w-full max-w-lg p-4 mx-auto bg-white rounded shadow-lg'>
          <div className='flex justify-end'>
            <button className='p-2 text-gray-400 rounded-md hover:bg-gray-100' onClick={()=>setOpenProfile(false)}>
                <Str1 />
            </button>
          </div>

          <div className='max-w-sm mx-auto py-3 space-y-3 text-center'>
            <div className='flex flex-col items-center pb-10'>
              {/* <Image src="" height={20} width={15} alt='pius' /> */}
              <h5 className='mb-1 text-xl font-medium text-gray-500 dark:text-gray-300'>Welcome Traders</h5>

              <span className='text-sm text-gray-500 dark:text-gray-400'> User Address:
                {currentUser}
              </span>

              <div className='flex mt-4 space-x-3 md:mt-6'>
                <a href="#" className="inline-flex text-black items-center px-4 py-2 text-sm font-medium text-center text-block rounded-lg border-2" >Balance: {balance?.toString()} 100ETH</a>

                <a href="#" className="inline-flex text-black items-center px-4 py-2 text-sm font-medium text-center text-block rounded-lg border-2" >TotalShipment: 56{count?.toString()}</a>
              </div>
            </div>

          </div>
      </div>

      </div>



    </div>


  ) : ("")
}

export default  Profile