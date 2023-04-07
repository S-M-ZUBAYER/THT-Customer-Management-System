import React from 'react';
import img from "../../../Assets/Images/THT-Pic.jpg"
import { SiShopee } from "react-icons/si";
import { BsFillSuitHeartFill } from "react-icons/bs";

const Home = () => {
    return (
        <div className="mx-0  lg:mx-52">


            <div className="grid grid-cols-1 md:grid-cols-2 mt-20 w-full">

                <div className="px-20 text-center">
                    <h1 className="pt-20 text-2xl font-bold my-2 ">About our company </h1>
                    <p className="text-start">Welcome to , your one-stop-shop for all your printing needs! We are dedicated to providing high-quality printing products and services that will exceed your expectations.Our state-of-the-art printers are designed to produce crisp, clear, and vibrant prints for both personal and professional use. </p>
                </div>
                <div className="flex items-center justify-self-center">
                    <img className="h-96 w-80 rounded-2xl shadow-slate-900" src={img} alt="" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 mt-20 w-full bg-slate-100 py-12">
                <div className="order-2 sm:order-1 flex items-center justify-self-center">
                    <img className="h-96 w-80 rounded-2xl shadow-slate-900" src={img} alt="" />
                </div>
                <div className=" order-1 sm:order-2px-20 text-center">
                    <h1 className="pt-20 text-2xl font-bold my-2 ">Our Service </h1>
                    <p className="text-start">Welcome to , your one-stop-shop for all your printing needs! We are dedicated to providing high-quality printing products and services that will exceed your expectations.Our state-of-the-art printers are designed to produce crisp, clear, and vibrant prints for both personal and professional use.  </p>
                </div>

            </div>

            <div className="mt-14">
                <h1 className="text-lg font-semibold">
                    Buy product from
                </h1>
                <div className="my-12 flex justify-around">
                    <div className="flex">
                        <SiShopee className="text-2xl mr-2"></SiShopee>
                        <h2 className="font-semibold text-xl">Shopee</h2>
                    </div>
                    <div  className="flex items-center">
                        <BsFillSuitHeartFill className="text-2xl mr-2"></BsFillSuitHeartFill>
                        <h2 className="font-semibold text-xl">Lazada</h2>
                    </div>
                </div>
            </div>



        </div>



    );
};

export default Home;