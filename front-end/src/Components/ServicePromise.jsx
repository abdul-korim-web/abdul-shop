import React from 'react';

const ServicePromise = () => {
    const servicePromiseItems= [
        {
            serviceName:"FREE DALIVERY",
            serviceImage:"image/ServicePromis/delivary.png",
            description:"Free  shipping on all order"
        },
        {
            serviceName:"RETURNS",
            serviceImage:"image/ServicePromis/return.webp",
            description:"Back guarantee under 7 days"
        },
        {
            serviceName:"SUPPORT 24/7",
            serviceImage:"image/ServicePromis/support.png",
            description:"Support online 24 hours a day"
        },
        {
            serviceName:"PAYMENTS",
            serviceImage:"image/ServicePromis/pement.png",
            description:"100% payment security"
        },
    ]
    return (
        <div className='flex flex-wrap  justify-around py-10 space-y-3  md:px-30 md:py-20'>
            {servicePromiseItems.map((item,index)=>(
                <div key={index} className='flex  justify-center items-center space-x-3'>
                    <div>
                        <img className='w-[50px] md:w-[100px]' src={item?.serviceImage} alt={item?.serviceName} />
                    </div>
                    <div className=''>
                        <h2 className='font-semibold italic font-mono md:text-2xl'>{item?.serviceName}</h2>
                        <p className='w-[130px] text-gray-500'>{item?.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ServicePromise;
