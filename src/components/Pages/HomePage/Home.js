import React from 'react';
import img1 from "../../../Assets/Images/THT/THT_Home.jpg"
import img2 from "../../../Assets/Images/THT/THT_Service.jpg"
import { SiShopee } from "react-icons/si";
import lazadaImg from "../../../Assets/Images/Lazada/lagada_pic.jpg"
// import Carousel from './Carousel';

const Home = () => {
    return (
        <div>
            {/* <Carousel></Carousel> */}

            <div className="relative">
            <div className="w-96 h-96 rounded-full bg-blue-300 blur-3xl absolute right-0"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:mt-20 w-full">
                <div className="px-6 md:px-20 text-center">
                    <h1 className="pt:5 md:pt-20 text-xl md:text-2xl font-bold my-3 ">About our company </h1>
                    <p className="text-clip">Welcome to , your one-stop-shop for all your printing needs! We are dedicated to providing high-quality printing products and services that will exceed your expectations.Our state-of-the-art printers are designed to produce crisp, clear, and vibrant prints for both personal and professional use. </p>
                </div>
                <div className="flex items-center justify-self-center">
                    <img className="h-96 w-80 z-40 rounded-2xl shadow-xl" src={img1} alt="" />
                </div>
            </div>    
            </div>
            
            

            <div className=' relative'>
               <div className="w-96 h-96 rounded-full bg-blue-300 blur-3xl absolute bottom-1 "></div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:mt-20 gap-5 w-full py-12">
                <div className="order-2 sm:order-1 flex items-center justify-self-center">
                    <img className="h-96 w-80 z-40 rounded-2xl shadow-xl" src={img2} alt="" />
                </div>
                <div className="px-6 md:px-20 order-1 sm:order-2px-20 text-center">
                    <h1 className="sm:pt-0 md:pt-20 text-2xl font-bold my-2 ">Our Service </h1>
                    <p className=" text-clip sm:pb-20">Welcome to , your one-stop-shop for all your printing needs! We are dedicated to providing high-quality printing products and services that will exceed your expectations.Our state-of-the-art printers are designed to produce crisp, clear, and vibrant prints for both personal and professional use.  </p>
                </div>

            </div>  
            </div>
           

            <div className="mt-14">
                <h1 className="text-xl font-semibold">
                    Buy product from
                </h1>
                <div className="my-12 flex justify-around">
                    <div className="flex">
                        <SiShopee className="text-3xl mr-2 text-orange-500"></SiShopee>
                        <h2 className="font-semibold text-2xl text-orange-500">Shopee</h2>
                    </div>
                    <div  className="flex items-center">
                        {/* <BsFillSuitHeartFill className="text-2xl mr-2"></BsFillSuitHeartFill>
                        <h2 className="font-semibold text-xl text-blue-900">Lazada</h2> */}
                        <img className='h-8' src={lazadaImg}></img>
                    </div>
                    
                </div>
            </div>



        </div>



    );
};

export default Home;