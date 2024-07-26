import React from 'react'
import {Fot1, Fot2} from './index'
import Image from 'next/image'

const Footer = () => {
  const footerNavs = [
    {
      href: "javascript:void()",
      name: "Terms"
    },
    {
      href: "javascript:void()",
      name: "License"
    },
    {
      href: "javascript:void()",
      name: "Privacy"
    },
    {
      href: "javascript:void()",
      name: "About Us"
    },
  ]


  return (
    <footer className='pt-10'>
      <div className='max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8'>
        <div className='justify-between sm:flex'>
          <div className='space-y-6'>
            <Image width={50} height={30} alt='logo' src="https://www.floatui.com/logo.svg" className='w-32'/>
            <p className='max-w-md'>
              Nulla auctor metus vitae lectus iaculis vel cuismod  nasa.

            </p>

            <ul className='flex flex-wrap items-center gap-4 text-sm sm:text-base'>
              {footerNavs.map((item, index)=>{
                return(
                  <li  key={index} className='text-gray-800 hover:text-gray-500 duration-150'>
                    <a href={item.href}>
                      {item.name}
                    </a>

                  </li>
                )
              })}

            </ul>
          </div>

          <div className='mt-6'>
              <div className='text-gray-700 font-semibold'> Get the app 
                <div className='flex items-center gap-3 mt-3 sm:block'>
                  <a href='javascript:void()'>
                    <Fot1 />
                  </a>

                  <a href="javascript:void()" className='mt-0 block sm:mt-3'>
                    <Fot2 />

                  </a>
                </div>

              </div>
          </div>
        </div>

        <div className='mt-10 py-10 border-dashed md:text-center'>
              <p>@2024 Jully Ushie Pius --piusushie3@gmail.com</p>
              <p className='mt-3 text-red-700 md:text-center underline'>
                Ushie Pius (The smart contract auditor in 2024)
              </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer