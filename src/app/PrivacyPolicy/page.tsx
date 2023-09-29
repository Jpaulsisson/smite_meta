import React from 'react'


export default function PrivacyPolicy() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-20 gap-3 text-neutral bg-secondaryBgColor'>
      <a href='/' className='border-primaryFontColor  border-thin p-3 underline underline-offset-4 mb-8'>Go back home</a>
      <blockquote className='w-full md:w-1/2 text-5xl'>We are not going to use your data in any way, shape, or form that benefits us monetarily or otherwise. 
      </blockquote>
      <h2 className='text-primaryFontColor text-3xl m-4'>We ask for your:</h2>
      <ul className='text-2xl text-accentGreen'>
        <li className='underline underline-offset-4 text-primaryFontColor mb-2'>Name</li>
          <p className='mb-3 text-xl text-primaryFont'>&#10026; So that we can display it on the page to let you know you&apos;re signed in</p>
        <li className='underline underline-offset-4 text-primaryFontColor mb-2'>Email</li>
          <p className='mb-3 text-xl text-primaryFont'>&#10026; So that we have a way to identify the unique YOU in scenario where two people have the same name</p> 
        <li className=' border-double text-lg border-primaryFontColor border-4 flex items-center justify-center p-2'>&#10026; THAT IS ALL &#10026;</li>
      </ul>

      <a href='/' className='mt-4 border-primaryFontColor border-thin p-3 underline underline-offset-4'>Go back home</a>
    </div>
  )
}