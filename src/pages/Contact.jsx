import React from 'react'

const Contact = () => {
  return (
    <>
      <section className='flex flex-col items-center justify-center h-5/6 mt-25 mb-96'>
        <div className="font-[font2] text-center max-w-xl px-4">
          <h6 className='text-4xl font-light tracking-wide uppercase mb-6'>
            Contact information
          </h6 >

          <div className="text-left text-lg text-gray-800 leading-6">
            <p className=" text-gray-800 py-2">
              For any questions or assistance, please contact us:
            </p>
            <p className=" text-gray-800 py-2">
              <span className=' font-bold text-gray-950'>Email : </span>
              info@perfume24x7.com
            </p>
            <p className=" text-gray-700 py-2 ">
              <span className=' font-bold text-gray-950'>Phone : </span>
              8285248656
            </p>

            <p className="text-md text-gray-800 py-2">
              <span className=' font-black text-gray-950'>Hours of Operation : </span>
              10am to 7pm (Mon to Sat)
            </p>

            <p className="text-[16px] font-normal text-gray-800 py-2">
              Thank you for shopping with Perfume24x7.com. We appreciate your trust and support!
            </p>
          </div>
        </div>
      </section >
    </>
  )
}

export default Contact