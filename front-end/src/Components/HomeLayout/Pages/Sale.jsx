import Button from '@mui/material/Button';
import React from 'react';

const Sale = () => {
    return (
        <div className='grid grid-cols-1 p-10 gap-5 md:grid-cols-2 md:h-[550px]  '>
            {/* 1st */}
            <div className='flex flex-col  rounded-2xl relative  overflow-hidden group md:row-span-2'>
                <img className='w-full h-full  object-cover group-hover:scale-110 duration-500 ease-in-out ' src="image/sale/image1.jpg" alt="image1" />
                <div className='absolute flex flex-col space-y-2 w-full h-full justify-center items-center text-white  bg-black/40'>
                    <h2 className='font-bold text-xl'>10% sales ongoing on phone</h2>
                    <p className='font-bold'>offers on limited time</p>
                    <Button variant='contained' sx={{backgroundColor:"#5C5352", borderRadius:"10px"}}> shop Now</Button>
                </div>
            </div>
            {/* 2nd */}
            <div className='flex flex-col  rounded-2xl relative  overflow-hidden group '>
                <img  className='w-full h-full  object-cover group-hover:scale-110 duration-500 ease-in-out ' src="image/sale/image2.jpg" alt="image1" />
                <div className='absolute flex flex-col space-y-2 w-full h-full justify-center text-white items-center md:items-start md:pl-10 bg-black/40'>
                    <h2 className='font-bold text-xl'>20% sales ongoing on Laptop</h2>
                    <p className='font-bold'>offers on limited time</p>
                    <Button variant='contained' sx={{backgroundColor:"#5C5352", borderRadius:"10px"}}> shop Now</Button>
                </div>
            </div>
            {/* 3nd */}
            <div className='flex flex-col  rounded-2xl relative  overflow-hidden group'>
                <img className='w-full h-full  object-cover group-hover:scale-110 duration-500 ease-in-out ' src="image/sale/image3.webp" alt="image1" />
                <div className='absolute flex flex-col space-y-2 w-full h-full justify-center text-white items-center bg-black/40 md:items-start md:pl-10'>
                    <h2 className='font-bold text-xl'>20% sales ongoing on more Product</h2>
                    <p className='font-bold'>offers on limited time</p>
                    <Button variant='contained' sx={{backgroundColor:"#5C5352", borderRadius:"10px"}}> shop Now</Button>
                </div>
            </div>
        </div>
    );
}

export default Sale;
